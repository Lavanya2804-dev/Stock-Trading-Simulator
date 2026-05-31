import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import insightRoutes from "./routes/insightRoutes.js";
import adminAnalyticsRoutes from "./routes/adminAnalyticsRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import priceAlertRoutes from "./routes/priceAlertRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173",
       "https://stock-trading-simulator-git-main-lavanya2804-devs-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/stocks", stockRoutes);

app.use("/api/portfolio", portfolioRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/watchlist",watchlistRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/insights",insightRoutes);

app.use("/api/admin/analytics",adminAnalyticsRoutes);

app.use("/api/leaderboard",leaderboardRoutes);

app.use("/api/notifications",notificationRoutes);

app.use("/api/alerts",priceAlertRoutes);

app.use("/api/admin/users",adminUserRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Stock Trading Simulator API Running");
});


// AUTH ROUTES
app.use("/api/auth", authRoutes);

app.use(
  "/api/orders",
  orderRoutes
);


export default app;