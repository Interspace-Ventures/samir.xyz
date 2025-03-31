// Simple script to update all the text shadows with deeper purple colors
const fs = require('fs');

const navbarPath = 'src/components/layout/minimal-navbar.tsx';
let content = fs.readFileSync(navbarPath, 'utf8');

// Update all occurrences of text shadows in navbar links
content = content.replace(
  /textShadow: isDark && pathname\.startsWith\("\/profile"\) \? "0 0 8px rgba\(192, 132, 252, 0\.6\)" : "none"/g,
  'textShadow: isDark && pathname.startsWith("/profile") ? "0 0 8px rgba(147, 51, 234, 0.7)" : "none"'
);

content = content.replace(
  /textShadow: isDark && pathname\.startsWith\("\/portfolio"\) \? "0 0 8px rgba\(192, 132, 252, 0\.6\)" : "none"/g,
  'textShadow: isDark && pathname.startsWith("/portfolio") ? "0 0 8px rgba(147, 51, 234, 0.7)" : "none"'
);

content = content.replace(
  /textShadow: isDark && pathname\.startsWith\("\/ventures"\) \? "0 0 8px rgba\(192, 132, 252, 0\.6\)" : "none"/g,
  'textShadow: isDark && pathname.startsWith("/ventures") ? "0 0 8px rgba(147, 51, 234, 0.7)" : "none"'
);

// Update box shadows on indicator bars
content = content.replace(
  /boxShadow: isDark \? "0 0 8px rgba\(192, 132, 252, 0\.8\)" : "none"/g,
  'boxShadow: isDark ? "0 0 8px rgba(147, 51, 234, 0.8)" : "none"'
);

// Update logo text shadow
content = content.replace(
  /textShadow: isDark \? "0 0 10px rgba\(192, 132, 252, 0\.5\)" : "none"/g,
  'textShadow: isDark ? "0 0 10px rgba(147, 51, 234, 0.6)" : "none"'
);

fs.writeFileSync(navbarPath, content);
console.log('Updated navbar text shadows with deeper purple colors');