# BookWell Dashboard

Modern, production-ready frontend for BookWell - a SaaS platform for small wellness studios and independent instructors.

## Design Philosophy

Clean, modern, minimal design inspired by Linear, Notion, Vercel, and Cal.com. The UI feels premium, authentic, and human-designed.

### Key Design Principles

- **Calm & Professional**: No overdone gradients or AI-style illustrations
- **Typography**: Inter for body, Plus Jakarta Sans for display
- **Color Palette**: Neutral base (white/gray) with amber accent
- **Animations**: Subtle transitions using @vueuse/motion
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile-First**: Responsive design across all breakpoints

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Authentication**: Better Auth
- **HTTP Client**: Axios
- **Icons**: Lucide Vue
- **Date Handling**: date-fns
- **Animations**: @vueuse/motion

## Project Structure

```
src/
├── assets/              # Static assets and design tokens
│   └── design-tokens.ts # Shared design system (reusable in landing)
├── components/
│   ├── ui/             # Reusable UI primitives
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   ├── Card.vue
│   │   ├── Badge.vue
│   │   ├── Modal.vue
│   │   ├── Toast.vue
│   │   └── Table.vue
│   ├── shared/         # Shared complex components
│   ├── auth/           # Authentication components
│   ├── instructor/     # Instructor-specific components
│   └── client/         # Client-specific components
├── composables/         # Reusable composition functions
│   ├── useAuth.ts      # Authentication logic
│   ├── useBookings.ts  # Booking management
│   ├── useClasses.ts   # Class management
│   ├── usePackages.ts  # Package/credit management
│   └── useToast.ts     # Toast notifications
├── layouts/             # Layout components
├── plugins/             # Vue plugins
├── router/              # Vue Router configuration
├── stores/              # Pinia stores
├── types/               # TypeScript type definitions
│   ├── api.ts          # API types (from OpenAPI)
│   └── index.ts        # UI types
├── utils/               # Utility functions
│   ├── http-client.ts  # Axios HTTP client with Better Auth
│   ├── format.ts       # Formatting utilities
│   └── validation.ts   # Form validation
└── views/               # Page components
    ├── auth/           # Login, Register, Forgot Password
    ├── instructor/     # Instructor dashboard pages
    └── client/         # Client dashboard pages
```

## Features

### Authentication
- Login / Register / Forgot password flow
- Better Auth integration with session cookies
- Social login (Google, Apple) ready
- Role-based access control

### Instructor Dashboard
- **Dashboard Home**: Overview cards (clients, bookings, revenue, credits)
- **Classes**: CRUD operations, schedule calendar, recurring classes
- **Clients**: List with credit balances and attendance
- **Payments & Credits**: Bonus pack management, purchase logs
- **Settings**: Profile, payment setup, availability, notifications

### Client Dashboard
- **My Classes**: Booked and past classes
- **My Credits**: Active packages, remaining credits, expiry
- **Book New Class**: Browse schedule and book with real-time validation
- **Purchase Credits**: Package selection (when enabled)
- **Profile**: Personal settings

### Booking Flow
- Modal-based confirmation
- Real-time credit validation
- Toast notifications
- Optimistic updates

## UI Components

All components follow a consistent design system and support:
- Light/dark mode
- Responsive design
- Keyboard navigation
- ARIA labels
- Loading states
- Error states
- Empty states

### Primitives

- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Input**: Text, email, password, textarea with icons and validation
- **Card**: Flexible card component with header/footer slots
- **Badge**: Status indicators with color variants
- **Modal**: Accessible modal dialogs
- **Toast**: Non-intrusive notifications
- **Table**: Data tables with sorting and pagination support

## API Integration

Type-safe API client generated from OpenAPI specification. All endpoints are wrapped in composables for easy consumption.

### Composables

```typescript
// Authentication
const { login, register, logout, currentUser, isAuthenticated } = useAuth()

// Classes
const { classes, createClass, updateClass, fetchMyClasses } = useClasses()

// Bookings
const { bookings, createBooking, cancelBooking } = useBookings()

// Packages
const { packages, clientPackages, assignPackageManually } = usePackages()

// Toast Notifications
const { success, error, warning, info } = useToast()
```

## Design System Export

The design system is exported in `src/assets/design-tokens.ts` for reuse in the landing page.

```typescript
import { designTokens, generateCSSVariables } from '@/assets/design-tokens'

// Use in Tailwind config
// Use CSS variables in landing page
const cssVars = generateCSSVariables()
```

### Shared Design Tokens

- Colors (light/dark modes)
- Typography (font families, sizes, weights)
- Spacing scale
- Border radius
- Shadows
- Animation timings
- Breakpoints
- Z-index scale

## Setup

### Prerequisites

- Node.js 18+ and npm
- Better Auth backend running

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_BETTER_AUTH_URL=http://localhost:3000/auth
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Routing

```
/login                       # Login page
/register                    # Registration page
/forgot-password             # Password reset

/dashboard/instructor        # Instructor dashboard home
/dashboard/instructor/classes # Class management
/dashboard/instructor/clients # Client management
/dashboard/instructor/payments # Payments & credits
/dashboard/instructor/settings # Settings

/dashboard/client            # Client dashboard home
/dashboard/client/classes    # My classes
/dashboard/client/credits    # My credits
/dashboard/client/book       # Book new class
/dashboard/client/profile    # Profile settings
```

## Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast (WCAG AA)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - BookWell SaaS

## Next Steps

To complete the dashboard:

1. **Setup Better Auth Client**: Install and configure Better Auth client package
2. **Setup Pinia Stores**: Create stores for global state management
3. **Setup Vue Router**: Configure routes with guards
4. **Build Layouts**: Create Navbar and Sidebar components
5. **Build Auth Pages**: Login, Register, Forgot Password
6. **Build Instructor Pages**: Dashboard, Classes, Clients, Payments, Settings
7. **Build Client Pages**: Dashboard, Classes, Credits, Book, Profile
8. **Add Dark Mode Toggle**: Implement theme switcher
9. **Testing**: Add unit and e2e tests
10. **Performance**: Optimize bundle size and lazy loading
