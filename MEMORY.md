# Project Memory - Zipply

## Project Overview

**Zipply** is a modern web application designed to condense chaotic inboxes into beautiful daily briefs. It prioritizes a premium, high-aesthetic user experience with dynamic UI elements.

## Tech Stack

- **Framework**: [Next.js 16.1.1 (Turbopack)](https://nextjs.org/)
- **Authentication & Database**: [Supabase](https://supabase.com/) (`@supabase/ssr`, `@supabase/supabase-js`)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Critical Implementation Details

### Session Handler Fix (January 2026)

- **Issue**: `TypeError: Cannot create property 'user' on string` occurring during Google OAuth flow.
- **Cause**: Supabase client was receiving a stringified session from `localStorage` instead of a parsed object.
- **Fix**: Implemented a custom storage handler in `lib/supabase/client.ts` that explicitly calls `JSON.parse` (including double-parsing checks). Added defensive `typeof` checks in `AuthProvider`.

### Hydration Error Fix (January 2026)

- **Issue**: "A tree hydrated but some attributes... didn't match" pointing to `cz-shortcut-listen`.
- **Cause**: Browser extensions injecting attributes into the `<body>` tag before hydration.
- **Fix**: Added `suppressHydrationWarning` to the `<body>` tag in `app/layout.tsx`.

### Sign-out Navigation Bug Fix (January 2026)

- **Issue**: User unable to sign out after navigating back to the site via the browser's back button.
- **Cause**: BFcache (Back-Forward Cache) serving a stale version of the page where the Auth listener wasn't re-executed.
- **Fix**: Added a `pageshow` listener in `AuthProvider` to re-validate auth on back-navigation. Updated `handleSignOut` to reset state immediately and force a hard redirect to `/`.

### Database & Migrations

- **Location**: `supabase/migrations/`
- **Strategy**: Always version-control schemas. Migrations include user table creation, sync triggers from `auth.users` to `public.users`, and RLS policies.
- **Sync Trigger**: A Postgres trigger is used to automatically insert a record into `public.users` when a new user signs up via Supabase Auth.

## Key Folders

- `/app`: Next.js pages and API routes (using App Router).
- `/components`: Reusable UI components (Navbar, AuthModal, etc.).
- `/lib/supabase`: Client and Server Supabase configurations.
- `/supabase/migrations`: SQL migration scripts.

## Important Commands

- `npm run dev`: Start the development server.
- `git push origin user-auth`: Push authentication-related changes.

## Future Context

- The user handles their own migrations via the Supabase CLI or custom scripts (`run_migration.js`).
- Aesthetics are a top priority—any new UI should follow the "vibrant, dark-mode, glassmorphism" design language.
