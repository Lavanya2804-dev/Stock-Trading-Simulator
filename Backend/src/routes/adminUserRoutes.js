import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getAllUsers,
  toggleBlockUser,
  deleteUser,
} from "../controllers/adminUserController.js";

const router = express.Router();


// ADMIN CHECK
const adminOnly = (
  req,
  res,
  next
) => {

  if (!req.user.isAdmin) {

    return res.status(403).json({
      message: "Admin only",
    });
  }

  next();
};


router.get(
  "/",
  protect,
  adminOnly,
  getAllUsers
);

router.put(
  "/block/:id",
  protect,
  adminOnly,
  toggleBlockUser
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteUser
);

export default router;