const fs = require('fs');
const WebSocket = require('ws');
const path = require('path');

const AUDIO_FILE_PATH = path.join(__dirname, 'piano.wav'); // Replace with your audio file path
const SERVER_URL = 'ws://localhost:8765'; // Replace with your server address

const ws = new WebSocket(SERVER_URL);

ws.on('open', () => {
    console.log('Connected to server');

    const readStream = fs.createReadStream(AUDIO_FILE_PATH, {
        highWaterMark: 64000*15, // Send in 1KB chunks
    });

    readStream.on('data', (chunk) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(chunk);
            console.log(`Sent ${chunk.length} bytes`);
        }
    });

    readStream.on('end', () => {
        console.log('Audio stream ended');
        ws.send(JSON.stringify({ event: 'end' }));
    });

    readStream.on('error', (err) => {
        console.error('Error reading audio file:', err);
    });
});

ws.on('message', (message) => {
    console.log('Received from server:', message.toString());
});

ws.on('close', () => {
    console.log('Disconnected from server');
});

ws.on('error', (err) => {
    console.error('WebSocket error:', err);
});
