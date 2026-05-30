import Stock from "../models/Stock.js";

import { io } from "../server.js";

import Notification from "../models/Notification.js";

import Watchlist from "../models/Watchlist.js";

import PriceAlert from "../models/PriceAlert.js";


const updateStockPrices = async () => {

  try {

    const stocks = await Stock.find();

    for (const stock of stocks) {

      // RANDOM PRICE CHANGE
      const randomChange =
        (Math.random() * 10 - 5).toFixed(2);

      const newPrice =
        stock.currentPrice + Number(randomChange);

      const changePercent =
        (
          ((newPrice - stock.previousClose) /
            stock.previousClose) *
          100
        ).toFixed(2);

      stock.currentPrice = Number(newPrice.toFixed(2));

      stock.changePercent = Number(changePercent);

      stock.volume += Math.floor(Math.random() * 1000);

      await stock.save();

      const alerts =
  await PriceAlert.find({
    stock: stock._id,
    triggered: false,
  });

for (const alert of alerts) {

  if (
    stock.currentPrice >=
    alert.targetPrice
  ) {

    alert.triggered = true;

    await alert.save();

    const message =

      `${stock.symbol} reached target price of $${alert.targetPrice}`;

    // SAVE NOTIFICATION
    await Notification.create({
      user: alert.user,
      message,
    });

    // REALTIME SOCKET EVENT
    io.to(
      alert.user.toString()
    ).emit(
      "newNotification",
      {
        message,
      }
    );
  }
}

      // EMIT LIVE UPDATE
      io.emit("stockUpdated", stock);

      if (
  Math.abs(stock.changePercent) >= 5
) {

  const watchlists =
    await Watchlist.find({
      stock: stock._id,
    });

  for (const item of watchlists) {

    const message =

      stock.changePercent > 0

        ? `${stock.symbol} surged ${stock.changePercent}%`

        : `${stock.symbol} dropped ${Math.abs(stock.changePercent)}%`;

    // SAVE NOTIFICATION
    await Notification.create({
      user: item.user,
      message,
    });

    // LIVE SOCKET EVENT
    io.to(
      item.user.toString()
    ).emit(
      "newNotification",
      {
        message,
      }
    );
  }
}
    }

  } catch (error) {

    console.log(error.message);

  }
};


export default updateStockPrices;