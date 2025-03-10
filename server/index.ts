import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '5000', 10);

// Create the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const startServer = async () => {
  try {
    // Wait for Next.js to prepare the server
    await app.prepare();

    // Create HTTP server
    const server = createServer(async (req, res) => {
      try {
        // Parse the URL
        const parsedUrl = parse(req.url || '/', true);

        // Let Next.js handle the request
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling request:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    // Start listening
    server.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });

  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();