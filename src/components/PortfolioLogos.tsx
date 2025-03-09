import Image from 'next/image'
import { motion } from 'framer-motion'

const companies = [
  { name: 'Afar', logo: '/assets/images/brand/portfolio-logos/Afar.png' },
  { name: 'AON3D', logo: '/assets/images/brand/portfolio-logos/AON3D.png' },
  { name: 'Aura', logo: '/assets/images/brand/portfolio-logos/Aura.png' },
  { name: 'Backpack', logo: '/assets/images/brand/portfolio-logos/Backpack.png' },
  { name: 'CaliberX', logo: '/assets/images/brand/portfolio-logos/CaliberX.png' },
  { name: 'GEM', logo: '/assets/images/brand/portfolio-logos/GEM.png' },
  { name: 'Goodmylk', logo: '/assets/images/brand/portfolio-logos/Goodmylk.png' },
  { name: 'Harper', logo: '/assets/images/brand/portfolio-logos/Harper.png' },
  // Add more companies as needed
]

export default function PortfolioLogos() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
      {companies.map((company) => (
        <motion.div
          key={company.name}
          className="flex items-center justify-center p-4 bg-muted/5 rounded-lg hover:bg-muted/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={120}
            height={60}
            className="object-contain"
          />
        </motion.div>
      ))}
    </section>
  )
}
