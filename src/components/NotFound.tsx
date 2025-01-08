import { FC } from 'react';
import { useLocation } from 'wouter';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

export const NotFound: FC = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mx-4 p-6">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-8 w-8 text-[#7343d0] flex-shrink-0" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>
              <p className="mt-2 text-muted-foreground">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button 
              className="flex items-center gap-2 bg-[#7343d0] hover:bg-[#5f35b5]"
              onClick={() => setLocation('/')}
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;