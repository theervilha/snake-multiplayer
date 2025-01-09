# Snake Multiplayer Game

Project developed in one day to practice creating a WebSocketServer and WebSocket connections.

[Click here](https://snake-multiplayer-pearl.vercel.app) to play the game :)

<video controls width="600">
  <source src="https://d3v55qvjb2v012.cloudfront.net/gaRo/2025/01/09/03/05/cTVQehnegFX/sc.mp4?srcid=cTVQehnegFX&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kM3Y1NXF2amIydjAxMi5jbG91ZGZyb250Lm5ldC9nYVJvLzIwMjUvMDEvMDkvMDMvMDUvY1RWUWVobmVnRlgvc2MubXA0P3NyY2lkPWNUVlFlaG5lZ0ZYIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzM2NDc4MzMxfX19XX0_&Signature=Fxt~GdQdj6ZmapmpNqiRC-sYRI9vhOO-Q5yLPDKnFtBdTZpe~GD4a~tY3cAnMmbmFd~jPQ1kjN9wDlnU4LY3DIC5pRMRsz-fdUkaGrz6X1bnGrWUYk8f16D27DnpxDxhuWhnazHOfazcDJDcYOy2uwIb6cSkoJDq7JC6F4xedk4_&Key-Pair-Id=APKAI4E2RN57D46ONMEQ" type="video/mp4">
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