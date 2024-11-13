import { io } from "socket.io-client";

const socket = io("http://localhost:3000")

socket.on("connect", () => {
    console.log("Connected to backend socket server:", socket.id);
});

socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
});

export default socket  