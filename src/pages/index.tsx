import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { SiGithub, SiLinkedin } from 'react-icons/si'

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
    <main className="min-h-screen bg-background text-foreground">
      <motion.div
        {...fadeInUp}
        className="max-w-5xl mx-auto p-8 space-y-12"
      >
        {/* Hero Section */}
        <section className="flex items-center gap-8">
          <div className="w-48 h-48 overflow-hidden">
            <img 
              src="/assets/images/profile.jpg" 
              alt="Samir" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Hey - I'm Samir
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              I drive business impact at fintechs through innovative solutions and technical expertise.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <motion.section
          {...slideIn}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Project Card 1 */}
          <div className="group p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg bg-card">
            <h3 className="text-xl font-semibold mb-2">AI-Enhanced Design</h3>
            <p className="text-muted-foreground">
              Interactive portfolio with AI-powered project presentations
            </p>
          </div>

          {/* Project Card 2 */}
          <div className="group p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg bg-card">
            <h3 className="text-xl font-semibold mb-2">Responsive Web Apps</h3>
            <p className="text-muted-foreground">
              Mobile-first design with modern UI/UX principles
            </p>
          </div>

          {/* Project Card 3 */}
          <div className="group p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg bg-card">
            <h3 className="text-xl font-semibold mb-2">Technical Writing</h3>
            <p className="text-muted-foreground">
              Documentation and technical blog posts
            </p>
          </div>
        </motion.section>

        {/* Social Links */}
        <section className="flex justify-center space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors">
            <SiGithub className="w-8 h-8" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors">
            <SiLinkedin className="w-8 h-8" />
          </a>
        </section>
      </motion.div>
    </main>
  )
}