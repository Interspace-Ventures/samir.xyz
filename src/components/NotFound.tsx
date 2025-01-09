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
        <Card className="w-full max-w-lg mx-4 p-8 shadow-lg">
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
                transition={{ duration: 0.5 }}
              >
                <AlertCircle className="h-12 w-12 text-[#7343d0] flex-shrink-0" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">404</h1>
                <p className="text-xl font-semibold mt-2">Oops! Page Not Found</p>
                <p className="mt-2 text-muted-foreground">
                  Looks like this page took a coffee break! ☕️ <br />
                  Want to head back to somewhere that exists?
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="outline"
                className="flex items-center gap-2 hover:bg-[#7343d0]/10 transition-colors"
                onClick={() => window.history.back()}
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button 
                className="flex items-center gap-2 bg-[#7343d0] hover:bg-[#5f35b5] transition-colors"
                onClick={() => setLocation('/')}
                aria-label="Go to home page"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;