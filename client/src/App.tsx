import React from 'react';
import { Switch, Route } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Portfolio from "@/pages/Portfolio";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/portfolio" component={Portfolio}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold text-foreground">Samir's Portfolio</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Welcome to my personal portfolio website.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;