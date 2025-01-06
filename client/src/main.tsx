import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react"; // Added this line to fix the "React is not defined" error.
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);