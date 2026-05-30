import Portfolio from "../models/Portfolio.js";
import Stock from "../models/Stock.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Notification from "../models/Notification.js";


// BUY STOCK
export const buyStock = async (req, res) => {

  try {

    // BLOCK ADMIN
    if (req.user.isAdmin) {
      return res.status(403).json({
        message:
          "Admins cannot buy stocks",
      });
    }

    const { symbol, quantity } = req.body;

    const stock = await Stock.findOne({ symbol });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    const totalCost =
      stock.currentPrice * quantity;

    const user = await User.findById(req.user._id);

    // CHECK BALANCE
    if (user.balance < totalCost) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // FIND EXISTING PORTFOLIO
    let portfolio = await Portfolio.findOne({
      user: user._id,
      stock: stock._id,
    });

    if (portfolio) {

      // UPDATE EXISTING HOLDING
      const totalShares =
        portfolio.quantity + quantity;

      portfolio.averagePrice =
        (
          (
            portfolio.averagePrice *
            portfolio.quantity
          ) +
          totalCost
        ) / totalShares;

      portfolio.quantity = totalShares;

      await portfolio.save();

    } else {

      // CREATE NEW HOLDING
      portfolio = await Portfolio.create({
        user: user._id,
        stock: stock._id,
        quantity,
        averagePrice: stock.currentPrice,
      });

    }

    // UPDATE USER BALANCE
    user.balance -= totalCost;

    await user.save();

    // SAVE TRANSACTION
    await Transaction.create({
      user: user._id,
      stock: stock._id,
      type: "BUY",
      quantity,
      price: stock.currentPrice,
      totalAmount: totalCost,
    });

    await Notification.create({
  user: user._id,
  message: `You bought ${quantity} share(s) of ${stock.symbol} at $${stock.currentPrice}`,
});

    res.status(200).json({
      message: "Stock purchased successfully",
      portfolio,
      balance: user.balance,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// SELL STOCK
export const sellStock = async (req, res) => {

  try {

    // BLOCK ADMIN
    if (req.user.isAdmin) {
      return res.status(403).json({
        message:
          "Admins cannot sell stocks",
      });
    }

    const { symbol, quantity } = req.body;

    const stock = await Stock.findOne({ symbol });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    const portfolio = await Portfolio.findOne({
      user: req.user._id,
      stock: stock._id,
    });

    if (!portfolio) {
      return res.status(400).json({
        message: "No stock holdings found",
      });
    }

    if (portfolio.quantity < quantity) {
      return res.status(400).json({
        message: "Not enough shares",
      });
    }

    const totalValue =
      stock.currentPrice * quantity;

    // UPDATE PORTFOLIO
    portfolio.quantity -= quantity;

    if (portfolio.quantity === 0) {
      await portfolio.deleteOne();
    } else {
      await portfolio.save();
    }

    // UPDATE USER BALANCE
    const user = await User.findById(req.user._id);

    user.balance += totalValue;

    await user.save();

    // SAVE TRANSACTION
    await Transaction.create({
      user: user._id,
      stock: stock._id,
      type: "SELL",
      quantity,
      price: stock.currentPrice,
      totalAmount: totalValue,
    });

    await Notification.create({
  user: user._id,
  message: `You sold ${quantity} share(s) of ${stock.symbol} at $${stock.currentPrice}`,
});

    res.status(200).json({
      message: "Stock sold successfully",
      balance: user.balance,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET USER PORTFOLIO
export const getPortfolio = async (req, res) => {

  try {

    // BLOCK ADMIN
    if (req.user.isAdmin) {
      return res.status(403).json({
        message:
          "Admins cannot access portfolio",
      });
    }

    const portfolio = await Portfolio.find({
      user: req.user._id,
    }).populate("stock");

    res.status(200).json(portfolio);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};