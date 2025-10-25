# BookWell

> A modern SaaS platform for small wellness studios and independent instructors to manage classes, clients, and bookings.

## Overview

BookWell is a comprehensive booking and class management platform designed specifically for the wellness industry. It enables instructors to manage their classes, track client attendance, handle credit-based packages, and streamline their business operations.

### Key Features

- **Class Management**: Create and schedule classes with recurring options
- **Client Management**: Track client attendance and credit balances
- **Credit-Based Booking**: Flexible package and credit system
- **Real-Time Booking**: Instant booking confirmations with validation
- **Role-Based Access**: Separate experiences for instructors and clients
- **Modern UI**: Clean, professional interface with mobile-first design

## Repository Structure

```
bookwell-website/
├── dashboard/          # Vue 3 frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── README.md      # Dashboard-specific documentation
└── README.md          # This file
```

## Tech Stack

### Frontend (Dashboard)
- **Framework**: Vue 3 with Composition API and TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Authentication**: Better Auth
- **UI Components**: Custom component library

See [dashboard/README.md](./dashboard/README.md) for detailed frontend documentation.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or pnpm
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookwell-website
   ```

2. **Install dashboard dependencies**
   ```bash
   cd dashboard
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The dashboard will be available at `http://localhost:5173`

## Project Components

### Dashboard

The main frontend application for BookWell. Features include:

- **Instructor Dashboard**: Manage classes, clients, payments, and settings
- **Client Dashboard**: View classes, credits, book sessions, and manage profile
- **Authentication**: Secure login/register with Better Auth integration
- **Responsive Design**: Mobile-first approach with accessibility features

For detailed documentation, see [dashboard/README.md](./dashboard/README.md)

## Development

### Branch Strategy

- `main` - Production-ready code
- Feature branches follow the pattern: `feature/description` or `claude/description-sessionid`

### Code Style

- TypeScript for type safety
- Vue 3 Composition API with `<script setup>`
- Tailwind CSS for styling
- ESLint and Prettier for code formatting

### Building for Production

```bash
cd dashboard
npm run build
```

The production build will be output to `dashboard/dist/`

## Design Philosophy

BookWell follows a clean, minimal design inspired by modern SaaS platforms:

- **Calm & Professional**: No overdone gradients or flashy effects
- **Typography**: Inter for body text, Plus Jakarta Sans for headings
- **Color Palette**: Neutral base (white/gray) with amber accents
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile-First**: Responsive across all devices

## User Roles

### Instructor
- Create and manage classes
- View and manage clients
- Handle payments and credit packages
- Configure business settings

### Client
- Browse and book classes
- View credit balances and packages
- Manage personal profile
- Track class history

## Roadmap

- [ ] Backend API development
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Mobile app (iOS/Android)
- [ ] Advanced reporting and analytics
- [ ] Multi-location support
- [ ] Waitlist management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Proprietary - BookWell SaaS

## Support

For questions or support, please contact the development team.

## Documentation

- [Dashboard Documentation](./dashboard/README.md)
- [API Documentation](#) (Coming soon)
- [Deployment Guide](#) (Coming soon)

---

Built with care for wellness professionals
