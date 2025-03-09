import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto p-8 space-y-12">
        <section className="flex flex-col md:flex-row md:items-start md:gap-8">
          <h1 className="text-4xl font-bold">
            Hey - I&apos;m Samir
          </h1>
        </section>
      </div>
    </main>
  )
}

export default Home