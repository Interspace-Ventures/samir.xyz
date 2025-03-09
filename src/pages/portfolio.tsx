import { motion } from 'framer-motion'
import Link from 'next/link'
import { SiGithub, SiLinkedin } from 'react-icons/si'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}

export default function Portfolio() {
  console.log('Portfolio page mounting') // Debug log
  return (
    <main className="min-h-screen bg-background text-foreground">
      <motion.div
        {...fadeInUp}
        className="max-w-5xl mx-auto p-8 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Portfolio
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            A collection of my professional work and projects
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4 items-center">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <SiGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <SiLinkedin className="w-6 h-6" />
            </a>
          </div>
        </section>

        <div className="flex gap-4">
          <Link
            href="/"
            className="text-primary hover:text-primary/80 inline-flex items-center"
          >
            ← Back to Home
          </Link>
          <Link
            href="/ventures"
            className="text-primary hover:text-primary/80 inline-flex items-center"
          >
            View Ventures →
          </Link>
        </div>
      </motion.div>
    </main>
  )
}