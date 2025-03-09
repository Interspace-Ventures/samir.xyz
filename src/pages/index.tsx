import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from 'react-icons/si'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <motion.div
        {...fadeInUp}
        className="max-w-5xl mx-auto p-8 space-y-12"
      >
        {/* Profile Section */}
        <section className="flex flex-col md:flex-row md:items-start md:gap-12">
          <div className="w-full md:w-2/3 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Hey - I&apos;m Samir
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Tech entrepreneur and investor focused on AI, sustainability, and innovative technologies. 
              I build and invest in companies that shape the future of technology.
            </p>
            <div className="flex gap-6">
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

            <nav className="flex gap-4 pt-4">
              <Link 
                href="/portfolio" 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Portfolio
              </Link>
              <Link 
                href="/ventures" 
                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                View Ventures
              </Link>
            </nav>
          </div>

          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted/10">
              <Image
                src="/assets/images/profile/avatar.jpg"
                alt="Samir's profile"
                width={400}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Quick Overview Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Tech Innovator</h3>
            <p className="text-muted-foreground">Building next-generation solutions in AI and sustainable technology</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Investor</h3>
            <p className="text-muted-foreground">Supporting ambitious founders through strategic investments and mentorship</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Thought Leader</h3>
            <p className="text-muted-foreground">Sharing insights on technology trends and venture capital</p>
          </motion.div>
        </section>
      </motion.div>
    </main>
  )
}

export default Home