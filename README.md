# Personal Portfolio Website

A clean, minimal personal website with three main sections built with modern web technologies.

## Overview

This portfolio website showcases a developer's work, skills, and creative ventures. The website features a clean, minimal design aesthetic and is built using modern web technologies.

## Key Sections

### 1. Profile Section
- Personal introduction
- Skills and expertise
- Call-to-action buttons

### 2. Portfolio Section
- Showcase of professional projects
- Projects stored in PostgreSQL database with Prisma ORM
- Filter by categories/tags
- Project details including description, technologies used, and links

### 3. Interspace Section
- Creative playground
- Display of ventures and personal projects
- Interactive elements

## Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS with clean design principles
- **Animations**: Framer Motion for smooth transitions
- **Type Safety**: TypeScript for robust code
- **Data Fetching**: TanStack React Query
- **Database ORM**: Prisma with PostgreSQL
- **Schema Validation**: Zod for type validation

## Project Structure

```
.
├── app
│   ├── api
│   │   ├── projects
│   │   └── ventures
│   ├── components
│   │   ├── footer.tsx
│   │   ├── interspace-section.tsx
│   │   ├── navigation.tsx
│   │   ├── portfolio-section.tsx
│   │   └── profile-section.tsx
│   ├── lib
│   │   └── prisma.ts
│   ├── styles
│   │   └── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── prisma
│   └── schema.prisma
├── public
│   ├── assets
│   └── ventures
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── tsconfig.json
```

## Development Guidelines

- **File Naming**: Using kebab-case for all file names
- **Code Style**: Clean, readable, and well-commented code
- **Responsiveness**: Mobile-first approach with responsive design
- **Performance**: Optimized for fast loading and rendering
- **Accessibility**: WCAG compliance for maximum accessibility

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Run the development server: `npx next dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

The project uses PostgreSQL with Prisma ORM. To set up the database:

1. Ensure PostgreSQL is running
2. Configure DATABASE_URL in `.env`
3. Run database migrations: `npx prisma db push`
4. (Optional) Seed the database: `npx prisma db seed`

## Deployment

The application can be deployed to various platforms including Vercel, Netlify, or any hosting service supporting Node.js applications.

## License

ISC