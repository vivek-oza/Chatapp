const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (data) => {
    const parsedData = JSON.parse(data); // Parse incoming message
    const { username, message } = parsedData;

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ username, message })); // Broadcast message
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});