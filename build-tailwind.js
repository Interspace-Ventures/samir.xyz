#!/usr/bin/env node

// build-tailwind.js - Build Tailwind CSS without relying on CLI
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

// Define input and output paths
const inputPath = path.join(__dirname, 'app/tailwind.css');
const outputPath = path.join(__dirname, 'public/tailwind.css');

// Check if input file exists, if not create it
if (!fs.existsSync(inputPath)) {
  const tailwindInput = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 248 90% 66%;
    --primary-foreground: 210 40% 98%;
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --border: 214.3 31.8% 91.4%;
    --accent: 248 90% 66%;
    --accent-foreground: 210 40% 98%;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 248 90% 66%;
    --primary-foreground: 0 0% 100%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --border: 217.2 32.6% 17.5%;
    --accent: 248 90% 66%;
    --accent-foreground: 0 0% 100%;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}`;

  console.log(`Creating Tailwind input file at ${inputPath}`);
  fs.writeFileSync(inputPath, tailwindInput);
}

// Process the CSS file with PostCSS and Tailwind
console.log('Processing Tailwind CSS...');
const css = fs.readFileSync(inputPath, 'utf8');

postcss([
  tailwindcss(path.join(__dirname, 'tailwind.config.js')),
  autoprefixer,
])
  .process(css, { from: inputPath, to: outputPath })
  .then((result) => {
    console.log(`Writing CSS output to ${outputPath}`);
    fs.writeFileSync(outputPath, result.css);
    console.log('Tailwind CSS build completed!');
  })
  .catch((error) => {
    console.error('Error processing Tailwind CSS:', error);
    process.exit(1);
  });