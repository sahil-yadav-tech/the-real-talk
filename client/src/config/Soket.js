import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:9876";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});