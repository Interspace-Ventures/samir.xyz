import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}

const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.2, duration: 0.6 }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <motion.div
        {...fadeInUp}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg mb-6">
          Showcasing my professional projects and technical expertise
        </p>

        <motion.section
          {...slideIn}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Project cards will go here */}
          <div className="p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
            <h3 className="text-xl font-semibold mb-2">AI-Enhanced Design</h3>
            <p className="text-muted-foreground">
              Interactive portfolio with AI-powered project presentations
            </p>
          </div>
        </motion.section>
      </motion.div>
    </main>
  )
}