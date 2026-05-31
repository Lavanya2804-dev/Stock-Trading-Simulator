import { io } from "socket.io-client";

const socket = io(
  "https://stock-trading-simulator-dcor.onrender.com",
  {
    withCredentials: true,
  }
);

export default socket;