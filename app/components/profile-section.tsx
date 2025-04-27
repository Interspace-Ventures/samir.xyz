import { motion } from 'framer-motion';
import Link from 'next/link';

const ProfileSection = () => {
  return (
    <section id="profile" className="section">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Hey - I'm Samir
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-8 text-purple-primary">
            I drive impact at startups
          </p>
          
          <div className="space-y-4 text-text-tertiary">
            <p>
              Today, I am leading Strategic Finance for the Financial Partnerships team at <a 
                href="https://cash.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-light hover:text-white transition-colors"
              >
                Cash App
              </a> where we're expanding financial access to help users do more with their money.
            </p>
            
            <p>
              Prior to that, I drove financial partnerships at <a 
                href="https://unit.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-light hover:text-white transition-colors"
              >
                Unit
              </a>, which embeds financial features into products. Before that, I built and led the Strategic Finance function at <a 
                href="https://chime.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-light hover:text-white transition-colors"
              >
                Chime
              </a>. Earlier, I was the first finance hire at <a 
                href="https://sift.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-light hover:text-white transition-colors"
              >
                Sift
              </a>. I got my start in investment banking in the Financial Institutions Group at <a 
                href="https://jpmorgan.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-light hover:text-white transition-colors"
              >
                JP Morgan
              </a> covering market structure and asset management.
            </p>
            
            <p>
              Outside of work, I write over-engineered takes on stratfin, fintech, AI and politics on <a 
                href="https://x.com/heysamir" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-light hover:text-white transition-colors"
              >
                Twitter
              </a> and in the <a 
                href="https://posts.interspace.ventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-light hover:text-white transition-colors"
              >
                Interspace
              </a> newsletter. I also create over-engineered apps and ideas at <Link 
                href="/ventures" 
                className="text-purple-light hover:text-white transition-colors"
              >
                Interspace Ventures
              </Link>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSection;