# BookWell Dashboard - Quick Start

## Get Up and Running in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- BookWell API backend running (optional for component demo)

### Step 1: Install Dependencies

```bash
cd dashboard
npm install
```

### Step 2: Configure Environment

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and set your API URL:
```env
VITE_API_URL=http://localhost:3000
VITE_BETTER_AUTH_URL=http://localhost:3000/auth
```

### Step 3: Start Development Server

```bash
npm run dev
```

The app will open at [http://localhost:5173](http://localhost:5173)

## What You'll See

The default App.vue is a **component showcase** that demonstrates:
- All UI components (Button, Input, Card, Badge, Modal, Toast, Table)
- Different variants and states
- Interactive demos
- Toast notifications
- Modal dialogs

## Project Structure Overview

```
dashboard/
├── src/
│   ├── components/ui/      # Ready-to-use UI components
│   ├── composables/        # API integration hooks
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Helper functions
│   ├── App.vue             # Demo page
│   └── main.ts             # Entry point
├── .env                    # Your environment config
├── package.json
└── README.md               # Full documentation
```

## Using the UI Components

Import and use components in your Vue files:

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick">
      Click Me
    </Button>

    <Input
      label="Email"
      type="email"
      v-model="email"
    />

    <Card title="My Card">
      <p>Card content here</p>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Card } from '@/components/ui'

const email = ref('')

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

## Using Toast Notifications

```vue
<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { success, error, warning, info } = useToast()

const handleSuccess = () => {
  success('Operation successful!', 'Your changes have been saved')
}

const handleError = () => {
  error('Something went wrong', 'Please try again later')
}
</script>
```

## Using API Composables

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useClasses } from '@/composables/useClasses'

const { classes, isLoading, fetchMyClasses } = useClasses()

onMounted(async () => {
  await fetchMyClasses()
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <div v-for="cls in classes" :key="cls._id">
      {{ cls.name }}
    </div>
  </div>
</template>
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run type-check   # Run TypeScript compiler
```

## Next Steps

After exploring the demo:

1. **Read the Documentation**
   - [README.md](./README.md) - Full feature documentation
   - [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Step-by-step build guide
   - [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - What's built and what's next

2. **Setup Better Auth**
   - Install Better Auth client
   - Configure authentication
   - See IMPLEMENTATION_GUIDE.md for details

3. **Add Vue Router**
   - Setup routes
   - Add navigation guards
   - Create page components

4. **Build Your Pages**
   - Authentication pages (Login, Register)
   - Dashboard layouts
   - Instructor/Client pages

5. **Customize the Design**
   - Edit `tailwind.config.ts`
   - Modify `src/assets/design-tokens.ts`
   - Update colors, fonts, spacing

## Common Issues

### Port Already in Use
If port 5173 is taken:
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or specify a different port
vite --port 3000
```

### API Connection Issues
Make sure:
- Backend API is running
- `.env` file has correct API URL
- CORS is configured on the backend
- Better Auth cookies are enabled

### Tailwind Not Working
If styles aren't applying:
1. Check `tailwind.config.ts` includes your files
2. Restart dev server
3. Clear browser cache

### TypeScript Errors
If you see type errors:
1. Run `npm install` to ensure all types are installed
2. Restart your IDE/editor
3. Check `tsconfig.app.json` configuration

## Getting Help

1. Check the [README.md](./README.md) for detailed documentation
2. Review [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for implementation details
3. Look at the demo in `App.vue` for working examples
4. Check console for error messages

## Component Examples

### Button Variants
```vue
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Input Types
```vue
<Input type="text" label="Name" />
<Input type="email" label="Email" />
<Input type="password" label="Password" />
<Input type="tel" label="Phone" />
<Input type="textarea" label="Message" :rows="4" />
```

### Card Variants
```vue
<Card variant="default">Default Card</Card>
<Card variant="bordered">Bordered Card</Card>
<Card variant="elevated">Elevated Card</Card>
<Card variant="flat">Flat Card</Card>
```

### Badge Variants
```vue
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

## Design System

All design tokens are available in `src/assets/design-tokens.ts`:
- Colors (light/dark mode)
- Typography (font families, sizes)
- Spacing
- Shadows
- Border radius
- Animations

You can import and use them:
```typescript
import { designTokens } from '@/assets/design-tokens'

console.log(designTokens.colors.primary[500])
console.log(designTokens.typography.fontSize.lg)
```

## Building for Production

```bash
# Build the app
npm run build

# Output will be in dist/
# Deploy the dist/ folder to your hosting service
```

## Deployment

The built app is a static site. Deploy `dist/` to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **AWS S3**: `aws s3 sync dist/ s3://your-bucket`
- **GitHub Pages**: Push `dist/` to gh-pages branch

---

**Ready to build something amazing!** 🚀

For more information, see the full documentation in README.md.
