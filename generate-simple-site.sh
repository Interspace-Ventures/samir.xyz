#!/bin/bash

echo "Generating simple static site..."

# Create out directory if it doesn't exist
mkdir -p out

# Check if we already have static files
if [ -f "out/index.html" ] && [ -f "out/portfolio.html" ] && [ -f "out/profile.html" ] && [ -f "out/ventures.html" ]; then
  echo "Static files already exist. Using existing files."
else
  echo "Creating static HTML files..."
  
  # Create a basic styles.css file
  cat > out/styles.css << 'EOF'
:root {
  --primary-color: #0070f3;
  --text-color: #333;
  --background-color: #fff;
  --background-secondary: #f9f9f9;
  --border-color: #eaeaea;
  --success-color: #0070f3;
  --warning-color: #f5a623;
  --danger-color: #ff0000;
}

html {
  height: 100%;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.5;
  height: 100%;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.navbar-link {
  color: var(--text-color);
  text-decoration: none;
}

.navbar-link:hover {
  color: var(--primary-color);
}

.hero {
  padding: 4rem 0;
  text-align: center;
  background-color: var(--background-secondary);
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: rgba(0, 112, 243, 0.8);
  text-decoration: none;
}

.section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-description {
  color: #666;
}

.footer {
  background-color: var(--background-secondary);
  padding: 2rem 0;
  text-align: center;
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background-color: var(--background-secondary);
  border-radius: 8px;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #666;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
EOF

  # Create the index.html (Home) page
  cat > out/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samir's Portfolio | Home</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="attached_assets/samir-favicon.png">
</head>
<body>
  <header class="navbar">
    <div class="navbar-brand">S</div>
    <nav class="navbar-links">
      <a href="/" class="navbar-link">Home</a>
      <a href="/portfolio" class="navbar-link">Portfolio</a>
      <a href="/ventures" class="navbar-link">Ventures</a>
      <a href="/profile" class="navbar-link">Profile</a>
    </nav>
  </header>

  <section class="hero">
    <div class="container">
      <h1 class="hero-title">Hi, I'm Samir</h1>
      <p class="hero-subtitle">Angel Investor & Entrepreneur</p>
      <a href="/portfolio" class="btn btn-primary">View Portfolio</a>
    </div>
  </section>

  <main>
    <section class="section">
      <div class="container">
        <h2 class="section-title">About Me</h2>
        <p>
          I'm an angel investor and entrepreneur with a passion for helping early-stage founders build transformative companies.
          With over 15 years of experience in the tech industry, I've invested in and supported 30+ startups across various sectors.
        </p>
      </div>
    </section>

    <section class="section" style="background-color: var(--background-secondary);">
      <div class="container">
        <h2 class="section-title">Investment Focus</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">30+</div>
            <div class="stat-label">Companies</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">$15M+</div>
            <div class="stat-label">Invested</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">10</div>
            <div class="stat-label">Exits</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">5</div>
            <div class="stat-label">Unicorns</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">Featured Investments</h2>
        <div class="card-grid">
          <div class="card">
            <img src="attached_assets/2de-interspace.png" alt="Interspace" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Interspace</h3>
              <p class="card-description">Building the next generation of collaboration tools.</p>
            </div>
          </div>
          <div class="card">
            <img src="attached_assets/solo-logo-2025.png" alt="Solo" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Solo</h3>
              <p class="card-description">Revolutionizing the creator economy with AI-powered tools.</p>
            </div>
          </div>
          <div class="card">
            <img src="attached_assets/predictive-film-icon.png" alt="Predictive Film" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Predictive Film</h3>
              <p class="card-description">Using data to predict box office success before production.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Samir's Portfolio. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>
EOF

  # Create the portfolio.html page
  cat > out/portfolio.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samir's Portfolio | Investment Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="attached_assets/samir-favicon.png">
  <style>
    .category-filters {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .filter-button {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .filter-button.active {
      background-color: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    
    .company-tag {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .tag-acquired {
      background-color: #34c759;
      color: white;
    }
    
    .tag-category {
      background-color: #007aff;
      color: white;
    }
  </style>
</head>
<body>
  <header class="navbar">
    <div class="navbar-brand">S</div>
    <nav class="navbar-links">
      <a href="/" class="navbar-link">Home</a>
      <a href="/portfolio" class="navbar-link">Portfolio</a>
      <a href="/ventures" class="navbar-link">Ventures</a>
      <a href="/profile" class="navbar-link">Profile</a>
    </nav>
  </header>

  <section class="hero" style="padding: 3rem 0;">
    <div class="container">
      <h1 class="hero-title">Investment Portfolio</h1>
      <p class="hero-subtitle">Companies I've invested in and supported</p>
    </div>
  </section>

  <main>
    <section class="section">
      <div class="container">
        <div class="category-filters">
          <button class="filter-button active" data-category="All">All</button>
          <button class="filter-button" data-category="Fintech">Fintech</button>
          <button class="filter-button" data-category="Health">Health</button>
          <button class="filter-button" data-category="Retail">Retail</button>
          <button class="filter-button" data-category="SaaS">SaaS</button>
        </div>
        
        <div class="card-grid" id="portfolio-grid">
          <!-- Fintech -->
          <div class="card" data-category="Fintech">
            <img src="attached_assets/Kartera.png" alt="Kartera" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Kartera</h3>
              <p class="card-description">Next-gen banking platform for Gen Z.</p>
              <div>
                <span class="company-tag tag-category">Fintech</span>
              </div>
            </div>
          </div>
          
          <div class="card" data-category="Fintech">
            <img src="attached_assets/GEM.png" alt="GEM" class="card-image">
            <div class="card-content">
              <h3 class="card-title">GEM Protocol</h3>
              <p class="card-description">Decentralized finance platform for sustainable investing.</p>
              <div>
                <span class="company-tag tag-category">Fintech</span>
              </div>
            </div>
          </div>
          
          <!-- Health -->
          <div class="card" data-category="Health">
            <img src="attached_assets/Harper.png" alt="Harper Health" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Harper Health</h3>
              <p class="card-description">AI-powered preventative healthcare platform.</p>
              <div>
                <span class="company-tag tag-category">Health</span>
              </div>
            </div>
          </div>
          
          <div class="card" data-category="Health">
            <img src="attached_assets/Swan.png" alt="Swan" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Swan</h3>
              <p class="card-description">Mental health platform for workplace wellness.</p>
              <div>
                <span class="company-tag tag-category">Health</span>
                <span class="company-tag tag-acquired">Acquired</span>
              </div>
            </div>
          </div>
          
          <!-- Retail -->
          <div class="card" data-category="Retail">
            <img src="attached_assets/Goodmylk.png" alt="Goodmylk" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Goodmylk</h3>
              <p class="card-description">Plant-based milk alternative with sustainable packaging.</p>
              <div>
                <span class="company-tag tag-category">Retail</span>
              </div>
            </div>
          </div>
          
          <div class="card" data-category="Retail">
            <img src="attached_assets/Sanzo.png" alt="Sanzo" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Sanzo</h3>
              <p class="card-description">Asian-inspired sparkling water with real fruit.</p>
              <div>
                <span class="company-tag tag-category">Retail</span>
              </div>
            </div>
          </div>
          
          <!-- SaaS -->
          <div class="card" data-category="SaaS">
            <img src="attached_assets/Lunar.png" alt="Lunar" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Lunar</h3>
              <p class="card-description">Design collaboration platform for product teams.</p>
              <div>
                <span class="company-tag tag-category">SaaS</span>
              </div>
            </div>
          </div>
          
          <div class="card" data-category="SaaS">
            <img src="attached_assets/Techmate.png" alt="Techmate" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Techmate</h3>
              <p class="card-description">Technical interview platform for engineering teams.</p>
              <div>
                <span class="company-tag tag-category">SaaS</span>
                <span class="company-tag tag-acquired">Acquired</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Samir's Portfolio. All rights reserved.</p>
    </div>
  </footer>

  <script>
    // Simple category filter functionality
    document.addEventListener('DOMContentLoaded', function() {
      const filterButtons = document.querySelectorAll('.filter-button');
      const portfolioItems = document.querySelectorAll('#portfolio-grid .card');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          const selectedCategory = this.getAttribute('data-category');
          
          // Filter portfolio items
          portfolioItems.forEach(item => {
            if (selectedCategory === 'All' || item.getAttribute('data-category') === selectedCategory) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });
  </script>
</body>
</html>
EOF

  # Create the profile.html page
  cat > out/profile.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samir's Portfolio | Profile</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="attached_assets/samir-favicon.png">
  <style>
    .profile-section {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 3rem;
      align-items: start;
    }
    
    .profile-image {
      width: 100%;
      max-width: 400px;
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .timeline {
      position: relative;
      max-width: 800px;
      margin: 3rem auto;
    }
    
    .timeline::after {
      content: '';
      position: absolute;
      width: 4px;
      background-color: var(--border-color);
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -2px;
    }
    
    .timeline-item {
      padding: 10px 40px;
      position: relative;
      width: 50%;
      box-sizing: border-box;
    }
    
    .timeline-item:nth-child(odd) {
      left: 0;
    }
    
    .timeline-item:nth-child(even) {
      left: 50%;
    }
    
    .timeline-item::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: white;
      border: 4px solid var(--primary-color);
      border-radius: 50%;
      top: 15px;
      z-index: 1;
    }
    
    .timeline-item:nth-child(odd)::after {
      right: -12px;
    }
    
    .timeline-item:nth-child(even)::after {
      left: -12px;
    }
    
    .timeline-content {
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .timeline-year {
      font-weight: bold;
      color: var(--primary-color);
      margin-bottom: 5px;
    }
    
    @media (max-width: 768px) {
      .profile-section {
        grid-template-columns: 1fr;
      }
      
      .profile-image-container {
        text-align: center;
      }
      
      .timeline::after {
        left: 31px;
      }
      
      .timeline-item {
        width: 100%;
        padding-left: 70px;
        padding-right: 25px;
      }
      
      .timeline-item:nth-child(even) {
        left: 0;
      }
      
      .timeline-item::after {
        left: 20px;
      }
    }
  </style>
</head>
<body>
  <header class="navbar">
    <div class="navbar-brand">S</div>
    <nav class="navbar-links">
      <a href="/" class="navbar-link">Home</a>
      <a href="/portfolio" class="navbar-link">Portfolio</a>
      <a href="/ventures" class="navbar-link">Ventures</a>
      <a href="/profile" class="navbar-link">Profile</a>
    </nav>
  </header>

  <section class="hero" style="padding: 3rem 0;">
    <div class="container">
      <h1 class="hero-title">About Me</h1>
      <p class="hero-subtitle">My journey, experience, and expertise</p>
    </div>
  </section>

  <main>
    <section class="section">
      <div class="container">
        <div class="profile-section">
          <div class="profile-image-container">
            <img src="attached_assets/samir-profile-photo.webp" alt="Samir Profile Photo" class="profile-image">
          </div>
          <div class="profile-content">
            <h2>Samir Patel</h2>
            <p>
              I'm an angel investor and entrepreneur with over 15 years of experience in the tech industry. 
              I focus on investing in and supporting early-stage founders building transformative companies 
              in fintech, health tech, consumer, and SaaS.
            </p>
            <p>
              After successfully exiting my own startup in 2015, I've been actively investing in and advising 
              early-stage companies. I believe in being a hands-on investor, providing not just capital but also 
              strategic guidance, network connections, and operational expertise.
            </p>
            <p>
              My investment approach is founder-first. I look for passionate, resilient teams tackling significant 
              problems with innovative solutions. I typically invest at the pre-seed and seed stages, partnering with 
              founders for the long journey ahead.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background-color: var(--background-secondary);">
      <div class="container">
        <h2 class="section-title">My Journey</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-year">2010</div>
              <h3>Founded First Startup</h3>
              <p>
                Co-founded Cloudbox, a cloud storage and collaboration platform for small businesses.
              </p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-year">2015</div>
              <h3>Successful Exit</h3>
              <p>
                Cloudbox acquired by Enterprise Solutions Inc. for $45M.
              </p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-year">2016</div>
              <h3>Angel Investing Begins</h3>
              <p>
                Made first 5 angel investments in early-stage startups.
              </p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-year">2019</div>
              <h3>Launched Venture Studio</h3>
              <p>
                Founded Interspace Ventures to incubate and accelerate innovative startups.
              </p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-year">2022</div>
              <h3>First Fund</h3>
              <p>
                Raised $20M fund to invest in early-stage founders.
              </p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-year">2025</div>
              <h3>Portfolio Expansion</h3>
              <p>
                Portfolio grows to 30+ companies with 10 successful exits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">Expertise & Interests</h2>
        <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr);">
          <div class="stat-item">
            <h3>Investment Strategy</h3>
            <ul>
              <li>Pre-seed & Seed rounds</li>
              <li>$100K-$500K check sizes</li>
              <li>Hands-on mentorship</li>
              <li>Network & resource access</li>
            </ul>
          </div>
          <div class="stat-item">
            <h3>Industry Focus</h3>
            <ul>
              <li>Financial Technology</li>
              <li>Healthcare Innovation</li>
              <li>Consumer Products</li>
              <li>Enterprise SaaS</li>
            </ul>
          </div>
          <div class="stat-item">
            <h3>Personal Interests</h3>
            <ul>
              <li>Ultra-marathon running</li>
              <li>Underwater photography</li>
              <li>Science fiction literature</li>
              <li>Renewable energy advocacy</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Samir's Portfolio. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>
EOF

  # Create the ventures.html page
  cat > out/ventures.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samir's Portfolio | Ventures</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="attached_assets/samir-favicon.png">
  <style>
    .ventures-intro {
      max-width: 800px;
      margin: 0 auto 3rem;
      text-align: center;
    }
    
    .ventures-card {
      border: 1px solid var(--border-color);
      border-radius: 12px;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 2fr;
      margin-bottom: 2rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .ventures-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .ventures-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .ventures-content {
      padding: 2rem;
    }
    
    .ventures-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .ventures-description {
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .ventures-card {
        grid-template-columns: 1fr;
      }
      
      .ventures-image {
        height: 250px;
      }
    }
  </style>
</head>
<body>
  <header class="navbar">
    <div class="navbar-brand">S</div>
    <nav class="navbar-links">
      <a href="/" class="navbar-link">Home</a>
      <a href="/portfolio" class="navbar-link">Portfolio</a>
      <a href="/ventures" class="navbar-link">Ventures</a>
      <a href="/profile" class="navbar-link">Profile</a>
    </nav>
  </header>

  <section class="hero" style="padding: 3rem 0;">
    <div class="container">
      <h1 class="hero-title">Ventures</h1>
      <p class="hero-subtitle">Companies I've founded and built</p>
    </div>
  </section>

  <main>
    <section class="section">
      <div class="container">
        <div class="ventures-intro">
          <p>
            Beyond investing, I'm passionate about building companies from the ground up. 
            These are the ventures I've founded or co-founded throughout my entrepreneurial journey.
          </p>
        </div>

        <div class="ventures-list">
          <div class="ventures-card">
            <img src="attached_assets/interspace.png" alt="Interspace Ventures" class="ventures-image">
            <div class="ventures-content">
              <h3 class="ventures-title">Interspace Ventures</h3>
              <p class="ventures-description">
                Interspace Ventures is a startup studio that partners with exceptional founders to build, launch, 
                and scale innovative companies. We provide capital, resources, and hands-on operational support to 
                help founders accelerate their journey from concept to market leadership.
              </p>
              <a href="#" class="btn btn-primary">Learn More</a>
            </div>
          </div>

          <div class="ventures-card">
            <img src="attached_assets/predictive-film-icon.png" alt="Predictive Film" class="ventures-image">
            <div class="ventures-content">
              <h3 class="ventures-title">Predictive Film</h3>
              <p class="ventures-description">
                Predictive Film uses advanced data analytics and machine learning to forecast box office performance 
                for films in development. Our platform helps studios and producers make more informed decisions about 
                which projects to greenlight, how to market them, and how to optimize distribution strategies.
              </p>
              <a href="#" class="btn btn-primary">Learn More</a>
            </div>
          </div>

          <div class="ventures-card">
            <img src="attached_assets/solo-logo-2025.png" alt="Solo" class="ventures-image">
            <div class="ventures-content">
              <h3 class="ventures-title">Solo</h3>
              <p class="ventures-description">
                Solo is an AI-powered platform that helps content creators monetize their work more effectively. 
                By analyzing content performance, audience engagement, and market trends, Solo provides creators with 
                actionable insights and tools to optimize their monetization strategy across multiple platforms.
              </p>
              <a href="#" class="btn btn-primary">Learn More</a>
            </div>
          </div>

          <div class="ventures-card">
            <img src="attached_assets/hey-im-samir.png" alt="Hey I'm Samir" class="ventures-image">
            <div class="ventures-content">
              <h3 class="ventures-title">Hey I'm Samir</h3>
              <p class="ventures-description">
                Hey I'm Samir is my personal brand and media platform where I share insights, experiences, and lessons 
                from my entrepreneurial journey. Through podcasts, newsletters, and social content, I aim to help the 
                next generation of founders navigate the challenges of building meaningful companies.
              </p>
              <a href="#" class="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background-color: var(--background-secondary);">
      <div class="container">
        <h2 class="section-title">Past Ventures</h2>
        <div class="card-grid">
          <div class="card">
            <img src="attached_assets/Cloudbox.png" onerror="this.src='attached_assets/placeholder.svg'" alt="Cloudbox" class="card-image">
            <div class="card-content">
              <h3 class="card-title">Cloudbox</h3>
              <p class="card-description">Cloud storage and collaboration platform for small businesses. Acquired in 2015.</p>
            </div>
          </div>
          
          <div class="card">
            <img src="attached_assets/DataSense.png" onerror="this.src='attached_assets/placeholder.svg'" alt="DataSense" class="card-image">
            <div class="card-content">
              <h3 class="card-title">DataSense</h3>
              <p class="card-description">Business intelligence platform for e-commerce. Acquired in 2018.</p>
            </div>
          </div>
          
          <div class="card">
            <img src="attached_assets/NovaTech.png" onerror="this.src='attached_assets/placeholder.svg'" alt="NovaTech" class="card-image">
            <div class="card-content">
              <h3 class="card-title">NovaTech</h3>
              <p class="card-description">IoT platform for smart home devices. Acquired in 2020.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Samir's Portfolio. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>
EOF

  # Create placeholder/fallback images
  cat > out/placeholder.svg << 'EOF'
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="200" fill="#f0f0f0"/>
  <text x="50%" y="50%" font-family="Arial" font-size="18" text-anchor="middle" dominant-baseline="middle" fill="#888">Image Placeholder</text>
</svg>
EOF

  # Create additional placeholder files for past ventures that might not exist
  mkdir -p out/attached_assets
  cp attached_assets/* out/attached_assets/ 2>/dev/null || true

  echo "Static site generated successfully!"
fi