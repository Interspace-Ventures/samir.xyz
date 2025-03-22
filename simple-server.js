// Simple HTTP server for testing
import { createServer } from 'http';

const server = createServer((req, res) => {
  console.log(`Request received: ${req.url}`);
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Simple Test Server</title>
      </head>
      <body>
        <h1>Simple Test Server</h1>
        <p>This is a test page from the simple server.</p>
        <p>Current time: ${new Date().toISOString()}</p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple server running at http://0.0.0.0:${PORT}/`);
});