'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface StageSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export default function StageSelect({
  value,
  onChange,
  options,
  placeholder = 'stage',
}: StageSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-block align-baseline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-1 bg-transparent border-b-2 leading-tight px-0.5 pb-0.5 font-semibold transition-colors focus:outline-none ${
          open ? 'border-[#c9b6ff]' : 'border-white/30'
        } ${value ? 'text-[#c9b6ff]' : 'text-white/30 font-normal italic'}`}
      >
        {value || placeholder}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full mt-2 z-20 min-w-full w-max bg-[#2a313a] sl-solid border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-1"
        >
          {options.map((option) => (
            <li key={option} role="option" aria-selected={value === option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full text-left whitespace-nowrap px-3 py-2 text-sm font-normal transition-colors ${
                  value === option
                    ? 'bg-[#7f54dc] text-white'
                    : 'text-white hover:bg-[#7f54dc]'
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
}
