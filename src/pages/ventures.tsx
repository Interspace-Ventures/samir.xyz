import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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
    imageUrl: "/assets/images/ventures/interspace.svg",
    link: "https://posts.interspace.ventures"
  },
  {
    name: "AI Research Lab",
    description: "Advanced artificial intelligence research and development",
    imageUrl: "/assets/images/ventures/ai-research.svg",
    link: "https://ai-research.lab"
  },
  {
    name: "Green Tech Fund",
    description: "Sustainable technology investment initiative",
    imageUrl: "/assets/images/ventures/green-tech.svg",
    link: "https://green.tech.fund"
  }
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
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-muted/10">
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  width={400}
                  height={225}
                  className="object-cover transition-transform group-hover:scale-105"
                  priority={index < 3}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </motion.a>
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