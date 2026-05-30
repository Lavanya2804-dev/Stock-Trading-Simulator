import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import api from "../api/axios";

import Navbar from "../components/Navbar";

function StockDetails() {

  const { symbol } =
    useParams();

  const [stock, setStock] =
    useState(null);

  const [history, setHistory] =
    useState([]);


  // FETCH STOCK
  const fetchStock =
    async () => {

      try {

        const { data } =
          await api.get(
            `/stocks/${symbol}`
          );

        setStock(data);

      } catch (error) {

        console.log(error);

      }
    };


  // FETCH HISTORY
  const fetchHistory =
    async () => {

      try {

        const { data } =
          await api.get(
            `/stocks/history/${symbol}`
          );

        setHistory(data);

      } catch (error) {

        console.log(error);

      }
    };


  useEffect(() => {

    fetchStock();

    fetchHistory();

  }, []);


  if (!stock) {
    return (
      <p className="p-6">
        Loading...
      </p>
    );
  }


  return (
    <>
      <Navbar />

      <div className="p-6">

        <div className="bg-white shadow rounded-xl p-6 mb-6">

          <h1 className="text-4xl font-bold">
            {stock.symbol}
          </h1>

          <p className="text-gray-500 text-lg">
            {stock.companyName}
          </p>

          <div className="mt-4">

            <p className="text-3xl font-bold">
              ${stock.currentPrice}
            </p>

            <p
              className={`font-bold ${
                stock.changePercent >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stock.changePercent}%
            </p>

          </div>

        </div>


        {/* CHART */}

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Price Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <LineChart data={history}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#000"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>
    </>
  );
}

export default StockDetails;