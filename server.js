const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

let currentUsers = Math.floor(Math.random() * 1000) + 500; // Случайное значение пользователей выбираем для старта при первом запуске

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Сразу отправим это значение на фронт, чтобы отобразилось
    ws.send(JSON.stringify({ users: currentUsers }));

    // Раз в некоторое время обновляем значение на 5%
    const interval = setInterval(() => {
        const changePercent = (Math.random() * 2 - 1) * 0.05;
        currentUsers = Math.max(0, Math.floor(currentUsers * (1 + changePercent))); // Число не может быть отрицательным

        ws.send(JSON.stringify({ users: currentUsers }));
    }, 3000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);