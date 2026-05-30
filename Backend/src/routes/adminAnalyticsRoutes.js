import express from "express";

import protect from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAdminAnalytics,
} from "../controllers/adminAnalyticsController.js";

const router = express.Router();

router.get(
  "/",
  protect,
  adminMiddleware,
  getAdminAnalytics
);

export default router;