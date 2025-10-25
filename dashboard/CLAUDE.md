# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BookWell Dashboard - Modern Vue 3 SaaS frontend for wellness studios and independent fitness instructors. Two-sided platform with separate dashboards for instructors (class management, clients, payments) and clients (booking, credits).

**Tech Stack**: Vue 3 (Composition API), TypeScript, Vite, Pinia, Vue Router, Tailwind CSS, Better Auth

## Commands

### Development
```bash
npm run dev              # Start dev server (Vite)
npm run build           # TypeScript check + production build
npm run preview         # Preview production build locally
```

### Environment
Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
VITE_BETTER_AUTH_URL=http://localhost:3000/auth
```

## Architecture

### Authentication Flow
- **Better Auth** handles authentication via session cookies (not JWT)
- `src/plugins/better-auth.ts` - Better Auth client instance
- `src/composables/useAuth.ts` - Wraps Better Auth with Vue reactivity
- `src/stores/auth.ts` - Pinia store exposes useAuth composable
- **HTTP Client** (`src/utils/http-client.ts`) configured with `withCredentials: true` for automatic cookie handling
- All API requests must use the http-client instance to maintain session

### Router Guards (`src/router/index.ts`)
Navigation guards enforce:
1. **Authentication**: `meta.requiresAuth` redirects to `/login` if not authenticated
2. **Guest-only routes**: `meta.requiresGuest` redirects authenticated users to dashboard
3. **Role-based access**: `meta.role` ensures instructors/clients only access their routes
4. **Auto-session restore**: Attempts `checkAuth()` before redirecting unauthenticated users

Default `/dashboard` redirects to `/dashboard/instructor` or `/dashboard/client` based on `currentUser.role`.

### Type System

#### API Types (`src/types/api.ts`)
Generated from OpenAPI spec with **critical enhancements for populated references**:

```typescript
// Union types handle both string IDs and populated objects
export interface Booking {
  classId: string | Class              // Can be populated
  clientId: string | Client            // Can be populated
  instructorId: string
  // ...
}

export interface Class {
  instructorId: string | InstructorProfile  // Can be populated
  // ...
}

export interface ClientPackage {
  packageId: string | Package          // Can be populated
  // ...
}
```

**Type Guards Pattern**: When accessing populated properties in components:
```typescript
// CORRECT - Type guard for populated references
const getInstructorName = (booking: Booking): string => {
  if (typeof booking.classId === 'object') {
    const instructorId = booking.classId.instructorId
    if (instructorId && typeof instructorId === 'object') {
      return instructorId.businessName
    }
  }
  return 'Unknown Instructor'
}

// INCORRECT - Direct access causes TS errors
booking.classId.instructorId.businessName  // Error: 'classId' is possibly 'string'
```

#### CurrentUser Structure
```typescript
export interface CurrentUser {
  id: string
  email: string
  role: 'instructor' | 'client'
  firstName: string
  lastName: string
  phone: string
  instructor?: InstructorProfile  // Only present if role === 'instructor'
  client?: ClientProfile          // Only present if role === 'client'
}
```

Access nested IDs:
- Instructor: `authStore.currentUser?.instructor?._id`
- Client: `authStore.currentUser?.client?._id`

### Composables Architecture

**Composables are stateful singletons** - they maintain global reactive state that persists across component unmounts. This is intentional for caching API data.

#### Key Composables

**useAuth** (`src/composables/useAuth.ts`)
- Wraps Better Auth client with Vue reactivity
- Global `currentUser` ref persists across navigation
- Methods: `login()`, `register()`, `logout()`, `fetchCurrentUser()`, `checkAuth()`

**useBookings, useClasses, usePackages**
- Global reactive state (`bookings`, `classes`, `packages`, `clientPackages`)
- Fetch methods populate these refs and return data
- State persists in memory until manually refreshed
- Method aliases for compatibility (e.g., `fetchBookingsByClient` → `fetchClientBookings`)

**Pattern for using composables in components**:
```typescript
// Components destructure from singleton
const { bookings, fetchBookingsByClient } = useBookings()

