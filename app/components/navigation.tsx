import Link from 'next/link';
import { motion } from 'framer-motion';

const Navigation = () => {
  return (
    <motion.header
      className="fixed top-0 w-full bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <span className="text-primary-600">Portfolio</span>
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/#profile" className="hover:text-primary-600 transition-colors">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/#portfolio" className="hover:text-primary-600 transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/#interspace" className="hover:text-primary-600 transition-colors">
                Interspace
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navigation;