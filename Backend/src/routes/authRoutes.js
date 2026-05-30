import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  toggleNotifications,
  updateProfile,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/profile", protect, getUserProfile);

router.put("/toggle-notifications",protect,toggleNotifications);

router.put("/update-profile",protect,updateProfile);

export default router;