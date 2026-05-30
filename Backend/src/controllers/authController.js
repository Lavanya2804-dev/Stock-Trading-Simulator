import bcrypt from "bcryptjs";

import User from "../models/User.js";
import generateCookie from "../utils/generateCookie.js";


// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CHECK USER EXISTS
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    generateCookie(res, user._id);

res.status(201).json({
  _id: user._id,
  name: user.name,
  email: user.email,
  balance: user.balance,
  isAdmin: user.isAdmin,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

   generateCookie(res, user._id);

res.status(200).json({
  _id: user._id,
  name: user.name,
  email: user.email,
  balance: user.balance,
    isAdmin: user.isAdmin,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER PROFILE
export const getUserProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isBlocked) {
  return res.status(403).json({
    message: "Your account is blocked by admin",
  });
}

    res.status(200).json({
        _id: req.user._id,
  name: req.user.name,
  email: req.user.email,
  balance: req.user.balance,
  isAdmin: req.user.isAdmin,
   notificationsEnabled:
    user.notificationsEnabled,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// LOGOUT USER
export const logoutUser = (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};

export const toggleNotifications =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      user.notificationsEnabled =
        !user.notificationsEnabled;

      await user.save();

      res.status(200).json({
        notificationsEnabled:
          user.notificationsEnabled,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


  // UPDATE PROFILE
export const updateProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });

      }

      user.name =
        req.body.name || user.name;

      await user.save();

      res.status(200).json({
        message:
          "Profile updated successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };