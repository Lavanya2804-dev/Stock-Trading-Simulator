import Stock from "../models/Stock.js";


// GENERATE MARKET INSIGHTS
export const getInsights =
  async (req, res) => {

    try {

      const stocks =
        await Stock.find();

      const insights = stocks.map(
        (stock) => {

          let recommendation =
            "HOLD";

          if (
            stock.changePercent > 2
          ) {
            recommendation =
              "BUY";
          }

          if (
            stock.changePercent < -2
          ) {
            recommendation =
              "SELL";
          }

          return {
            symbol:
              stock.symbol,

            company:
              stock.companyName,

            currentPrice:
              stock.currentPrice,

            change:
              stock.changePercent,

            recommendation,
          };
        }
      );

      res.status(200).json(
        insights
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };