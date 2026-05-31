import dotenv from "dotenv";

import http from "http";

import { Server } from "socket.io";

import app from "./app.js";

import connectDB from "./config/db.js";

import updateStockPrices from "./services/marketSimulation.js";



dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);


// SOCKET.IO
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173",
       "https://stock-trading-simulator-lake.vercel.app",
    ],
    credentials: true,
  },
});


// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log(
    `User Connected: ${socket.id}`
  );

  // JOIN USER ROOM
  socket.on(
    "joinUserRoom",
    (userId) => {

      socket.join(userId);

      console.log(
        `User joined room: ${userId}`
      );

    }
  );

  socket.on("disconnect", () => {

    console.log(
      `User Disconnected: ${socket.id}`
    );

  });

});

// MARKET SIMULATION
setInterval(() => {
  updateStockPrices();
}, 3000);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});