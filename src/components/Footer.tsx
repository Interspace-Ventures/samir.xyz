import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 navbar-bg dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-sm text-gray-700 dark:text-gray-200 text-center">
          © <Link href="/ventures" className="text-purple-600 dark:text-purple-400">Interspace Ventures</Link> {new Date().getFullYear()}. Built with Replit AI at the speed of thought • v2.3.0
        </div>
      </div>
    </footer>
  )
}