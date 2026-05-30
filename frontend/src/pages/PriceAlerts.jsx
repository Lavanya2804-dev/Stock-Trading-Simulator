import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";

import toast from "react-hot-toast";

function PriceAlerts() {

  const [alerts, setAlerts] =
    useState([]);

  const [symbol, setSymbol] =
    useState("");

  const [targetPrice,
    setTargetPrice] =
      useState("");


  const fetchAlerts =
    async () => {

      try {

        const { data } =
          await api.get("/alerts");

        setAlerts(data);

      } catch (error) {

        console.log(error);

      }
    };


  const createAlert =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/alerts",
          {
            symbol,
            targetPrice,
          }
        );

        toast.success(
          "Alert Created"
        );

        setSymbol("");

        setTargetPrice("");

        fetchAlerts();

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

      }
    };


  useEffect(() => {

    fetchAlerts();

  }, []);


  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Price Alerts
        </h1>


        <form
          onSubmit={createAlert}
          className="bg-white shadow rounded-xl p-6 mb-8 space-y-4"
        >

          <input
            type="text"
            placeholder="Stock Symbol"
            value={symbol}
            onChange={(e) =>
              setSymbol(e.target.value)
            }
            className="border p-3 rounded w-full"
          />

          <input
            type="number"
            placeholder="Target Price"
            value={targetPrice}
            onChange={(e) =>
              setTargetPrice(e.target.value)
            }
            className="border p-3 rounded w-full"
          />

          <button
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create Alert
          </button>

        </form>

<div className="space-y-4">

  {
    alerts
      .filter(
        (alert) => alert.stock
      )
      .map((alert) => (

        <div
          key={alert._id}
          className="
            bg-white
            shadow
            rounded-xl
            p-4
          "
        >

          <p className="font-bold">
            {alert.stock?.symbol}
          </p>

          <p>
            Target Price:
            ${alert.targetPrice}
          </p>

          <p
            className={`font-semibold ${
              alert.triggered
                ? "text-green-500"
                : "text-yellow-500"
            }`}
          >

            {
              alert.triggered
                ? "Triggered"
                : "Pending"
            }

          </p>

        </div>

    ))
  }

</div>
      </div>
    </>
  );
}

export default PriceAlerts;