import Watchlist from "../models/Watchlist.js";

import Stock from "../models/Stock.js";

import Notification from "../models/Notification.js";


// ADD TO WATCHLIST
export const addToWatchlist =
  async (req, res) => {

    try {

      // BLOCK ADMIN
      if (req.user.isAdmin) {
        return res.status(403).json({
          message:
            "Admins cannot use watchlist",
        });
      }

      const { symbol } = req.body;

      const stock =
        await Stock.findOne({
          symbol,
        });

      if (!stock) {
        return res.status(404).json({
          message:
            "Stock not found",
        });
      }

      const exists =
        await Watchlist.findOne({
          user: req.user._id,
          stock: stock._id,
        });

      if (exists) {
        return res.status(400).json({
          message:
            "Already in watchlist",
        });
      }

      const watchlist =
        await Watchlist.create({
          user: req.user._id,
          stock: stock._id,
        });

        await Notification.create({
  user: req.user._id,
  message: `${stock.symbol} added to your watchlist`,
});

      res.status(201).json(
        watchlist
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


// GET WATCHLIST
export const getWatchlist =
  async (req, res) => {

    try {

      // BLOCK ADMIN
      if (req.user.isAdmin) {
        return res.status(403).json({
          message:
            "Admins cannot use watchlist",
        });
      }

      const watchlist =
        await Watchlist.find({
          user: req.user._id,
        }).populate("stock");

      res.status(200).json(
        watchlist
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


// REMOVE WATCHLIST
export const removeFromWatchlist =
  async (req, res) => {

    try {

      // BLOCK ADMIN
      if (req.user.isAdmin) {
        return res.status(403).json({
          message:
            "Admins cannot use watchlist",
        });
      }

      await Watchlist.findByIdAndDelete(
        req.params.id
      );

      await Notification.create({
  user: req.user._id,
  message: "A stock was removed from your watchlist",
});

      res.status(200).json({
        message:
          "Removed from watchlist",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };