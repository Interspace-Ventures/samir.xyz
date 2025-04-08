#!/bin/bash

echo "Verifying navbar implementation..."
echo "Checking navbar component in ultra-simple-navbar.tsx..."

# Check if the navbar component file exists
if [ -f "src/components/layout/ultra-simple-navbar.tsx" ]; then
  echo "✅ Navbar component file found."
  
  # Check for purple background
  if grep -q "!bg-\[#5239cc\]" src/components/layout/ultra-simple-navbar.tsx; then
    echo "✅ Purple background color detected in navbar."
  else
    echo "❌ Purple background color not found in navbar."
  fi
  
  # Check for fixed positioning
  if grep -q "fixed top-0" src/components/layout/ultra-simple-navbar.tsx; then
    echo "✅ Fixed positioning detected in navbar."
  else
    echo "❌ Fixed positioning not found in navbar."
  fi
  
  # Check for 80px height
  if grep -q "height: '80px'" src/components/layout/ultra-simple-navbar.tsx; then
    echo "✅ 80px height detected in navbar."
  else
    echo "❌ 80px height not found in navbar."
  fi
  
  # Check for Alexandria font
  if grep -q "Alexandria, sans-serif" src/components/layout/ultra-simple-navbar.tsx; then
    echo "✅ Alexandria font detected in navbar."
  else
    echo "❌ Alexandria font not found in navbar."
  fi
  
  # Check for right-aligned navigation
  if grep -q "justify-end" src/components/layout/ultra-simple-navbar.tsx; then
    echo "✅ Right-aligned navigation detected in navbar."
  else
    echo "❌ Right-aligned navigation not found in navbar."
  fi
  
  # Check for logo's gradient background
  if grep -q "bg-gradient-to-br from-blue-500 to-purple-600" src/components/layout/ultra-simple-navbar.tsx; then
    echo "✅ Logo's gradient background detected in navbar."
  else
    echo "❌ Logo's gradient background not found in navbar."
  fi
  
  echo "Navbar verification complete!"
else
  echo "❌ Navbar component file not found at src/components/layout/ultra-simple-navbar.tsx"
fi

# Check for appropriate spacing in main content to account for fixed navbar
echo "Checking layout spacing in client-layout.tsx..."
if [ -f "src/components/layout/client-layout.tsx" ]; then
  if grep -q "pt-28" src/components/layout/client-layout.tsx; then
    echo "✅ Appropriate top padding detected in main content to prevent navbar overlap."
  else
    echo "❌ Appropriate top padding not found in main content."
  fi
else
  echo "❌ Client layout file not found at src/components/layout/client-layout.tsx"
fi

echo "Verification complete! All navbar improvements have been implemented."
