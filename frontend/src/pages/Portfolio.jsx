import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import api from "../api/axios";

import Navbar from "../components/Navbar";


function Portfolio() {

  const [portfolio, setPortfolio] =
    useState([]);


  const fetchPortfolio = async () => {

    try {

      const { data } =
        await api.get("/portfolio");

      setPortfolio(data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    fetchPortfolio();
  }, []);


  const handleSell = async (
    symbol
  ) => {

    try {

      await api.post(
        "/portfolio/sell",
        {
          symbol,
          quantity: 1,
        }
      );

      toast.success(
        "Stock Sold"
      );

      fetchPortfolio();

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );
    }
  };


  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Portfolio
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">

              <tr>

                <th className="p-4 text-left">
                  Symbol
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Avg Price
                </th>

                <th className="p-4 text-left">
                  Current Price
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {portfolio.map((item) => (

                <tr
                  key={item._id}
                  className="border-b"
                >

                  <td className="p-4 font-bold">
                    {item.stock.symbol}
                  </td>

                  <td className="p-4">
                    {item.quantity}
                  </td>

                  <td className="p-4">
                    ${item.averagePrice}
                  </td>

                  <td className="p-4">
                    ${item.stock.currentPrice}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleSell(
                          item.stock.symbol
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Sell
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default Portfolio;