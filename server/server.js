const { WebSocketServer } = require('ws');
const EventEmitter = require('node:events');
const utils = require('./utils');

const wss = new WebSocketServer({ port: 8080 });
const gameStateEmitter = new EventEmitter();

let gameState = {
    players: [],
    foodPosition: {
        x: utils.generateRandomX(),
        y: utils.generateRandomY()
    }
}

// Whenever game state is updated, send it to all clients
gameStateEmitter.on('stateUpdated', () => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(gameState));
    })
})

wss.on('connection', (ws) => {
    const socketId = utils.generateId();
    ws.send(JSON.stringify({
        'event': 'connected',
        'socketId': socketId
    }));
    console.log(`New connection: ${socketId}`);

    gameState.players.push({
        id: socketId,
        color: utils.getRandomColor(),
        positions: [
            {
                x: utils.generateRandomX(),
                y: utils.generateRandomY()
            }
        ],
        score: 0
    })
    gameStateEmitter.emit('stateUpdated');

    ws.on('message', (message) => {
        console.log(`Received message from ${socketId}: ${message}`);
        const data = JSON.parse(message);

        switch (data.event) {
            case 'move': {
                const player = gameState.players.find(player => player.id === socketId)
                const firstPositionCopy = { ...player.positions[0] };
                const lastPositionCopy = { ...player.positions[player.positions.length - 1] };
                for (let i = player.positions.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        player.positions[i] = {
                            x: player.positions[0].x + (data.direction === 'ArrowRight' ? utils.BLOCK_SIZE : data.direction === 'ArrowLeft' ? -utils.BLOCK_SIZE : 0),
                            y: player.positions[0].y + (data.direction === 'ArrowDown' ? utils.BLOCK_SIZE : data.direction === 'ArrowUp' ? -utils.BLOCK_SIZE : 0)
                        }

                        // Verify if new position matches food position
                        if (JSON.stringify(player.positions[0]) === JSON.stringify(gameState.foodPosition)) {
                            player.score += 1;

                            player.positions.length > 1
                                ? player.positions.push(lastPositionCopy)
                                : player.positions.push(firstPositionCopy)

                            try {
                                const allPlayerPositions = gameState.players.map(player => player.positions).flat();
                                gameState.foodPosition = utils.generateFoodPosition(allPlayerPositions);
                            } catch (error) {
                                console.log('error:', error)
                                gameState.winner = player
                            }
                        }

                        gameStateEmitter.emit('stateUpdated')
                    } else {
                        player.positions[i] = player.positions[i - 1];
                    }

                    if (i === gameState.players.length - 1)
                        gameStateEmitter.emit('stateUpdated')
                }
            }
        }
    });

    ws.on('close', () => {
        console.log(`Connection closed: ${socketId}`);
    });

    ws.on('error', (error) => {
        console.log(`Error on connection ${socketId}: ${error}`);
    });
})