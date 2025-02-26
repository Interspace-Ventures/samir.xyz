console.log("React application is initializing...");

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import App from './App';
import "./index.css";

// Additional debug logging
console.log("Loading React application components...");

const root = document.getElementById("root");
if (!root) {
  console.error("Root element not found - DOM might not be ready or element doesn't exist");
  throw new Error("Root element not found");
}

console.log("Found root element, rendering React app...");

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);

console.log("React application render completed");