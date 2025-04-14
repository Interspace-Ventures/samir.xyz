# Assets Directory

This directory contains all assets for the portfolio website, organized by type.

## Structure

- `/assets/companies` - Company logos and images
- `/assets/ventures` - Venture logos and images
- `/assets/profiles` - Profile photos and personal images
- `/assets/logos` - Brand logos and primary brand assets
- `/assets/icons` - Icon files including favicon and app icons (SVG, PNG)
- `/assets/images` - General images used throughout the site
- `/assets/documents` - PDF and other document files

## Migration Notes

The assets were migrated from the following legacy directories:
- `/logos/companies` → `/assets/companies`
- `/logos/ventures` → `/assets/ventures`
- `/images` → `/assets/profiles` and `/assets/images`
- `/logos/*.png` and `/logos/*.svg` → `/assets/logos`
- Root icon files → `/assets/icons`

All files have been normalized to lowercase with hyphens instead of spaces.
