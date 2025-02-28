import { motion, useInView } from "framer-motion";
import { useRef, type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export const RevealOnScroll: FC<Props> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const getInitialPosition = () => {
    switch(direction) {
      case "up": return { opacity: 0, y: 30 };
      case "down": return { opacity: 0, y: -30 };
      case "left": return { opacity: 0, x: 30 };
      case "right": return { opacity: 0, x: -30 };
      case "none": return { opacity: 0 };
      default: return { opacity: 0, y: 30 };
    }
  };
  
  const getFinalPosition = () => {
    switch(direction) {
      case "up": 
      case "down": 
        return { 
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : getInitialPosition().y
        };
      case "left":
      case "right":
        return { 
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : getInitialPosition().x
        };
      case "none":
        return { 
          opacity: isInView ? 1 : 0
        };
      default:
        return { 
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : getInitialPosition().y
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={getFinalPosition()}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth reveal
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
