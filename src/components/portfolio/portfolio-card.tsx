"use client"

import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Company } from '../types'

interface PortfolioCardProps {
  company: Company
}

export default function PortfolioCard({ company }: PortfolioCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <div className="p-4 aspect-[3/2] flex items-center justify-center bg-gray-50">
        <img 
          src={company.logo || '/placeholder-logo.png'} 
          alt={`${company.name} logo`}
          className="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-base">{company.name}</h3>
          <div className="flex gap-1">
            {company.markup && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Markup
              </span>
            )}
            {company.acquired && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                Acquired
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
      </CardContent>
    </Card>
  )
}