
import { io } from "socket.io-client";

const socket = io("https://workscout-backend.vercel.app/api/v1/", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
