import { Link } from "wouter";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">Samir Desai</span>
          </Link>
          
          <div className="flex space-x-8">
            <Link href="/profile">
              <span className="text-gray-600 hover:text-[#482a83] transition-colors">Profile</span>
            </Link>
            <Link href="/portfolio">
              <span className="text-gray-600 hover:text-[#482a83] transition-colors">Portfolio</span>
            </Link>
            <a 
              href="https://interspace.samir.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#482a83] transition-colors"
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
