import Order from "../models/Order.js";
import Portfolio from "../models/Portfolio.js";
import Transaction from "../models/Transaction.js";

export const placeOrder = async (req, res) => {
  try {
    const {
      stock,
      orderType,
      quantity,
      price,
    } = req.body;

    // SELL VALIDATION
    if (orderType === "SELL") {

      const portfolio =
        await Portfolio.findOne({
          user: req.user.id,
          stock,
        });

      console.log("USER:", req.user.id);
      console.log("STOCK:", stock);
      console.log("PORTFOLIO:", portfolio);

      if (
        !portfolio ||
        portfolio.quantity < Number(quantity)
      ) {
        return res.status(400).json({
          message:
            "Not enough shares to sell",
        });
      }
    }

    // CREATE NEW ORDER
    const newOrder =
      await Order.create({
        user: req.user.id,
        stock,
        orderType,
        quantity,
        price,
      });

    // FIND MATCHING ORDER
    const matchingOrder =
      await Order.findOne({
        _id: { $ne: newOrder._id },
        stock,
        orderType:
          orderType === "BUY"
            ? "SELL"
            : "BUY",
        quantity,
        price,
        status: "PENDING",
      });

    console.log(
      "MATCHING ORDER:",
      matchingOrder
    );

    // DON'T MATCH WITH OWN ORDER
    if (
      matchingOrder &&
      matchingOrder.user.toString() ===
        req.user.id
    ) {
      return res.json({
        message:
          "Order placed and waiting for another user",
      });
    }

    // MATCH FOUND
    if (matchingOrder) {

      newOrder.status =
        "COMPLETED";

      matchingOrder.status =
        "COMPLETED";

      await newOrder.save();
      await matchingOrder.save();

      const buyer =
        orderType === "BUY"
          ? req.user.id
          : matchingOrder.user;

      const seller =
        orderType === "SELL"
          ? req.user.id
          : matchingOrder.user;

      // BUYER PORTFOLIO
      let buyerPortfolio =
        await Portfolio.findOne({
          user: buyer,
          stock,
        });

      if (buyerPortfolio) {

        buyerPortfolio.quantity +=
          Number(quantity);

        await buyerPortfolio.save();

      } else {

        await Portfolio.create({
          user: buyer,
          stock,
          quantity: Number(quantity),
          averagePrice:
            Number(price),
        });

      }

      // SELLER PORTFOLIO
      const sellerPortfolio =
        await Portfolio.findOne({
          user: seller,
          stock,
        });

      if (sellerPortfolio) {

        sellerPortfolio.quantity -=
          Number(quantity);

        if (
          sellerPortfolio.quantity <= 0
        ) {

          await Portfolio.findByIdAndDelete(
            sellerPortfolio._id
          );

        } else {

          await sellerPortfolio.save();

        }
      }

      // TRANSACTIONS
      // TRANSACTIONS
await Transaction.create({
  user: buyer,
  stock,
  type: "BUY",
  quantity: Number(quantity),
  price: Number(price),
  totalAmount:
    Number(quantity) *
    Number(price),
});

await Transaction.create({
  user: seller,
  stock,
  type: "SELL",
  quantity: Number(quantity),
  price: Number(price),
  totalAmount:
    Number(quantity) *
    Number(price),
});

      return res.json({
        message:
          "Order matched successfully",
      });
    }

    // NO MATCH FOUND
    return res.json({
      message:
        "Order placed and waiting for match",
    });

  } catch (error) {

    console.error(
      "ORDER ERROR:"
    );
    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
  
};
export const getOrders = async (
  req,
  res
) => {
  try {

    const orders =
      await Order.find({
        user: req.user.id,
      })
        .populate("stock")
        .sort({
          createdAt: -1,
        });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};