import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hey - I'm Samir.</h1>
          <h2 className="text-2xl md:text-3xl text-purple-600 dark:text-purple-400 mb-8">
            I drive business impact at fintechs.
          </h2>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p>
              Today, I am leading Finance & Strategy for the Financial Partnerships team at{" "}
              <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                Cash App
              </Link>{" "}
              where we're expanding financial access to help users do more with their money.
              Previously I built Strategic Finance at{" "}
              <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                HRT
              </Link>{" "}
              which uses algorithms to drive efficiency in markets.
            </p>

            <p>
              Prior to that, I drove financial partnerships at{" "}
              <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                Unit
              </Link>
              , which embeds financial features into products. Before that, I built and led the Strategic Finance function at{" "}
              <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                Chime
              </Link>
              . Earlier, I was the first finance hire at{" "}
              <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                Sift
              </Link>
              . I got my start in investment banking in the Financial Institutions Group at{" "}
              <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                JP Morgan
              </Link>{" "}
              covering market structure and asset management.
            </p>

            <p>
              Outside of work, I write over-engineered fintech threads on{" "}
              <Link href="https://twitter.com" className="text-purple-600 dark:text-purple-400 hover:underline">
                Twitter
              </Link>
              , share perspectives on{" "}
              <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                Substack
              </Link>{" "}
              and write fintech & stratfin posts at{" "}
              <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                Interspace
              </Link>
              . I'm also learning to{" "}
              <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                code at the speed of thought
              </Link>{" "}
              via Replit AI.
            </p>
          </div>
        </div>

        <div className="w-full md:w-48 flex-shrink-0">
          <Image
            src="/Hey I'm Samir 2025.png"
            alt="Samir's avatar"
            width={192}
            height={192}
            className="rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  )
}