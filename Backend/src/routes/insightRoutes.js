import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getInsights,
} from "../controllers/insightController.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getInsights
);

export default router;