import { motion } from "framer-motion";

const Profile = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-5xl font-bold tracking-tight mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Hey - I'm Samir.
      </motion.h1>

      <motion.h2 
        className="text-2xl font-medium tracking-tight mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        I drive business impact at fintechs.
      </motion.h2>

      <motion.div 
        className="space-y-4 text-lg tracking-normal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p>
          Today, I am building Strategic Finance at{" "}
          <a href="https://hrt.com" className="text-blue-600 hover:underline transition-colors">
            HRT
          </a>{" "}
          where we're using algorithms to drive efficiency in markets. Previously, I was at{" "}
          <a href="https://unit.co" className="text-blue-600 hover:underline transition-colors">
            Unit
          </a>
          , which embeds financial features into products. Before that, I built and led the Strategic Finance function at{" "}
          <a href="https://chime.com" className="text-blue-600 hover:underline transition-colors">
            Chime
          </a>
          . Earlier, I was the first finance hire at{" "}
          <a href="https://sift.com" className="text-blue-600 hover:underline transition-colors">
            Sift
          </a>
          . I got my start in investment banking in the Financial Institutions Group at{" "}
          <a href="https://jpmorgan.com" className="text-blue-600 hover:underline transition-colors">
            JP Morgan
          </a>{" "}
          covering market structure and asset management.
        </p>

        <p>
          In my free time, I write over-engineered threads on{" "}
          <a
            href="https://twitter.com/samirm"
            className="text-blue-600 hover:underline transition-colors"
          >
            Twitter
          </a>{" "}
          and fintech posts at{" "}
          <a
            href="https://interspace.samir.xyz"
            className="text-blue-600 hover:underline transition-colors"
          >
            Interspace
          </a>
          .
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Profile;