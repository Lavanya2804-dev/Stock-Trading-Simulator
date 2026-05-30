import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";

export const getLeaderboard = async (
  req,
  res
) => {

  try {

    const users = await User.find({isAdmin:false})
      .select("-password");

    const leaderboard = [];

    for (const user of users) {

      const portfolio =
        await Portfolio.find({
          user: user._id,
        }).populate("stock");

      let portfolioValue = 0;

      let investment = 0;

      portfolio.forEach((item) => {

        if (!item.stock) return;

        portfolioValue +=
          item.stock.currentPrice *
          item.quantity;

        investment +=
          item.averagePrice *
          item.quantity;
      });

      const profitLoss =
        portfolioValue - investment;

      leaderboard.push({
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        portfolioValue:
          portfolioValue.toFixed(2),
        profitLoss:
          profitLoss.toFixed(2),
        totalValue: (
          user.balance +
          portfolioValue
        ).toFixed(2),
      });
    }

    leaderboard.sort(
      (a, b) =>
        b.totalValue - a.totalValue
    );

    res.status(200).json(
      leaderboard
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};