const WebSocket = require('ws');

let wss;

const createWebSocketServer = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      console.log('Received:', message);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return wss;
};

const broadcast = (data) => {
  if (wss) {
    const message = JSON.stringify(data); // Convert data to JSON string
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
};

module.exports = { createWebSocketServer, broadcast };
