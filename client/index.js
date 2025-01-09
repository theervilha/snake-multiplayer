const MAP_WIDTH = 500
const MAP_HEIGHT = 500;
const BLOCK_SIZE = 20;

window.addEventListener("load", () => {
    const socket = new WebSocket('wss://snake-multiplayer-server.onrender.com');

    const canvas = document.getElementById("board");
    canvas.width = MAP_WIDTH;
    canvas.height = MAP_HEIGHT;

    const ctx = canvas.getContext("2d");

    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight": { }
                socket.send(JSON.stringify({
                    event: "move",
                    direction: event.key
                }));
                break;
        }
    });

    socket.onmessage = (event) => {
        console.log('Websocket Message:', event.data)
        const data = JSON.parse(event.data);

        if (data.event === 'connected') {
            return document.querySelector('#playerID').innerText += ` ${data.socketId}`;
        }

        clearBoard(ctx)
        drawGame(ctx, data)

        fillScoreBoard(data)
        if (data.winner)
            fillWinner(data.winner);
    }

    socket.onerror = (event) => console.log('Websocket Error:', event);
    socket.onclose = (event) => console.log('Websocket Closed:', event);
});

const clearBoard = (ctx) => ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);


const drawGame = (ctx, gameState) => {
    placeFood(gameState.foodPosition, ctx);

    gameState.players.forEach(player => {
        drawSnake(ctx, player);
    })
}

const placeFood = ({ x, y }, ctx) => {
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
}

const drawSnake = (ctx, player) => {
    ctx.fillStyle = player.color
    player.positions.forEach(({ x, y }) => {
        ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    })
}

const fillScoreBoard = (gameState) => {
    const table = document.querySelector('#scoreboard')
    const updatedDOM = gameState.players.map(player => `<tr>
        <td>${player.id}</td>
        <td>${player.score}</td>
    </tr>`).join('');
    table.innerHTML = updatedDOM;
}

const fillWinner = (winner) => {
    const winnerElem = document.querySelector('#winner')
    winnerElem.innerText = `Winner: ${winner.id}`
}