import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const ProfileSection = () => {
  return (
    <section id="profile" className="section">
      <div className="container max-w-6xl px-0">
        {/* Main content area */}
        <div className="mb-6">
          {/* 2x2 Grid for profile image and header */}
          <div className="flex flex-row gap-5">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div className="neo-card w-24 h-24 overflow-hidden bg-white p-1">
                <Image 
                  src="/images/samir.png" 
                  alt="Samir's profile picture"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </motion.div>

            {/* Title and Subtitle Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="content-card">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">
                  Hey - I'm Samir
                </h1>
                <p className="text-base sm:text-xl md:text-2xl font-bold">
                  I drive impact at startups
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bio text - full width in card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <div className="content-card space-y-4">
              <p>
                Today, I am leading Strategic Finance for the Financial Partnerships team at <a 
                  href="https://cash.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7f54dc] hover:text-white transition-colors underline"
                >
                  Cash App
                </a> where we're expanding financial access to help users do more with their money.
              </p>
              
              <p>
                Prior to that, I led Strategic Finance at <a 
                  href="https://hudsonrivertrading.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7f54dc] hover:text-white transition-colors underline"
                >
                  Hudson River Trading
                </a>, an algorithmic market maker, and drove financial partnerships at <a 
                  href="https://unit.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7f54dc] hover:text-white transition-colors underline"
                >
                  Unit
                </a>, which embeds financial features into products. Before that, I built and led the Strategic Finance function at <a 
                  href="https://chime.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7f54dc] hover:text-white transition-colors underline"
                >
                  Chime
                </a>. Earlier, I was the first finance hire at <a 
                  href="https://sift.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7f54dc] hover:text-white transition-colors underline"
                >
                  Sift
                </a>. I got my start in investment banking in the Financial Institutions Group at <a 
                  href="https://jpmorgan.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7f54dc] hover:text-white transition-colors underline"
                >
                  JP Morgan
                </a> covering market structure and asset management.
              </p>
              
              <p>
                Outside of work, I write over-engineered takes on stratfin, fintech, AI and politics on <a 
                  href="https://x.com/heysamir" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7f54dc] hover:text-white transition-colors underline"
                >
                  Twitter
                </a> and on <a 
                  href="https://posts.interspace.ventures" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7f54dc] hover:text-white transition-colors underline"
                >
                  Interspace
                </a>. I also create apps and concepts by coding at the speed of thought using <a
                  href="https://replit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7f54dc] hover:text-white transition-colors underline"
                >
                  Replit
                </a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;