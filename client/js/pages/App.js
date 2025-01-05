
import React from 'react';
import { ThemeProvider } from '../components/theme-provider';
import { ThemeToggle } from '../components/theme-toggle';
import '../css/index.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground">
        <nav className="p-4">
          <ThemeToggle />
        </nav>
        <main className="container mx-auto p-4">
          <h1 className="text-4xl font-bold">Welcome to my Portfolio</h1>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
