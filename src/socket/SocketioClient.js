import { io } from "socket.io-client";

const socket = io("https://api.brain-booster.site")
socket.on("connect", () => {
    console.log("Connected to backend socket server:", socket.id);
  });

export default socket  