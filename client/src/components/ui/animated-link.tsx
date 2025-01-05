import { motion } from "framer-motion";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function AnimatedLink({ href, children, className, external = false }: AnimatedLinkProps) {
  const linkStyles = cn(
    "relative inline-block text-[#482a83] transition-colors hover:text-opacity-80",
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current",
    "after:transition-all after:duration-300 hover:after:w-full",
    className
  );

  const content = (
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={linkStyles}
    >
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkStyles}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href}>
      {content}
    </Link>
  );
}
