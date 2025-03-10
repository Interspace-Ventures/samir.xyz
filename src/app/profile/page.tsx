import Image from "next/image"
import Link from "next/link"

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-6 mb-4">
            <Image
              src="/Hey I'm Samir 2025.png"
              alt="Samir's animated avatar"
              width={96}
              height={96}
              className="rounded-full"
              priority
            />
            <h1 className="text-4xl md:text-5xl font-bold">Hey - I'm Samir.</h1>
          </div>
          <h2 className="text-2xl md:text-3xl text-purple-600 dark:text-purple-400 mb-8">
            I drive business impact at fintechs.
          </h2>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p>
              Today, I am leading Strategic Finance for the Financial Partnerships team at{" "}
              <Link href="https://cash.app" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                Cash App
              </Link>{" "}
              where we're expanding financial access to help users do more with their money.
              Previously I built Strategic Finance at{" "}
              <Link href="https://hudsonrivertrading.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                HRT
              </Link>{" "}
              which uses algorithms to drive efficiency in markets.
            </p>

            <p>
              Prior to that, I drove financial partnerships at{" "}
              <Link href="https://unit.co" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                Unit
              </Link>
              , which embeds financial features into products. Before that, I built and led the Strategic Finance function at{" "}
              <Link href="https://chime.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                Chime
              </Link>
              . Earlier, I was the first finance hire at{" "}
              <Link href="https://sift.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                Sift
              </Link>
              . I got my start in investment banking in the Financial Institutions Group at{" "}
              <Link href="https://jpmorgan.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                JP Morgan
              </Link>{" "}
              covering market structure and asset management.
            </p>

            <p>
              Outside of work, I write over-engineered fintech threads on{" "}
              <Link href="https://x.com/heyinterspace" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                Twitter
              </Link>
              , share perspectives on{" "}
              <Link href="https://perspectives.samir.xyz" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                Substack
              </Link>{" "}
              and write fintech & stratfin posts at{" "}
              <Link href="https://posts.interspace.ventures" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                Interspace
              </Link>
              . I also create over-engineered apps and ideas at{" "}
              <Link href="/ventures" className="text-purple-600 dark:text-purple-400 hover:underline">
                Interspace Ventures
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}