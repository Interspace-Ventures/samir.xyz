#!/bin/bash

echo "Generating simple static site..."

# Create output directory if it doesn't exist
mkdir -p out

# Create basic HTML files with common styles
cat > out/styles.css << 'EOF'
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #0070f3;
}

.hero {
  padding: 4rem 0;
  text-align: center;
  background-color: #fff;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #0070f3;
}

.hero p {
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  color: #666;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card h3 {
  margin-top: 0;
  color: #0070f3;
}

.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 3rem 0;
}

.stat {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  flex: 1 1 200px;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #0070f3;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 1rem;
}

.footer {
  background-color: #f1f5f9;
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 1rem;
}

.footer-links a {
  color: #666;
  text-decoration: none;
}

.footer-links a:hover {
  color: #0070f3;
  text-decoration: underline;
}

.copyright {
  color: #666;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  
  .hero h1 {
    font-size: 1.75rem;
  }
  
  .hero p {
    font-size: 1rem;
  }
  
  .stats {
    flex-direction: column;
  }
}
EOF

# Create index.html (Home page)
cat > out/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samir's Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.png" type="image/png">
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <h1>Samir</h1>
        </div>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="ventures.html">Ventures</a>
          <a href="profile.html">Profile</a>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>Investor & Entrepreneur</h1>
        <p>Focused on fintech, SaaS, retail, and health ventures that shape the future of technology and business.</p>
      </div>
    </section>

    <section class="container">
      <div class="stats">
        <div class="stat">
          <div class="stat-value">15+</div>
          <div class="stat-label">Companies Invested</div>
        </div>
        <div class="stat">
          <div class="stat-value">$125M</div>
          <div class="stat-label">Funds Managed</div>
        </div>
        <div class="stat">
          <div class="stat-value">92%</div>
          <div class="stat-label">Success Rate</div>
        </div>
        <div class="stat">
          <div class="stat-value">8</div>
          <div class="stat-label">Years Experience</div>
        </div>
      </div>

      <h2>Featured Investments</h2>
      <div class="card-grid">
        <div class="card">
          <div class="card-content">
            <h3>Fintech Solutions</h3>
            <p>Revolutionizing payment processing with blockchain technology, ensuring secure and instant transactions globally.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <h3>Health Innovations</h3>
            <p>Developing AI-driven diagnostics that enhance medical accuracy and reduce healthcare costs for patients.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <h3>Retail Tech</h3>
            <p>Creating omnichannel experiences that bridge online and physical shopping for the modern consumer.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          © 2025 Samir. All rights reserved. Generated on March 23, 2025.
        </div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="ventures.html">Ventures</a>
          <a href="profile.html">Profile</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
EOF

# Create portfolio.html
cat > out/portfolio.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio - Samir's Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.png" type="image/png">
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <h1>Samir</h1>
        </div>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="ventures.html">Ventures</a>
          <a href="profile.html">Profile</a>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>Investment Portfolio</h1>
        <p>A collection of innovative companies I've invested in, categorized by industry focus.</p>
      </div>
    </section>

    <section class="container">
      <div class="filter-controls">
        <button class="filter-btn active">All</button>
        <button class="filter-btn">Fintech</button>
        <button class="filter-btn">Health</button>
        <button class="filter-btn">Retail</button>
        <button class="filter-btn">SaaS</button>
      </div>

      <div class="card-grid">
        <!-- Fintech -->
        <div class="card" data-category="Fintech">
          <div class="card-content">
            <h3>Margin</h3>
            <p>Modern banking for businesses.</p>
          </div>
        </div>
        <div class="card" data-category="Fintech">
          <div class="card-content">
            <h3>Rely</h3>
            <p>Innovative payment solutions.</p>
          </div>
        </div>
        <div class="card" data-category="Fintech">
          <div class="card-content">
            <h3>Kartera</h3>
            <p>Digital asset management platform.</p>
          </div>
        </div>
        
        <!-- Health -->
        <div class="card" data-category="Health">
          <div class="card-content">
            <h3>Aura</h3>
            <p>Mental wellness through technology.</p>
          </div>
        </div>
        <div class="card" data-category="Health">
          <div class="card-content">
            <h3>GEM</h3>
            <p>Preventative health innovations.</p>
          </div>
        </div>
        
        <!-- Retail -->
        <div class="card" data-category="Retail">
          <div class="card-content">
            <h3>Sanzo</h3>
            <p>Asian-inspired sparkling water.</p>
          </div>
        </div>
        <div class="card" data-category="Retail">
          <div class="card-content">
            <h3>Goodmylk</h3>
            <p>Plant-based dairy alternatives.</p>
          </div>
        </div>
        
        <!-- SaaS -->
        <div class="card" data-category="SaaS">
          <div class="card-content">
            <h3>Playbook</h3>
            <p>File management for creative teams.</p>
          </div>
        </div>
        <div class="card" data-category="SaaS">
          <div class="card-content">
            <h3>Restream</h3>
            <p>Multi-platform streaming service.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          © 2025 Samir. All rights reserved. Generated on March 23, 2025.
        </div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="ventures.html">Ventures</a>
          <a href="profile.html">Profile</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
EOF

