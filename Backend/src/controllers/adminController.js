import Stock from "../models/Stock.js";

import User from "../models/User.js";


// GET ALL USERS
export const getUsers =
  async (req, res) => {

    try {

      const users =
        await User.find({ isAdmin:false,}).select(
          "-password"
        );

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


// ADD STOCK
export const addStock =
  async (req, res) => {

    try {

      const {
        symbol,
        companyName,
        currentPrice,
      } = req.body;

      const stock =
        await Stock.create({
          symbol,
          companyName,
          currentPrice,
          previousPrice:
            currentPrice,
          changePercent: 0,
        });

      res.status(201).json(
        stock
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


// DELETE STOCK
export const deleteStock =
  async (req, res) => {

    try {

      await Stock.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Stock deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };