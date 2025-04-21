"use client";

import { motion } from 'framer-motion';
import { Code, Database, Globe, Lightbulb } from 'lucide-react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const SkillCard = ({ icon, title, description, delay = 0 }: SkillCardProps) => {
  return (
    <motion.div
      className="flex flex-col gap-2 rounded-lg border bg-card p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default function AboutSection() {
  return (
    <section id="about" className="bg-accent/30 py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.div
            className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Passionate About Creating Solutions
          </motion.h2>
          <motion.p
            className="max-w-[700px] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            With over 5 years of experience in web development, I specialize in building
            performant, accessible, and user-friendly applications that solve real-world problems.
          </motion.p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <SkillCard
            icon={<Code className="h-6 w-6" />}
            title="Frontend"
            description="Expert in React, Next.js, TypeScript and modern CSS frameworks for responsive and dynamic interfaces."
            delay={0.1}
          />
          <SkillCard
            icon={<Database className="h-6 w-6" />}
            title="Backend"
            description="Proficient with Node.js, Express, and database technologies like PostgreSQL and MongoDB."
            delay={0.2}
          />
          <SkillCard
            icon={<Globe className="h-6 w-6" />}
            title="Full Stack"
            description="End-to-end application development with modern frameworks and cloud deployment strategies."
            delay={0.3}
          />
          <SkillCard
            icon={<Lightbulb className="h-6 w-6" />}
            title="Problem Solving"
            description="Strong analytical skills to design efficient solutions for complex technical challenges."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}