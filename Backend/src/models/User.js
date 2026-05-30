import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    balance: {
      type: Number,
      default: 100000,
    },

    watchlist: {
      type: [String],
      default: [],
    },
    isAdmin: {
  type: Boolean,
  default: false,
},
isBlocked: {
  type: Boolean,
  default: false,
},
notificationsEnabled: {
  type: Boolean,
  default: true,
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;