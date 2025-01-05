import { Switch, Route } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { AnimatedLink } from "@/components/ui/animated-link";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome to the Portfolio</h1>
      <nav className="flex gap-4">
        <AnimatedLink href="/projects">Projects</AnimatedLink>
        <AnimatedLink href="/about">About</AnimatedLink>
        <AnimatedLink href="/contact">Contact</AnimatedLink>
      </nav>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
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
    </div>
  );
}

export default App;