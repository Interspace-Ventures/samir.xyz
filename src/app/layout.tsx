// Absolute minimal layout - no imports or metadata
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Minimal Test</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}