import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "./components/theme-provider";
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="samir-portfolio-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);