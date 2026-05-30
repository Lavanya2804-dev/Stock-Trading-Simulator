import Portfolio from "../models/Portfolio.js";

import User from "../models/User.js";


// GET DASHBOARD ANALYTICS
export const getAnalytics = async (req, res) => {

  try {

    // BLOCK ADMIN
    if (req.user.isAdmin) {
      return res.status(403).json({
        message:
          "Admins cannot access user analytics",
      });
    }

    const user = await User.findById(req.user._id);

    const portfolio = await Portfolio.find({
      user: req.user._id,
    }).populate("stock");

    let totalInvestment = 0;

    let currentValue = 0;

    let totalProfitLoss = 0;

    const holdings = portfolio

      .filter((item) => item.stock)

      .map((item) => {

        const invested =
          item.averagePrice * item.quantity;

        const current =
          item.stock.currentPrice * item.quantity;

        const profitLoss =
          current - invested;

        totalInvestment += invested;

        currentValue += current;

        totalProfitLoss += profitLoss;

        return {

          symbol: item.stock.symbol,

          quantity: item.quantity,

          averagePrice:
            item.averagePrice,

          currentPrice:
            item.stock.currentPrice,

          invested,

          current,

          profitLoss,
        };
      });

    res.status(200).json({

      availableBalance:
        user.balance,

      totalInvestment:
        totalInvestment.toFixed(2),

      currentPortfolioValue:
        currentValue.toFixed(2),

      totalProfitLoss:
        totalProfitLoss.toFixed(2),

      holdings,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};