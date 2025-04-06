// Script to comment out portfolio styles in globals.css
import { readFileSync, writeFileSync } from 'fs';

// Read the current globals.css file
const globalsPath = 'src/app/globals.css';
const globals = readFileSync(globalsPath, 'utf8');

// Let's identify and comment out portfolio-specific styles
const updatedGlobals = globals.replace(
  /(\/\* Portfolio grid styling[\s\S]*?letter-spacing: 0\.025em !important;\s*\})/g,
  '/* COMMENTED OUT TO AVOID CONFLICTS WITH CONSOLIDATED STYLES\n$1\n*/'
);

writeFileSync(globalsPath, updatedGlobals);
console.log('Portfolio styles in globals.css have been commented out');
