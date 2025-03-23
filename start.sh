#!/bin/sh
# Ultra-simplified startup script v3.4.9
# Designed for maximum compatibility with Replit

echo "Starting Next.js application with enhanced debugging..."

# Clean up the build directory
rm -rf .next

# Print system info for debugging
echo "System info:"
echo "Bun version: $(bun -v)"
echo "Current directory: $(pwd)"

# Do NOT copy assets, ensure they stay in the attached_assets folder
# We've modified next.config.js to handle loading from attached_assets directly

# Make sure public directory and structure exists
mkdir -p public/logos/ventures public/logos/portfolio public/logos/profile public/images/hero public/icons public/logs

# Make sure public has the same content as attached_assets
echo "Ensuring public folder has access to attached_assets content..."
mkdir -p attached_assets

# Clear existing links in the logos directory
rm -f public/logos/*.png 2>/dev/null || true

# Create symbolic links from attached_assets to the appropriate public directories
# Ventures logos
ln -sf /home/runner/workspace/attached_assets/"2DE Interspace.png" public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"Solo Wordmark - Gradient 2025.png" public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"Predictive.film icon 2025.png" public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"Interspace Square - 2025.png" public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"Hey I'm Samir 2025.png" public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"Perspectives Favicon.png" public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/interspace.png public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/interspace-square.png public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/predictive-film-icon.png public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/perspectives.png public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/solo-logo-2025.png public/logos/ventures/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"Solo Wordmark 2025.png" public/logos/ventures/ 2>/dev/null || true

# Portfolio logos
ln -sf /home/runner/workspace/attached_assets/Afar.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/AON3D.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Aura.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Backpack.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/GEM.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Goodmylk.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Harper.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Hedgehog.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Juneshine.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Kartera.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Keep.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/margin.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Maridea.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Playbook.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/RPM.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Rely.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Restream.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Sanzo.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Soot.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Sugar.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Sundae.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Superplastic.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Swan.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Techmate.png public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"The Coffee.png" public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"The Food Company.png" public/logos/portfolio/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/Waldo.png public/logos/portfolio/ 2>/dev/null || true

# Profile images
ln -sf /home/runner/workspace/attached_assets/samir.png public/logos/profile/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/samir-favicon.png public/logos/profile/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"Hey I'm Samir 2025.png" public/logos/profile/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/hey-im-samir.png public/logos/profile/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/"hey - I'm Samir.png" public/logos/profile/ 2>/dev/null || true

# Hero images
ln -sf /home/runner/workspace/attached_assets/hero-banner.png public/images/hero/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/hero-main.png public/images/hero/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/screenshot-2025-03-01.png public/images/hero/ 2>/dev/null || true

# Move other images and files to appropriate folders
cp -a attached_assets/*.txt public/logs/ 2>/dev/null || true
cp -a attached_assets/*.jpg public/images/ 2>/dev/null || true
cp -a attached_assets/*.webp public/images/ 2>/dev/null || true
cp -a attached_assets/*.svg public/images/ 2>/dev/null || true

# Keep these in root for compatibility
ln -sf /home/runner/workspace/attached_assets/favicon.png public/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/generated-icon.png public/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/favicon.png public/logos/ 2>/dev/null || true
ln -sf /home/runner/workspace/attached_assets/generated-icon.png public/logos/ 2>/dev/null || true

# Set enhanced environment variables for React 19 compatibility
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export NODE_OPTIONS="--no-warnings"

# Make sure attached_assets folder is created
mkdir -p attached_assets

echo "Building static HTML export..."

# Build Next.js static export with timeout
echo "Starting build with a 5-minute timeout..."
timeout 300 bun run next build
build_status=$?

if [ $build_status -eq 124 ]; then
  echo "Build timed out after 5 minutes. Creating detailed static site instead..."
  ./generate-simple-site.sh
  echo "Detailed static site created successfully."
elif [ $build_status -ne 0 ]; then
  echo "Build failed with status $build_status. Creating detailed static site instead..."
  ./generate-simple-site.sh
  echo "Detailed static site created successfully."
else
  echo "Build completed successfully."
fi

echo "Starting simple HTTP server to serve the static files on port 5000..."
cd out
exec npx http-server -p 5000 --cors -a 0.0.0.0