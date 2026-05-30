import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";


function Insights() {

  const [insights, setInsights] =
    useState([]);


  const fetchInsights =
    async () => {

      try {

        const { data } =
          await api.get(
            "/insights"
          );

        setInsights(data);

      } catch (error) {

        console.log(error);

      }
    };


  useEffect(() => {
    fetchInsights();
  }, []);


  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          AI Trading Insights
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {insights.map(
            (item, index) => (

              <div
                key={index}
                className="bg-white shadow rounded-xl p-5"
              >

                <h2 className="text-2xl font-bold">
                  {item.symbol}
                </h2>

                <p className="text-gray-500">
                  {item.company}
                </p>

                <p className="mt-3">
                  Price:
                  <span className="font-bold ml-2">
                    $
                    {
                      item.currentPrice
                    }
                  </span>
                </p>

                <p className="mt-2">
                  Change:
                  <span
                    className={`ml-2 font-bold ${
                      item.change >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.change}%
                  </span>
                </p>

                <div
                  className={`mt-4 inline-block px-4 py-2 rounded text-white font-bold ${
                    item.recommendation ===
                    "BUY"
                      ? "bg-green-500"
                      : item.recommendation ===
                        "SELL"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {
                    item.recommendation
                  }
                </div>

              </div>
            )
          )}

        </div>

      </div>
    </>
  );
}

export default Insights;