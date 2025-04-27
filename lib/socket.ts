
import { io } from "socket.io-client";


const socket = io("https://workscout-backend.vercel.app", 
  withCredentials: true,
});

export default socket;
