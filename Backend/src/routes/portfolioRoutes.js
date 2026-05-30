import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  buyStock,
  sellStock,
  getPortfolio,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.post("/buy", protect, buyStock);

router.post("/sell", protect, sellStock);

router.get("/", protect, getPortfolio);

export default router;