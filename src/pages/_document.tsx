import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Personal portfolio website showcasing professional projects" />
        <meta charSet="utf-8" />
      </Head>
      <body className="min-h-screen bg-background antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}