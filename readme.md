# Snake Multiplayer Game

Project developed in one day to practice creating a WebSocketServer and WebSocket connections.

[Click here](https://snake-multiplayer-pearl.vercel.app) to play the game :)

<video controls width="600">
  <source src="docs/playing_snake_multiplayer.mp4" type="video/mp4">
  Two users playing snake game
</video>

## Project Development Details

```
.
├── client  # Front-end interface for players
├── server  # WebSocket server
```

### Server

- Handle players connections
- Manages game logic
- Sends game state to the client

The server is hosted on [Render](https://render.com) using the free plan. If you notice any latency, this could be the reason.

### Client

- Built with pure HTML, JS and CSS
- Connect to the server
- Listen to keyboard events to move the snake
- Draw elements in the canva

The client is hosted on [Vercel](https://vercel.com)