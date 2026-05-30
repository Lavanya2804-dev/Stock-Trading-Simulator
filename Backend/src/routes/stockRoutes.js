import express from "express";

import {
  getStocks,
  getSingleStock,
  getStockHistory,
} from "../controllers/stockController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStocks);

// HISTORY ROUTE FIRST
router.get(
  "/history/:symbol",
  protect,
  getStockHistory
);

// SINGLE STOCK
router.get(
  "/:symbol",
  getSingleStock
);

export default router;