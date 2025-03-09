import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full py-6 mt-12 border-t border-border"
    >
      <div className="max-w-5xl mx-auto px-8 flex justify-between items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Samir. All rights reserved.</p>
        <p className="text-xs">Version 1.0.0</p>
      </div>
    </motion.footer>
  )
}

export default Footer