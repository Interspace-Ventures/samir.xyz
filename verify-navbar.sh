#!/bin/bash

echo "Verifying UltraSimpleNavbar component styling..."
echo "-----------------------------------------------"

# Check if the navbar component file exists
if [ -f "src/components/layout/ultra-simple-navbar.tsx" ]; then
  echo "✅ Found ultra-simple-navbar.tsx file"
else
  echo "❌ Could not find ultra-simple-navbar.tsx file"
  exit 1
fi

# Check if the CSS styles are properly set up with dark mode
if grep -q "dark .nav-link" src/app/globals.css; then
  echo "✅ Found dark theme navbar link styles"
else
  echo "❌ Could not find dark theme navbar link styles"
fi

# Check if we fixed the closing bracket of @layer components
if grep -q "End of the navbar styles" src/app/globals.css && grep -A 1 "End of the navbar styles" src/app/globals.css | grep -q "}"; then
  echo "✅ Found properly closed @layer components section"
else
  echo "❌ @layer components may be missing a closing bracket"
fi

# Check for the purple color scheme
if grep -q "dark-purple" src/app/globals.css; then
  echo "✅ Found dark purple theme color variables"
else
  echo "❌ Could not find dark purple theme color variables"
fi

# Check if the CSS file has correctly defined colors for dark theme links
if grep -q "#d8b4fe" src/app/globals.css; then
  echo "✅ Found purple-300 color (#d8b4fe) for dark theme links"
else
  echo "❌ Could not find purple-300 color for dark theme links"
fi

# Verify that navbar styling uses standard CSS now
if grep -q "@apply" src/app/globals.css; then
  echo "⚠️ Found @apply directives still in CSS - some may need to be converted"
else
  echo "✅ No @apply directives found - all converted to standard CSS"
fi

echo "-----------------------------------------------"
echo "Verification complete!"