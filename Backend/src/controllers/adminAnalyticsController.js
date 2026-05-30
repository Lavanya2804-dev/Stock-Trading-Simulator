import User from "../models/User.js";

import Portfolio from "../models/Portfolio.js";

import Transaction from "../models/Transaction.js";

import Stock from "../models/Stock.js";


// GET ADMIN ANALYTICS
export const getAdminAnalytics =
  async (req, res) => {

    try {

      // TOTAL USERS
      const totalUsers =
        await User.countDocuments();


      // TOTAL STOCKS
      const totalStocks =
        await Stock.countDocuments();


      // TOTAL TRANSACTIONS
      const totalTransactions =
        await Transaction.countDocuments();


      // GET ALL TRANSACTIONS
      const transactions =
        await Transaction.find();


      // MARKET VOLUME
      let marketVolume = 0;

      transactions.forEach((t) => {

        marketVolume +=
          t.totalAmount;
      });


      // GET ALL PORTFOLIOS
      const portfolios =
        await Portfolio.find()
        .populate("stock");


      // PLATFORM VALUE
      let platformValue = 0;

      portfolios.forEach((p) => {

        if (!p.stock) return;

        platformValue +=
          p.stock.currentPrice *
          p.quantity;
      });


      // RECENT TRANSACTIONS
      const recentTransactions =
        await Transaction.find()
          .populate(
            "user",
            "name email"
          )
          .populate(
            "stock",
            "symbol"
          )
          .sort({
            createdAt: -1,
          })
          .limit(5);


      res.status(200).json({

        totalUsers,

        totalStocks,

        totalTransactions,

        marketVolume:
          marketVolume.toFixed(2),

        platformValue:
          platformValue.toFixed(2),

        recentTransactions,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };