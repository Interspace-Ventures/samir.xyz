"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Users, Zap } from 'lucide-react';
import Link from 'next/link';

interface VentureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
}

const Venture = ({ icon, title, description, link, index }: VentureProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <Link
        href={link}
        className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
      >
        Learn more <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  );
};

export default function VenturesSection() {
  const ventures = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "StartupLaunch Accelerator",
      description: "An accelerator program I founded to help early-stage tech startups refine their MVPs and secure initial funding.",
      link: "#ventures",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "DevTools Pro",
      description: "A suite of developer productivity tools that streamline workflow and automate repetitive tasks.",
      link: "#ventures",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "TechMentor Network",
      description: "A community platform connecting junior developers with experienced mentors for guidance and career development.",
      link: "#ventures",
    },
  ];

  return (
    <section id="ventures" className="bg-accent/30 py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.div
            className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Ventures
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            My Business Initiatives
          </motion.h2>
          <motion.p
            className="max-w-[700px] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Beyond coding, I'm passionate about building businesses and products that make a meaningful impact.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ventures.map((venture, index) => (
            <Venture
              key={venture.title}
              icon={venture.icon}
              title={venture.title}
              description={venture.description}
              link={venture.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}