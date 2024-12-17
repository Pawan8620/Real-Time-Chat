import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");

  // Handle message input submission
  const handleSendToAll = (e) => {
    e.preventDefault();
    socket.emit("send-to-all", { message, sender: socket.id });
    setMessage("");
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    socket.emit("broadcast-message", { message, sender: socket.id });
    setMessage("");
  };

  const handleSendToRoom = (e) => {
    e.preventDefault();
    socket.emit("room-message", { room, message });
    setMessage("");
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", room);
    console.log(`Joining room: ${room}`);
    setRoom("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data);
    });

    socket.on("room-joined", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 50 }} />
      <Typography variant="h6" component="div" gutterBottom>
        Socket ID: {socketID}
      </Typography>

      {/* Send to All */}
      <form onSubmit={handleSendToAll}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="send-to-all"
          label="Message to All"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send to All
        </Button>
      </form>

      {/* Broadcast Message */}
      <form onSubmit={handleBroadcast}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="broadcast"
          label="Broadcast Message"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Broadcast
        </Button>
      </form>

      {/* Join Room */}
      <form onSubmit={handleJoinRoom}>
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="join-room"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join Room
        </Button>
      </form>

      {/* Send to Room */}
      <form onSubmit={handleSendToRoom}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="room-message"
          label="Message to Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send to Room
        </Button>
      </form>

      {/* Display Messages */}
      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m.message || m} {m.room ? `(Room: ${m.room})` : ""}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;


// import React, { useEffect, useMemo, useState } from "react"
// import {io} from "socket.io-client";
// import {
//   Box,
//   Button,
//   Container,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";

// const App = () => {
//   const socket = useMemo(
//     () =>
//       io("http://localhost:3000", {
//         // withCredentials: true,
//       }),
//     []
//   );

//   const [messages, setMessages] = useState([]);
//   const [onem,setOnem] = useState([])
//   const [message, setMessage] = useState("");
//   const [room, setRoom] = useState("");
//   const [socketID, setSocketId] = useState("");
//   // const [roomName, setRoomName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit("message", { message, room });
//     // socket.emit("receive-message",message);
//     setMessage("");
//   };

//   // const joinRoomHandler = (e) => {
//   //   e.preventDefault();
//   //   socket.emit("join-room", roomName);
//   //   setRoomName("");
//   // };


//   useEffect(() => {
//     socket.on("connect", () => {
//       setSocketId(socket.id);
//       console.log("connected", socket.id);
//     });

//     socket.on("receive-message", (data) => {
//       setOnem((onem) => [...onem, data]);
//       console.log(data);
//     });
    

//     // socket.on("one-message",(s)=>{
//     //   setOnem((onem)=>[...onem,s]);
//     // })

//     // socket.on("receive-message", (data) => {
//     //   console.log(data);
//     //   setMessages((messages) => [...messages, data]);
//     //   // setMessages("")
//     // });

//     socket.on("welcome", (s) => {
//       console.log(s);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   },[]);

//   const sendMessage = (message) => {
//     socket.emit("one-message", { id: socket.id, text: message });
//   };
  

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ height: 500 }} />
//       <Typography variant="h6" component="div" gutterBottom>
//         {socketID}
//       </Typography>

//       {/* <form onSubmit={joinRoomHandler}>
//         <h5>Join Room</h5>
//         <TextField
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           id="outlined-basic"
//           label="Room Name"
//           variant="outlined"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Join
//         </Button>
//       </form> */}

//       <form onSubmit={handleSubmit}>
//         <TextField
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           id="outlined-basic"
//           label="Message"
//           variant="outlined"
//         />
//         <TextField
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           id="outlined-basic"
//           label="Room"
//           variant="outlined"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Send
//         </Button>
//       </form>

//       <Stack>
//         {messages.map((m, i) => (
//           <Typography key={i} variant="h6" component="div" gutterBottom>
//             {m}
//           </Typography>
//         ))}
//       </Stack>
//     </Container>
//   );
// };

// export default App