# Create ventures.html
cat > out/ventures.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ventures - Samir's Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.png" type="image/png">
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <h1>Samir</h1>
        </div>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="ventures.html">Ventures</a>
          <a href="profile.html">Profile</a>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>Venture Partnerships</h1>
        <p>Strategic partnerships and ventures I've developed with innovative companies.</p>
      </div>
    </section>

    <section class="container">
      <div class="card-grid">
        <div class="card">
          <div class="card-content">
            <h3>Interspace</h3>
            <p>Reimagining workplace collaboration for remote teams through intuitive digital environments.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <h3>2DE</h3>
            <p>Early-stage venture capital firm focusing on disruptive technologies and business models.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <h3>Solo</h3>
            <p>Independent creator economy platform empowering artists and content developers.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <h3>Predictive Film</h3>
            <p>AI-driven analytics for entertainment industry production and distribution decisions.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          © 2025 Samir. All rights reserved. Generated on March 23, 2025.
        </div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="ventures.html">Ventures</a>
          <a href="profile.html">Profile</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
EOF

# Create profile.html
cat > out/profile.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile - Samir's Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.png" type="image/png">
  <style>
    .profile-section {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      margin: 2rem 0;
    }
    
    .profile-image {
      flex: 0 0 300px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .profile-image img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .profile-content {
      flex: 1 1 500px;
    }
    
    .timeline {
      margin-top: 3rem;
    }
    
    .timeline-item {
      position: relative;
      padding-left: 2rem;
      padding-bottom: 2rem;
      border-left: 2px solid #e5e7eb;
    }
    
    .timeline-item:last-child {
      border-left: none;
    }
    
    .timeline-item::before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: #0070f3;
      border-radius: 50%;
      left: -9px;
      top: 0;
    }
    
    .timeline-year {
      font-weight: 700;
      color: #0070f3;
      margin-bottom: 0.5rem;
    }
    
    .timeline-content {
      margin-left: 1rem;
    }
    
    @media (max-width: 768px) {
      .profile-section {
        flex-direction: column;
      }
      
      .profile-image {
        flex: 0 0 auto;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <h1>Samir</h1>
        </div>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="ventures.html">Ventures</a>
          <a href="profile.html">Profile</a>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>About Samir</h1>
        <p>Investor, entrepreneur, and technology enthusiast with a passion for innovation.</p>
      </div>
    </section>

    <section class="container">
      <div class="profile-section">
        <div class="profile-image">
          <!-- Image placeholder -->
          <div style="background-color: #f0f4f8; height: 400px; display: flex; align-items: center; justify-content: center;">
            <span style="color: #94a3b8; font-size: 1.25rem;">Profile Photo</span>
          </div>
        </div>
        
        <div class="profile-content">
          <h2>My Story</h2>
          <p>With over 8 years of experience in venture capital and entrepreneurship, I've developed a keen eye for identifying disruptive technologies and business models that have the potential to transform industries.</p>
          <p>My investment philosophy centers around supporting passionate founders who are solving real problems with innovative approaches. I believe in hands-on involvement, providing not just capital but strategic guidance, network access, and operational support.</p>
          <p>Prior to my current ventures, I worked in investment banking and tech startups, giving me a comprehensive understanding of both the financial and operational aspects of building successful companies.</p>
          
          <div class="timeline">
            <h3>Professional Journey</h3>
            
            <div class="timeline-item">
              <div class="timeline-year">2025 - Present</div>
              <div class="timeline-content">
                <h4>Managing Partner, 2DE Ventures</h4>
                <p>Leading early-stage investments in technology startups across fintech, health tech, and SaaS sectors.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-year">2020 - 2025</div>
              <div class="timeline-content">
                <h4>Founder, Interspace</h4>
                <p>Built and scaled a workplace collaboration platform serving over 500 enterprise clients globally.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-year">2017 - 2020</div>
              <div class="timeline-content">
                <h4>Investment Director, Global Tech Fund</h4>
                <p>Managed a $100M portfolio focusing on Series A and B investments in emerging technologies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          © 2025 Samir. All rights reserved. Generated on March 23, 2025.
        </div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="ventures.html">Ventures</a>
          <a href="profile.html">Profile</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
EOF

# Copy a favicon if available
if [ -f "attached_assets/samir-favicon.png" ]; then
  cp attached_assets/samir-favicon.png out/favicon.png
elif [ -f "attached_assets/favicon.png" ]; then
  cp attached_assets/favicon.png out/favicon.png
else
  # Create a simple favicon
  cat > out/favicon.png << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB
uElEQVRYhe2XvUoDQRDHf7l4hYVFTKGFgq3a2Ihgo7wBUxrsfAmxsfAJbH0EHyAnClb6AIJNLLQw
kj5NmtxlXdbbu10TQkgu/MPcznwc/53Z3ZlbY4whjRVSWioAqQNUq9WJSZTLZRvA9JQCiSBN16X7
ORGUi3m2V3McrRc4F13OM4VZNI0wRYD1lRyliXN+DETr+OJ9xkxdMCaDaAexfOMI16c9AEpvXS7e
R9Fcu8UkwMFafiiQFXMdW93QI8Q5oJRhKqPIa3G9NxhVMLfXr9FbmPPbAz7boexmXoegAcLz5wEg
V9gcasHxdgHJ3nKuT8P6v7GdCIoWAI7Rw5xA8wbAdQ2vP0IPQX6x+MtEPBbG3RdCpLyEbEYRTAeJ
4zcEIQRk4FII8YxCvfV5H94BGRxwKXm7zrkNwXvEA3Ck16eAe2NM1RhTA+7sWBV4slWZ1fXAXqcJ
KOt1UYQI6/ZcO9b1PD4MAB3gBrgROkJC2/Pcno8LIACOgVPgEtgDznUCQF7A74E+0BN9D+gCHeAK
uLNrDqMWMvf9YH31zPz/E0wSQZtNDOXiYKz94FgbEv9OSr+CSQKkXfAfO1XyQ+Oc2CQAAAAASUVO
RK5CYII=
EOF
fi

echo "Simple static site generated successfully."