import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const Profile = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollReveal>
        <motion.h1 
          className="text-5xl font-bold tracking-tight mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hey - I'm Samir.
        </motion.h1>
      </ScrollReveal>

      <ScrollReveal>
        <motion.h2 
          className="text-2xl font-bold tracking-tight mb-6 text-[#7343d0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I drive business impact at fintechs.
        </motion.h2>
      </ScrollReveal>

      <div className="space-y-4 text-lg tracking-normal">
        <ScrollReveal>
          <p>
            Today, I am leading Finance & Strategy for the Financial Partnerships team at{" "}
            <a href="https://cash.app/" className="text-[#7343d0] underline hover:opacity-80 transition-opacity">
              Cash App
            </a>{" "}
            where we're expanding financial access to help users do more with their money. Previously I built Strategic Finance at{" "}
            <a href="https://www.hudsonrivertrading.com/" className="text-[#7343d0] underline hover:opacity-80 transition-opacity">
              HRT
            </a>{" "}
            which uses algorithms to drive efficiency in markets. Prior to that, I drove financial partnerships at{" "}
            <a href="https://www.unit.co/" className="text-[#7343d0] underline hover:opacity-80 transition-opacity">
              Unit
            </a>
            , which embeds financial features into products. Before that, I built and led the Strategic Finance function at{" "}
            <a href="https://www.chime.com/" className="text-[#7343d0] underline hover:opacity-80 transition-opacity">
              Chime
            </a>
            . Earlier, I was the first finance hire at{" "}
            <a href="https://sift.com/" className="text-[#7343d0] underline hover:opacity-80 transition-opacity">
              Sift
            </a>
            . I got my start in investment banking in the Financial Institutions Group at{" "}
            <a href="https://www.jpmorgan.com/investment-banking" className="text-[#7343d0] underline hover:opacity-80 transition-opacity">
              JP Morgan
            </a>{" "}
            covering market structure and asset management.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p>
            In my free time, I write over-engineered threads on{" "}
            <a
              href="https://x.com/heysamir_"
              className="text-[#7343d0] underline hover:opacity-80 transition-opacity"
            >
              Twitter
            </a>
            , share perspectives on{" "}
            <a
              href="https://perspectives.samir.xyz/"
              className="text-[#7343d0] underline hover:opacity-80 transition-opacity"
            >
              Substack
            </a>
            {" "}and write over-engineered fintech posts at{" "}
            <a
              href="https://interspace.samir.xyz/"
              className="text-[#7343d0] underline hover:opacity-80 transition-opacity"
            >
              Interspace
            </a>
            . I'm also learning to{" "}
            <a
              href="https://github.com/hey-samir"
              className="text-[#7343d0] underline hover:opacity-80 transition-opacity"
            >
              code at the speed of thought
            </a>
            {" "}via Replit AI.
          </p>
        </ScrollReveal>
      </div>
    </motion.div>
  );
};

export default Profile;