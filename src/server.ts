import createServer from './app';
import http, { Server } from 'http';
import fs from 'fs';
import https from 'https';

createServer().then((app) => {
  const port: string = process.env.PORT;

  let server: Server;

  if (process.env.NODE_ENV !== 'production') {
    server = http.createServer(app);
  } else {
    const certs = {
      key: fs.readFileSync('./cert.pem'),
      cert: fs.readFileSync('./cert.pem'),
    };
    server = https.createServer(certs, app);
  }

  server = server
    .listen(port, () => console.log(`Server running on port ${port}`))
    .on('error', (err) => {
      console.error('Error creating server:', err.message);
    });
});
