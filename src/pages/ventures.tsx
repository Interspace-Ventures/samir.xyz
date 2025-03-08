import { motion } from 'framer-motion'
import { Link } from 'wouter'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}

interface VentureProject {
  name: string
  description: string
  imageUrl: string
  link: string
}

const ventureProjects: VentureProject[] = [
  {
    name: "Interspace",
    description: "Technology and venture capital insights platform",
    imageUrl: "/assets/images/ventures/interspace.jpg",
    link: "https://posts.interspace.ventures"
  },
  // Add other venture projects here
]

export default function Ventures() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <motion.div
        {...fadeInUp}
        className="max-w-5xl mx-auto p-8 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Ventures
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Exploring and investing in innovative technology companies
          </p>
        </section>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ventureProjects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-muted/10">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </a>
          ))}
        </motion.section>

        <div className="text-center">
          <Link href="/" className="text-primary hover:text-primary/80 inline-flex items-center">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  )
}