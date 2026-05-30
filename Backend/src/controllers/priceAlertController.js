import PriceAlert from "../models/PriceAlert.js";

import Stock from "../models/Stock.js";


// CREATE ALERT
export const createAlert =
  async (req, res) => {

    try {

      const {
        symbol,
        targetPrice,
      } = req.body;

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

      const alert =
        await PriceAlert.create({
          user: req.user._id,
          stock: stock._id,
          targetPrice,
        });

      res.status(201).json(alert);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


// GET ALERTS
export const getAlerts =
  async (req, res) => {

    try {

      const alerts =
        await PriceAlert.find({
          user: req.user._id,
        }).populate("stock");

      res.status(200).json(alerts);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };