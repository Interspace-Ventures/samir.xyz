"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
  };
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js, featuring a responsive design, cart functionality, and secure payment processing.',
    image: '/placeholder.svg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    links: {
      github: 'https://github.com',
      live: 'https://example.com',
    },
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and user authentication.',
    image: '/placeholder.svg',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    links: {
      github: 'https://github.com',
      live: 'https://example.com',
    },
  },
  {
    id: 'project-3',
    title: 'Finance Dashboard',
    description: 'An analytics dashboard for financial data visualization with interactive charts, filters, and data export capabilities.',
    image: '/placeholder.svg',
    tags: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
    links: {
      github: 'https://github.com',
    },
  },
  {
    id: 'project-4',
    title: 'AI-Powered Chatbot',
    description: 'A conversational AI chatbot built with natural language processing capabilities for customer support automation.',
    image: '/placeholder.svg',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    links: {
      github: 'https://github.com',
      live: 'https://example.com',
    },
  },
];

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <div className="h-full w-full bg-gradient-to-tr from-primary/30 to-primary/10 flex items-center justify-center text-4xl font-bold text-primary/50">
          {project.title.slice(0, 2).toUpperCase()}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-muted-foreground line-clamp-3">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          )}
          {project.links.live && (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="sr-only">Live Demo</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Web', 'Mobile', 'AI'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.some(tag => tag.includes(activeFilter)));

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.div
            className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            My Work
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className="max-w-[700px] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Check out some of my recent work showcasing my skills and expertise in building modern web applications.
          </motion.p>
          
          <motion.div
            className="mt-6 flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                className={cn(
                  "rounded-full px-4 py-1 text-sm transition-colors",
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}