import { motion } from "framer-motion";

const Portfolio = () => {
  const companies = [
    { name: "AFAR", logo: "AFAR" },
    { name: "AON3D", logo: "AON3D" }, 
    { name: "AURA", logo: "AURA" },
    { name: "Backpack", logo: "Backpack" },
    { name: "CALIBER", logo: "CALIBER" },
    { name: "GEM", logo: "GEM" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Portfolio
      </motion.h1>

      <motion.p 
        className="text-lg mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        I advise and invest in ambitious teams building innovative products who focus on
        unit economics optimized business models.
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {companies.map((company) => (
          <motion.div
            key={company.name}
            className="flex items-center justify-center p-8 bg-white border border-gray-200 rounded-lg transition-all duration-300 ease-out"
            variants={item}
            whileHover={{ 
              scale: 1.05, 
              rotate: 1,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
              borderColor: "rgba(0,0,0,0.2)",
              y: -5
            }}
            whileTap={{ 
              scale: 0.95,
              rotate: -1,
              boxShadow: "0 5px 15px -5px rgba(0,0,0,0.1)",
              y: 0
            }}
            initial={{
              boxShadow: "0 0 0 0 rgba(0,0,0,0)",
              y: 0
            }}
          >
            <span className="text-xl font-medium">{company.logo}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;