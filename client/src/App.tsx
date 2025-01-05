import { Switch, Route } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { AnimatedLink } from "@/components/ui/animated-link";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/interspace">
            {() => {
              window.location.href = "https://interspace.samir.xyz/";
              return null;
            }}
          </Route>
          <Route path="/perspectives">
            {() => {
              window.location.href = "https://perspectives.samir.xyz/";
              return null;
            }}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex flex-col items-center justify-center gap-8"
    >
      <h1 className="text-4xl font-bold">Welcome to the Portfolio</h1>
      <div className="flex gap-6">
        <AnimatedLink href="/interspace">Interspace</AnimatedLink>
        <AnimatedLink href="/perspectives">Perspectives</AnimatedLink>
      </div>
    </motion.div>
  );
}

function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full flex items-center justify-center bg-gray-50"
    >
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            The page you're looking for doesn't exist.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default App;