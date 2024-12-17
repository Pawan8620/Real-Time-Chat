# Real-time Chat Application with Socket.IO

This is a real-time chat application built with **React.js** and **Socket.IO** for real-time messaging. Users can join rooms, send messages, and see real-time updates.

## Features
- **Join Rooms**: Users can join specific rooms by name.
- **Send Messages**: Users can send messages to the room.
- **Broadcast**: Messages are broadcast to all users in the room.
- **Join Notifications**: Users are notified when someone joins a room.

## Tech Stack
- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Socket.IO

## Installation

1. Clone the repo:
   ```bash
   git clone <https://github.com/Pawan8620/Real-Time-Chat.git>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server and client:
   - Server: `node server.js`
   - Client: `npm start` (in the `client` directory)

## Usage
1. **Join a Room**: Enter a room name and click **Join Room**.
2. **Send a Message**: Enter a message, select a room, and click **Send**.
3. **Receive Messages**: Messages from other users will appear in the chat window in real-time.

## Code Explanation
- **Join Room**: `socket.emit("join-room", roomName);`
- **Send Message**: `socket.emit("message", { message, room });`
- **Receive Message**: `socket.on("receive-message", (data) => { ... });`

## License
This project is licensed under the MIT License.
