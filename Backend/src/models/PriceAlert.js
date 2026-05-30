import mongoose from "mongoose";

const priceAlertSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      stock: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Stock",
        required: true,
      },

      targetPrice: {
        type: Number,
        required: true,
      },

      triggered: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const PriceAlert =
  mongoose.model(
    "PriceAlert",
    priceAlertSchema
  );

export default PriceAlert;