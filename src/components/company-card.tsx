import Image from 'next/image'
import type { Company } from './types'

export default function CompanyCard({ company }: { company: Company }) {
  const websiteUrl = `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`

  return (
    <div className="h-[160px] rounded-lg border bg-white dark:bg-gray-800">
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full p-6 relative"
      >
        {/* Badge */}
        {(company.markup || company.acquired) && (
          <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-purple-600 text-white">
            {company.acquired ? 'Acquired' : 'Markup'}
          </div>
        )}

        {/* Logo or Name */}
        <div className="h-full flex items-center justify-center">
          {company.logo ? (
            <div className="relative h-[80px] w-[200px]">
              <Image
                src={company.logo}
                alt={company.name}
                fill
                sizes="200px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          ) : (
            <span className="text-gray-600 dark:text-gray-400">
              {company.name}
            </span>
          )}
        </div>

        {/* Description Hover Overlay */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/75 transition-opacity duration-300 flex items-center justify-center rounded-lg">
          <p className="text-white text-sm text-center px-4">
            {company.description}
          </p>
        </div>
      </a>
    </div>
  )
}