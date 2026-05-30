import {
  useState,
} from "react";

import toast from "react-hot-toast";

import api from "../api/axios";


function BuyModal({
  stock,
  onClose,
  refreshAnalytics,
}) {

  const [quantity, setQuantity] =
    useState(1);


  const handleBuy = async () => {

    try {

      await api.post(
        "/portfolio/buy",
        {
          symbol: stock.symbol,
          quantity,
        }
      );

      toast.success(
        "Stock Purchased"
      );

      refreshAnalytics();

      onClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-2xl font-bold mb-4">
          Buy {stock.symbol}
        </h2>

        <p className="mb-4">
          Current Price:
          <span className="font-bold ml-2">
            ${stock.currentPrice}
          </span>
        </p>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(e.target.value)
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleBuy}
          className="w-full bg-black text-white p-3 rounded mb-3"
        >
          Buy Stock
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-300 p-3 rounded"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default BuyModal;