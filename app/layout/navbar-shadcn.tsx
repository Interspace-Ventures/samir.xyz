import { Link } from "@remix-run/react";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react"; // Using lucide-react icons

export default function NavbarShadcn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <span className="text-xl font-bold text-primary">samir.xyz</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/">
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/portfolio">
                  Portfolio
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/ventures">
                  Ventures
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/portfolio-shadcn">
                  Shadcn Demo
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Main menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link
              to="/portfolio"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link
              to="/ventures"
              onClick={() => setIsMenuOpen(false)}
            >
              Ventures
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link
              to="/portfolio-shadcn"
              onClick={() => setIsMenuOpen(false)}
            >
              Shadcn Demo
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}