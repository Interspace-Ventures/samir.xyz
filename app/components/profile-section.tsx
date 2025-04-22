import { motion } from 'framer-motion';

const ProfileSection = () => {
  return (
    <div className="container">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="heading-1 mb-6">
            <span className="text-text-secondary">Interspace</span>{' '}
            <span className="text-text-primary">Ventures</span>
          </h1>
          <p className="text-xl mb-8 text-text-secondary">
            Angel Investments &amp; Venture Capital
          </p>
          <p className="mb-8 text-text-tertiary">
            We invest in early-stage technology companies with transformative potential. 
            Our portfolio spans various sectors including AI, fintech, consumer brands, 
            and enterprise SaaS.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#portfolio"
              className="px-6 py-3 bg-purple-primary text-white rounded-md hover:bg-purple-light transition-colors"
            >
              View Portfolio
            </a>
            <a
              href="#ventures"
              className="px-6 py-3 border border-purple-primary rounded-md hover:bg-purple-dark/50 transition-colors"
            >
              Explore Ventures
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gradient-to-tr from-purple-dark to-purple-primary/70 rounded-2xl overflow-hidden p-10">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-7xl font-bold text-text-primary mb-4">37+</div>
                <div className="text-xl text-text-secondary">Companies</div>
                <div className="mt-8 text-4xl font-bold text-text-primary mb-4">$25M+</div>
                <div className="text-xl text-text-secondary">Deployed</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSection;