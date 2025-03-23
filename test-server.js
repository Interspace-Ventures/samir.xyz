// Enhanced server status test with network diagnosis
import http from 'node:http';
import net from 'node:net';

// First check if port 5000 is actually accepting connections
console.log('Checking if port 5000 is open using TCP socket...');
const socket = new net.Socket();
socket.setTimeout(3000);

socket.on('connect', () => {
  console.log('✓ TCP Connection to port 5000 successful!');
  socket.end();
  
  // Now try HTTP request
  testHttpRequest();
});

socket.on('timeout', () => {
  console.error('× TCP Connection attempt timed out');
  socket.destroy();
  console.log('\nPossible issues:');
  console.log('1. The Next.js server may not actually be listening on port 5000');
  console.log('2. There may be a firewall or network configuration issue');
  console.log('3. The server might be binding to a specific interface instead of 0.0.0.0');
});

socket.on('error', (error) => {
  console.error(`× TCP Connection error: ${error.message}`);
});

socket.connect(5000, 'localhost');

// HTTP request test function
function testHttpRequest() {
  console.log('\nAttempting HTTP request to Next.js server on port 5000...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log(`✓ Server responded with status code: ${res.statusCode}`);
    console.log('Headers:', JSON.stringify(res.headers, null, 2));
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`Response length: ${data.length} bytes`);
      if (data.length > 0) {
        console.log('First 200 characters of response:', data.substring(0, 200));
      }
      console.log('✓ Server is running and responding properly!');
    });
  });

  req.on('error', (error) => {
    console.error(`× HTTP request error: ${error.message}`);
  });

  req.on('timeout', () => {
    console.error('× HTTP request timed out after 5 seconds');
    req.destroy();
  });

  req.end();
}