import { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  console.log('Home page mounting') // Debug log
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto p-8 space-y-12">
        <section className="flex flex-col md:flex-row md:items-start md:gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">
              Hey - I&apos;m Samir
            </h1>
            <nav className="flex gap-4">
              <Link 
                href="/portfolio" 
                className="text-primary hover:text-primary/80 inline-flex items-center"
              >
                View Portfolio →
              </Link>
              <Link 
                href="/ventures" 
                className="text-primary hover:text-primary/80 inline-flex items-center"
              >
                View Ventures →
              </Link>
            </nav>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home