import dotenv from "dotenv";

import connectDB from "./config/db.js";

import Stock from "./models/Stock.js";

import stocks from "./data/stocks.js";

dotenv.config();

connectDB();

const seedStocks = async () => {

  try {

    await Stock.deleteMany();

    await Stock.insertMany(stocks);

    console.log("Stocks Seeded");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

seedStocks();