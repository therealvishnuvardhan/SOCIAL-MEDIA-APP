import { io } from "socket.io-client";

export const makeSocket = (token) =>
  io("http://localhost:3001", {
    autoConnect: false,
    transports: ["websocket"],
    auth: { token }
  });