onMounted(async () => {
  // Fetch populates global 'bookings' ref
  await fetchBookingsByClient(clientId)
  // bookings.value is now populated and reactive
})
```

### Package Types
`usePackages()` returns TWO separate refs:
- `packages` - Package templates (instructor creates these)
- `clientPackages` - ClientPackage instances (purchased by clients)

**Always use `clientPackages` for client views**:
```typescript
// CORRECT
const { clientPackages: packages } = usePackages()

// INCORRECT - 'packages' is for templates, not client purchases
const { packages } = usePackages()
```

### Design System

**Dark mode**: Tailwind class-based (`darkMode: 'class'`)
- App store manages theme state
- `document.documentElement.classList.toggle('dark')` applies theme
- All colors use HSL with separate light/dark values in `tailwind.config.ts`

**Color System**:
- Neutral base: `background`, `foreground`, `border` (auto-switch in dark mode)
- Accent: `primary` (amber scale, 50-950)
- Semantic: `success`, `warning`, `error`, `info`

**Typography**:
- Body: Inter (`font-sans`)
- Display/Headings: Plus Jakarta Sans (`font-display`)

**Component Library** (`src/components/ui/`):
All primitives support variants, sizes, loading/disabled states:
- Button: `variant` (primary, secondary, outline, ghost, danger)
- Input: `type` includes 'date', 'time', 'datetime-local' (added for date pickers)
- Card, Badge, Modal, Toast, Table

**Shared Components** (`src/components/shared/`):
Domain-specific reusables: EmptyState, LoadingSpinner, StatCard, CreditBadge, ClassCard, BookingCard

### Layouts

**DashboardLayout** (`src/layouts/DashboardLayout.vue`)
- Renders Navbar (top) + Sidebar (left) + main content area
- Sidebar toggles on mobile with overlay
- Initializes theme on mount via `appStore.initTheme()`
- Used by all authenticated routes

### State Management (Pinia)

**authStore** (`src/stores/auth.ts`)
- Re-exports `useAuth()` composable as store
- Pattern: `export const useAuthStore = defineStore('auth', () => { return { ...useAuth() } })`

**appStore** (`src/stores/app.ts`)
- Theme management (`theme`, `toggleTheme()`, `initTheme()`)
- Sidebar state (`sidebarOpen`, `toggleSidebar()`)
- Persists theme to localStorage

## Important Patterns

### TypeScript Strict Mode
Build runs `vue-tsc -b` with strict type checking enabled. All type errors must be fixed - do not disable strict mode.

### Populated Reference Pattern
Backend may return populated objects instead of IDs. Always check type before accessing nested properties:

```typescript
// Template usage
{{ typeof pkg.packageId === 'object' ? pkg.packageId.name : 'Package' }}
{{ typeof pkg.packageId === 'object' ? pkg.packageId.credits : pkg.creditsTotal }}
```

### CSS Custom Classes
Avoid Tailwind `@apply` with pseudo-classes like `checked:` - they don't work in Vite:
```css
/* INCORRECT */
.toggle { @apply checked:bg-primary; }

/* CORRECT */
.toggle:checked { background-color: var(--color-primary); }
```

### Route Meta Types
```typescript
meta: {
  requiresAuth: true,    // Requires authenticated user
  requiresGuest: true,   // Only for unauthenticated users
  role: 'instructor'     // Requires specific role
}
```

## File Locations

**When adding features**, follow these conventions:
- New API types → `src/types/api.ts`
- New UI types → `src/types/index.ts`
- New composables → `src/composables/use*.ts`
- New utilities → `src/utils/*.ts`
- Instructor pages → `src/views/instructor/*.vue`
- Client pages → `src/views/client/*.vue`
- Shared components → `src/components/shared/*.vue`
- UI primitives → `src/components/ui/*.vue`

## Common Issues

### "Property does not exist" on populated references
Use type guards or the populated interface variants (`BookingPopulated`, `ClassPopulated`, `ClientPackagePopulated`)

### "Cannot find module" on composable imports
Composables are in `@/composables/`, ensure `@` alias is working (defined in `vite.config.ts`)

### Session cookie not being sent
Verify `withCredentials: true` in http-client and that CORS is configured on backend

### Dark mode not applying
Check `appStore.initTheme()` is called in DashboardLayout and `darkMode: 'class'` is in tailwind.config.ts
