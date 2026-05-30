import User from "../models/User.js";


// GET ALL USERS
export const getAllUsers =
  async (req, res) => {

    try {

     const users =
  await User.find({
    isAdmin: false,
  }).select("-password");

      res.status(200).json(users);

      console.log("FILTERED USERS:", users);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


// BLOCK / UNBLOCK USER
export const toggleBlockUser =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });
      }

      user.isBlocked =
        !user.isBlocked;

      await user.save();

      res.status(200).json({
        message:
          user.isBlocked
            ? "User blocked"
            : "User unblocked",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


// DELETE USER
export const deleteUser =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });
      }

      await user.deleteOne();

      res.status(200).json({
        message: "User deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };