const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const base64Data = payload.image.replace(/^data:image\/png;base64,/, "");
        const destPath = path.join(__dirname, 'public', 'assets', 'hero-new.png');
        
        fs.writeFileSync(destPath, base64Data, 'base64');
        console.log('Successfully saved transparent cutout image to:', destPath);
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Saved successfully!');
        
        // Gracefully shutdown the server after a short delay to allow response to send
        setTimeout(() => {
          console.log('Shutting down temporary saver server.');
          process.exit(0);
        }, 1000);
      } catch (err) {
        console.error('Error saving image:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error saving: ' + err.message);
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8080, () => {
  console.log('Temporary saver server listening on port 8080...');
});
