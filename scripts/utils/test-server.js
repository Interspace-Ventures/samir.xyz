const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server is running successfully. Next.js app should be accessible at port 8080.');
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});