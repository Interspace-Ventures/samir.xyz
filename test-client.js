// Simple TCP connection test for Next.js server
import net from 'node:net';

const HOST = '0.0.0.0';
const PORT = 5000;

// Create a very basic TCP client
const client = new net.Socket();
client.setTimeout(5000);

console.log(`Attempting to connect to ${HOST}:${PORT}...`);

client.connect(PORT, HOST, () => {
  console.log('Connected to server!');
  
  // Send an HTTP GET request
  client.write(
    'GET / HTTP/1.1\r\n' + 
    'Host: localhost:5000\r\n' +
    'Connection: close\r\n' +
    '\r\n'
  );
  
  console.log('Sent HTTP request...');
});

// Handle data received from server
client.on('data', (data) => {
  console.log('Received response:');
  console.log(data.toString().substring(0, 500) + '...');
  client.end();
});

// Handle connection errors
client.on('error', (err) => {
  console.error(`Connection error: ${err.message}`);
});

// Handle connection timeout
client.on('timeout', () => {
  console.error('Connection timed out');
  client.destroy();
});

// Handle connection close
client.on('close', () => {
  console.log('Connection closed');
});