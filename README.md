# Enterprise Frontend Boilerplate

A modern, high-density enterprise dashboard boilerplate built with Next.js 16, React 19, and Tailwind CSS v4.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v16 App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) with persistent local storage
- **Server State & Caching:** [@tanstack/react-query](https://tanstack.com/query/latest) v5
- **Icons:** [lucide-react](https://lucide.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/) with bearer token injection and response envelope unwrapping

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and set your API base URL:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Project Structure

```text
src/
├── app/
│   ├── dashboard/page.tsx     # Starter dashboard view
│   ├── login/page.tsx         # Enterprise login form
│   ├── layout.tsx             # Root layout with QueryProvider & AuthGuard
│   ├── globals.css            # Tailwind CSS v4 entry point
│   └── page.tsx               # Redirects to /dashboard
├── components/
│   ├── auth/
│   │   └── auth-guard.tsx     # Client-side route protection
│   └── layout/
│       ├── header.tsx         # Dynamic header bar with search & actions
│       └── sidebar.tsx        # Collapsible responsive sidebar
├── config/
│   └── navigation.ts          # Sidebar menu definitions & permissions
├── lib/
│   ├── api-client.ts          # Axios client with interceptors
│   └── query-provider.tsx     # TanStack React Query provider wrapper
└── store/
    ├── use-app-store.ts       # Global layout & UI state
    └── use-auth-store.ts      # Persistent user session & auth token
```
