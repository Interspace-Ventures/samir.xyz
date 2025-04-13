#!/usr/bin/env node

import { spawn } from "child_process";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

// This is a minimal development server that wraps around remix dev
// to provide compatibility with React 19
async function main() {
  process.env.NODE_ENV = "development";
  
  console.log("Starting Remix development server...");
  
  try {
    // Run the remix dev command with custom options
    const remixProcess = spawn("npx", [
      "@remix-run/dev",
      "--port", "5000"
    ], {
      stdio: "inherit",
      shell: true
    });
    
    remixProcess.on("error", (err) => {
      console.error("Failed to start Remix dev server:", err);
      process.exit(1);
    });
    
    remixProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Remix dev server exited with code ${code}`);
        process.exit(code || 1);
      }
    });
    
    // Handle termination signals
    process.on("SIGINT", () => {
      console.log("Shutting down Remix dev server...");
      remixProcess.kill("SIGINT");
    });
    
    process.on("SIGTERM", () => {
      console.log("Shutting down Remix dev server...");
      remixProcess.kill("SIGTERM");
    });
  } catch (error) {
    console.error("Failed to start Remix development environment:", error);
    process.exit(1);
  }
}

main().catch(console.error);