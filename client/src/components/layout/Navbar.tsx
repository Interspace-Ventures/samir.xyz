import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [location] = useLocation();

  const links = [
    { href: "/profile", label: "PROFILE" },
    { href: "/portfolio", label: "PORTFOLIO" },
    { href: "/interspace", label: "INTERSPACE" },
    { href: "/perspectives", label: "PERSPECTIVES" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-black text-xl font-medium">Hey Samir</a>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "text-sm tracking-wider hover:text-gray-600 transition-colors",
                    location === link.href ? "text-black" : "text-gray-500"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
          
          <div className="md:hidden">
            {/* Mobile menu button - could be expanded in future */}
            <button className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
