#!/usr/bin/env node

// Simple test server to validate portfolio card functionality
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Create a simple test server
const server = http.createServer((req, res) => {
  if (req.url === '/test-portfolio-card') {
    // Test portfolio card HTML structure
    const testHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Portfolio Card Test</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8 bg-gray-100">
  <h1 class="text-2xl font-bold mb-4">Portfolio Card Test</h1>
  
  <!-- Test the exact structure we built -->
  <div class="group portfolio-card-hover bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 cursor-pointer relative overflow-hidden min-h-[180px] w-80">
    <div class="p-4 h-full flex flex-col relative">
      <!-- Status Badge -->
      <div class="absolute top-2 right-2 z-50">
        <span class="text-white text-xs px-2 py-1 font-medium border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-purple-500">
          Markup
        </span>
      </div>
      
      <!-- Logo Container -->
      <div class="flex items-center justify-center flex-1">
        <div class="w-32 h-16 bg-gray-300 flex items-center justify-center transition-all duration-300 group-hover:brightness-0 group-hover:invert">
          TEST LOGO
        </div>
      </div>
      
      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-10">
        <h3 class="text-white text-lg font-bold text-center mb-2">Test Company</h3>
        <p class="text-white text-sm font-medium leading-relaxed text-center px-4">
          This is a test description for the hover overlay functionality.
        </p>
      </div>
    </div>
  </div>
  
  <div class="mt-8">
    <h2 class="text-lg font-semibold mb-2">Expected Behavior:</h2>
    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>Purple "Markup" badge visible in top-right corner</li>
      <li>On hover: dark overlay appears with white text</li>
      <li>On hover: logo inverts to white</li>
      <li>Card lifts with shadow effect on hover</li>
      <li>Consistent 180px minimum height</li>
    </ul>
  </div>
</body>
</html>
    `;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(testHTML);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found - Try /test-portfolio-card');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running at http://0.0.0.0:${PORT}`);
  console.log(`Test URL: http://0.0.0.0:${PORT}/test-portfolio-card`);
});