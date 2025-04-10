// Emergency Navbar for fallback scenarios
(function addEmergencyNavbar() {
  // Don't add it twice
  if (document.querySelector('.simple-emergency-navbar')) {
    return;
  }
  
  // Create the navbar element
  const navbar = document.createElement('div');
  navbar.className = 'simple-emergency-navbar';
  navbar.style.position = 'fixed'; // Ensure the navbar sticks to the top of the page
  navbar.style.top = '0';
  navbar.style.left = '0';
  navbar.style.width = '100%';
  navbar.style.height = '80px';
  navbar.style.backgroundColor = '#5239cc';
  navbar.style.display = 'flex';
  navbar.style.justifyContent = 'center';
  navbar.style.zIndex = '9999';
  navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
  
  // Create the container
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.justifyContent = 'space-between';
  container.style.alignItems = 'center';
  container.style.width = '100%';
  container.style.maxWidth = '1200px';
  container.style.padding = '0 24px';
  
  // Left side - logo and wordmark
  const leftSide = document.createElement('div');
  leftSide.style.display = 'flex';
  leftSide.style.alignItems = 'center';
  
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.style.display = 'flex';
  logoLink.style.alignItems = 'center';
  logoLink.style.textDecoration = 'none';
  
  const logoBox = document.createElement('div');
  logoBox.style.background = 'linear-gradient(135deg, #4285f4 0%, #8c5ad7 100%)';
  logoBox.style.width = '48px';
  logoBox.style.height = '48px';
  logoBox.style.display = 'flex';
  logoBox.style.alignItems = 'center';
  logoBox.style.justifyContent = 'center';
  logoBox.style.borderRadius = '8px';
  logoBox.style.marginRight = '16px';
  logoBox.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
  
  const logoText = document.createElement('span');
  logoText.textContent = 'S';
  logoText.style.color = 'white';
  logoText.style.fontSize = '24px';
  logoText.style.fontWeight = 'bold';
  logoText.style.fontFamily = 'Alexandria, sans-serif';
  
  const wordmark = document.createElement('span');
  wordmark.textContent = 'samir.xyz';
  wordmark.style.color = 'white';
  wordmark.style.fontSize = '24px';
  wordmark.style.fontWeight = '500';
  wordmark.style.fontFamily = 'Alexandria, sans-serif';
  
  // Right side - navigation
  const rightSide = document.createElement('div');
  rightSide.style.display = 'flex';
  rightSide.style.gap = '32px';
  
  const aboutLink = document.createElement('a');
  aboutLink.href = '/profile/';
  aboutLink.textContent = 'ABOUT';
  aboutLink.style.color = 'white';
  aboutLink.style.fontSize = '16px';
  aboutLink.style.textTransform = 'uppercase';
  aboutLink.style.letterSpacing = '0.05em';
  aboutLink.style.fontFamily = 'Alexandria, sans-serif';
  aboutLink.style.textDecoration = 'none';
  
  const portfolioLink = document.createElement('a');
  portfolioLink.href = '/portfolio/';
  portfolioLink.textContent = 'PORTFOLIO';
  portfolioLink.style.color = 'white';
  portfolioLink.style.fontSize = '16px';
  portfolioLink.style.textTransform = 'uppercase';
  portfolioLink.style.letterSpacing = '0.05em';
  portfolioLink.style.fontFamily = 'Alexandria, sans-serif';
  portfolioLink.style.textDecoration = 'none';
  
  const venturesLink = document.createElement('a');
  venturesLink.href = '/ventures/';
  venturesLink.textContent = 'VENTURES';
  venturesLink.style.color = 'white';
  venturesLink.style.fontSize = '16px';
  venturesLink.style.textTransform = 'uppercase';
  venturesLink.style.letterSpacing = '0.05em';
  venturesLink.style.fontFamily = 'Alexandria, sans-serif';
  venturesLink.style.textDecoration = 'none';
  
  // Build the DOM tree
  logoBox.appendChild(logoText);
  logoLink.appendChild(logoBox);
  logoLink.appendChild(wordmark);
  leftSide.appendChild(logoLink);
  
  rightSide.appendChild(aboutLink);
  rightSide.appendChild(portfolioLink);
  rightSide.appendChild(venturesLink);
  
  container.appendChild(leftSide);
  container.appendChild(rightSide);
  navbar.appendChild(container);
  
  // Add spacer to prevent content from going under navbar (no extra space)
  const spacer = document.createElement('div');
  spacer.style.height = '80px';
  spacer.style.padding = '0';
  spacer.style.margin = '0';
  
  // Add to document
  if (document.body) {
    document.body.prepend(spacer);
    document.body.prepend(navbar);
    
    // Add padding to main content to prevent overlap
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.paddingTop = '0';
    }
  } else {
    // If body doesn't exist yet, wait for it
    document.addEventListener('DOMContentLoaded', () => {
      document.body.prepend(spacer);
      document.body.prepend(navbar);
      
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.style.paddingTop = '0';
      }
    });
  }
}());