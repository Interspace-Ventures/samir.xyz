import { motion } from 'framer-motion';

const ProfileSection = () => {
  return (
    <section id="profile" className="section py-32 md:py-40">
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
              <span className="text-primary-600">Hello,</span> I'm Your Name
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Developer, Designer, and Creative Thinker
            </p>
            <p className="mb-8">
              I build elegant, responsive, and performant websites and applications. With a passion for clean code and intuitive user experiences, I create digital solutions that stand out.
            </p>
            <div className="flex gap-4">
              <a
                href="#portfolio"
                className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-md hover:border-primary-600 hover:text-primary-600 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-tr from-primary-600 to-primary-400 rounded-full overflow-hidden">
              {/* You can add an actual profile image here */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-9xl font-bold">
                YN
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSection;