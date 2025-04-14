# Next.js to Remix Migration Guide

This document outlines the key steps and considerations for migrating from Next.js to Remix.

## Package Changes

### Scripts in package.json

Replace the Next.js scripts with their Remix equivalents:

```json
"scripts": {
  "build": "remix build",
  "dev": "remix dev --port 5000",
  "start": "remix-serve ./build/index.js"
}
```

### Dependencies to Add

These dependencies are required for a Remix application:

```
@remix-run/dev
@remix-run/node
@remix-run/react
@remix-run/serve
isbot
```

### Dependencies to Remove

These Next.js-specific dependencies can be removed:

```
next
next-themes
@vercel/analytics
```

## File Structure Changes

### Routing

- Next.js: Uses the `app/` or `pages/` directory with page.tsx files
- Remix: Uses the `app/routes/` directory with files like `_index.tsx` for routes

### Configuration

- Next.js: `next.config.js`
- Remix: `remix.config.js`

## Component Migrations

### Layout Component

- Next.js: `app/layout.tsx` 
- Remix: `app/root.tsx` 

### Data Fetching

- Next.js: `getServerSideProps` or React Server Components
- Remix: `loader` and `action` exports in route files

### Link Component

- Next.js: `import Link from 'next/link'`
- Remix: `import { Link } from '@remix-run/react'`

### Image Handling

- Next.js: `import Image from 'next/image'`
- Remix: Use standard `<img>` tags or create custom image components

### Error Boundaries

- Next.js: Custom error handling
- Remix: Export `ErrorBoundary` component from route files

## Asset Handling

### Static Assets

- Next.js: `public/` directory
- Remix: `public/` directory (same approach)

### Fonts

- Next.js: `next/font`
- Remix: Import fonts directly or use a package like `@fontsource/*`

## Theme Handling

- Next.js: Often uses `next-themes`
- Remix: Use custom theme solution with cookies or localStorage

## Environment Variables

- Next.js: `NEXT_PUBLIC_*` for client-side variables
- Remix: Use `loader` functions to expose server variables to the client

## Meta Information

- Next.js: `<Head>` component or Metadata API
- Remix: Export `meta` function from route files

## API Routes

- Next.js: `pages/api/` or route handlers
- Remix: Use resource routes in the `routes/` directory

## Deployment

- Next.js: Platform-specific builds
- Remix: Adapter-based approach with different targets