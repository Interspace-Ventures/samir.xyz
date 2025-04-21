'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Define types for our data
type Tag = {
  id: number;
  name: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  link?: string | null;
  github?: string | null;
  featured: boolean;
  tags: Tag[];
};

// Fallback projects in case database is empty during development
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: 'Project One',
    description: 'A modern web application built with React and Next.js',
    imageUrl: null,
    link: null,
    github: null,
    tags: [{ id: 1, name: 'React' }, { id: 2, name: 'Next.js' }, { id: 3, name: 'Tailwind CSS' }],
    featured: true,
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A responsive e-commerce platform with a clean UI',
    imageUrl: null,
    link: null,
    github: null,
    tags: [{ id: 4, name: 'TypeScript' }, { id: 5, name: 'Redux' }, { id: 6, name: 'Node.js' }],
    featured: true,
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A real-time dashboard for data visualization',
    imageUrl: null,
    link: null,
    github: null,
    tags: [{ id: 7, name: 'D3.js' }, { id: 8, name: 'Firebase' }, { id: 3, name: 'Tailwind CSS' }],
    featured: true,
  },
];

const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PortfolioSection = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    retry: 1,
    // If no data is returned from the API (empty database), use fallback projects
    initialData: [],
  });

  // Show either fetched projects or fallback projects if none are available
  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="portfolio" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 mb-4">Portfolio</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Explore my recent projects and see how I bring ideas to life through
            code and design.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center">
            <div className="text-red-500">Error loading projects. Please try again later.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                      Project Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="heading-3 mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 text-xs rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        Visit Site
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;