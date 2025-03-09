import Image from 'next/image'
import { motion } from 'framer-motion'

const companies = [
  { name: 'Afar', logo: '/assets/images/brand/portfolio-logos/Afar.svg' },
  { name: 'AON3D', logo: '/assets/images/brand/portfolio-logos/AON3D.svg' },
  { name: 'Aura', logo: '/assets/images/brand/portfolio-logos/Aura.svg' },
  { name: 'Backpack', logo: '/assets/images/brand/portfolio-logos/Backpack.svg' },
  { name: 'CaliberX', logo: '/assets/images/brand/portfolio-logos/CaliberX.svg' },
  { name: 'GEM', logo: '/assets/images/brand/portfolio-logos/GEM.svg' },
  { name: 'Goodmylk', logo: '/assets/images/brand/portfolio-logos/Goodmylk.svg' },
  { name: 'Harper', logo: '/assets/images/brand/portfolio-logos/Harper.svg' }
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