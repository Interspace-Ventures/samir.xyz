import React from "react";
import { Switch, Route } from "wouter";
import { Card, CardContent } from "./components/ui/card";
import { AlertCircle } from "lucide-react";
import { AnimatedLink } from "./components/ui/animated-link";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-primary">Portfolio</h1>
            <nav className="flex gap-6">
              <AnimatedLink href="/">Home</AnimatedLink>
              <AnimatedLink href="/projects">Projects</AnimatedLink>
              <AnimatedLink href="/about">About</AnimatedLink>
              <AnimatedLink href="/contact">Contact</AnimatedLink>
            </nav>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
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
      className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center gap-8 py-20"
    >
      <h1 className="text-5xl font-bold text-center">
        Full Stack Web Developer
      </h1>
      <p className="text-xl text-center text-muted-foreground max-w-2xl">
        Building modern, responsive web applications with React, TypeScript, and Node.js.
        Focused on creating elegant solutions to complex problems.
      </p>
      <div className="flex gap-4">
        <AnimatedLink href="/projects" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg">
          View Projects
        </AnimatedLink>
        <AnimatedLink href="/contact" className="px-6 py-3 border rounded-lg">
          Get in Touch
        </AnimatedLink>
      </div>
    </motion.div>
  );
}

function Projects() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      tech: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    },
    {
      title: "Task Management App",
      description: "Real-time task management application with collaborative features",
      tech: ["Next.js", "Prisma", "tRPC", "TailwindCSS"],
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio website showcasing development projects",
      tech: ["React", "Framer Motion", "TailwindCSS", "TypeScript"],
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12"
    >
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-accent text-accent-foreground rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <div className="prose prose-lg">
        <p>
          I'm a passionate full-stack developer with expertise in modern web technologies.
          My focus is on creating efficient, scalable, and user-friendly applications
          that solve real-world problems.
        </p>
        <h3>Skills</h3>
        <ul>
          <li>Frontend: React, TypeScript, TailwindCSS, Framer Motion</li>
          <li>Backend: Node.js, Express, PostgreSQL, Redis</li>
          <li>Tools: Git, Docker, AWS, CI/CD</li>
        </ul>
      </div>
    </motion.div>
  );
}

function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
      <Card>
        <CardContent className="p-6">
          <p className="text-lg mb-6">
            Interested in working together? Feel free to reach out through any of
            these channels:
          </p>
          <div className="space-y-4">
            <a href="mailto:contact@example.com" className="flex items-center gap-2 text-primary hover:underline">
              contact@example.com
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              GitHub Profile
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              LinkedIn Profile
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
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