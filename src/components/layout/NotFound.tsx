import { FC } from 'react';
import { useLocation } from 'wouter';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFound: FC = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-lg mx-4 p-8 shadow-lg bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
          <motion.div 
            className="space-y-6"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex items-start space-x-4">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 20 
                }}
              >
                <AlertCircle className="h-12 w-12 text-[#7343d0] flex-shrink-0" />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7343d0] to-[#9f7aea]"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  404
                </motion.h1>
                <motion.p 
                  className="text-xl font-semibold mt-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  Oops! Page Took a Coffee Break ☕️
                </motion.p>
                <motion.p 
                  className="mt-2 text-muted-foreground"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  Looks like this page is enjoying a well-deserved break! 🌴 <br />
                  While it recharges, how about we get you back on track? 🚀
                </motion.p>
              </div>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Button 
                variant="outline"
                className="flex items-center gap-2 hover:bg-[#7343d0]/10 hover:text-[#7343d0] transition-all duration-300"
                onClick={() => window.history.back()}
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="h-4 w-4" />
                Journey Back
              </Button>
              <Button 
                className="flex items-center gap-2 bg-[#7343d0] hover:bg-[#5f35b5] hover:scale-105 transition-all duration-300"
                onClick={() => setLocation('/')}
                aria-label="Go to home page"
              >
                <Home className="h-4 w-4" />
                Head Home
              </Button>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;