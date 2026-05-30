import Order from "../models/Order.js";
import Portfolio from "../models/Portfolio.js";
import Transaction from "../models/Transaction.js";

export const placeOrder = async (
  req,
  res
) => {
  try {
    const {
      stock,
      orderType,
      quantity,
      price,
    } = req.body;

    // CREATE ORDER
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
        stock,
        orderType:
          orderType === "BUY"
            ? "SELL"
            : "BUY",
        quantity,
        price,
        status: "PENDING",
      });

    // MATCH FOUND
    if (matchingOrder) {
      newOrder.status =
        "COMPLETED";

      matchingOrder.status =
        "COMPLETED";

      await newOrder.save();
      await matchingOrder.save();

      // SAVE TRANSACTIONS
      await Transaction.create({
        user: req.user.id,
        stock,
        type: orderType,
        quantity,
        price,
      });

      await Transaction.create({
        user:
          matchingOrder.user,
        stock,
        type:
          matchingOrder.orderType,
        quantity,
        price,
      });

      return res.json({
        message:
          "Order matched successfully",
      });
    }

    res.json({
      message:
        "Order placed and waiting for match",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrders =
  async (req, res) => {
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