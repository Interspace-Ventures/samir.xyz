import { version } from "../../package.json"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white/50 backdrop-blur dark:border-gray-800 dark:bg-gray-950/50">
      <div className="container mx-auto px-4 py-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          © Interspace Labs {new Date().getFullYear()}. Built with Replit AI at the speed of thought • v1.1.1
        </div>
      </div>
    </footer>
  )
}