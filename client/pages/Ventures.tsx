import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';

interface VentureItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  url?: string;
}

export const Ventures: FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const ventures: VentureItem[] = [
    {
      id: 'hey-im-samir',
      name: 'Hey I\'m Samir',
      description: 'I drive business impact in fintech.',
      logo: '/assets/Hey I\'m Samir 2025.png',
      url: '/about'
    },
    {
      id: 'interspace',
      name: 'Interspace',
      description: 'Over-engineered posts on fintech, stratfin and unit economics nerdery.',
      logo: '/assets/Interspace Square - 2025.png',
      url: 'https://interspace.samir.xyz/'
    },
    {
      id: 'perspectives',
      name: 'Perspectives',
      description: 'Over-engineered perspectives on tech, design, food, art, travel and life as we know it.',
      logo: '/assets/Perspectives.png',
      url: 'https://perspectives.samir.xyz/'
    },
    {
      id: 'predictive',
      name: 'Predictive',
      description: 'Predictive algorithm for academy awards.',
      logo: '/assets/Predictive.film icon 2025.png',
      url: 'https://predictive.film/'
    },
    {
      id: 'solo',
      name: 'Solo',
      description: 'Beautifully simple climbing app.',
      logo: '/assets/Solo Logo 2025 Square.png',
      url: 'https://solo.app/'
    },
    {
      id: '2de',
      name: '2 Days Early',
      description: 'Community of current and former Chime operators that invest in fintech.',
      logo: '/assets/2DE Interspace.png',
      url: 'https://2daysearly.com/'
    }
  ];

  return (
    <div className="w-full">
      <RevealOnScroll direction="up">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4">Interspace Ventures</h1>
      </RevealOnScroll>
      
      <RevealOnScroll direction="up" delay={0.1}>
        <p className="text-lg md:text-xl mb-12 max-w-3xl">
          I write, design, code and build ventures with over-engineered simplicity and artificial intelligence.
        </p>
      </RevealOnScroll>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 overflow-hidden">
        {ventures.map((venture, index) => (
          <RevealOnScroll 
            key={venture.id} 
            direction="up" 
            delay={0.1 + (index * 0.05)}
          >
            <div 
              className="aspect-square relative overflow-hidden bg-white cursor-pointer border-0 outline-none"
              style={{ padding: 0, margin: 0, border: 'none', outline: 'none', boxShadow: 'none' }}
              onMouseEnter={() => setHoveredItem(venture.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => {
                if (venture.url) {
                  if (venture.url.startsWith('/')) {
                    window.location.href = venture.url;
                  } else {
                    window.open(venture.url, '_blank');
                  }
                }
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300" 
                style={{ padding: 0, margin: 0 }}>
                <img 
                  src={venture.logo} 
                  alt={venture.name}
                  className={`max-w-[80%] max-h-[80%] object-contain transition-all duration-300 ${
                    hoveredItem === venture.id ? 'opacity-40 scale-95' : 'opacity-100'
                  }`}
                />
              </div>
              
              <div 
                className={`absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-300 ${
                  hoveredItem === venture.id ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ padding: '2rem' }}
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">{venture.name}</h3>
                <p className="text-sm sm:text-md max-w-[90%]">{venture.description}</p>
                {venture.url && (
                  <div className="mt-4 text-xs opacity-70 flex items-center">
                    <span>{venture.url.startsWith('/') ? 'View' : 'Visit'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default Ventures;