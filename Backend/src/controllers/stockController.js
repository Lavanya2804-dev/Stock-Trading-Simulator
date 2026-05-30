import Stock from "../models/Stock.js";


// GET ALL STOCKS
export const getStocks = async (req, res) => {

  try {

    const stocks = await Stock.find();

    res.status(200).json(stocks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET SINGLE STOCK
export const getSingleStock = async (req, res) => {

  try {

    const stock = await Stock.findOne({
      symbol: req.params.symbol,
    });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    res.status(200).json(stock);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


export const getStockHistory =
  async (req, res) => {

    try {

      const history = [];

      let price = 100;

      for (
        let i = 1;
        i <= 10;
        i++
      ) {

        price +=
          Math.random() * 10 - 5;

        history.push({
          time: `${i}:00`,
          price:
            price.toFixed(2),
        });
      }

      res.json(history);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };