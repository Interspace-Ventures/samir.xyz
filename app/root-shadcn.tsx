import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import NavbarShadcn from "./layout/navbar-shadcn";

// Use the links function to link CSS
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/tailwind.css" },
  { rel: "icon", href: "/favicon.ico" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio App (Shadcn UI)" },
    { name: "description", content: "A developer productivity portfolio website with Shadcn UI" },
  ];
};

export default function App() {
  return (
    <html lang="en" className="antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <NavbarShadcn />
          <main className="flex-grow">
            <Outlet />
          </main>
          <footer className="mt-auto py-4 bg-muted/50">
            <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
              Portfolio App &copy; {new Date().getFullYear()}
            </div>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Error boundary for catching and displaying errors
export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Error!</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <div className="error-container p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Application Error</h1>
          <p className="mb-4">Sorry, an unexpected error has occurred.</p>
          <a href="/" className="text-primary hover:underline">
            Return to homepage
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}