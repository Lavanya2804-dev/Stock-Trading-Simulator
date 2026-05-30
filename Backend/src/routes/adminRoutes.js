import express from "express";

import protect from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getUsers,
  addStock,
  deleteStock,
} from "../controllers/adminController.js";

const router = express.Router();


// GET USERS
router.get(
  "/users",
  protect,
  adminMiddleware,
  getUsers
);


// ADD STOCK
router.post(
  "/stocks",
  protect,
  adminMiddleware,
  addStock
);


// DELETE STOCK
router.delete(
  "/stocks/:id",
  protect,
  adminMiddleware,
  deleteStock
);


export default router;