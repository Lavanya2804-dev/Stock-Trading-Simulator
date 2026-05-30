import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";


function AdminAnalytics() {

  const [analytics, setAnalytics] =
    useState(null);


  const fetchAnalytics =
    async () => {

      try {

        const { data } =
          await api.get(
            "/admin/analytics"
          );

        setAnalytics(data);

      } catch (error) {

        console.log(error);

      }
    };


  useEffect(() => {

    fetchAnalytics();

  }, []);


  if (!analytics) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Admin Analytics
        </h1>


        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

          <div className="bg-white shadow rounded-xl p-5">

            <h2 className="text-gray-500">
              Users
            </h2>

            <p className="text-3xl font-bold">
              {
                analytics.totalUsers
              }
            </p>

          </div>


          <div className="bg-white shadow rounded-xl p-5">

            <h2 className="text-gray-500">
              Stocks
            </h2>

            <p className="text-3xl font-bold">
              {
                analytics.totalStocks
              }
            </p>

          </div>


          <div className="bg-white shadow rounded-xl p-5">

            <h2 className="text-gray-500">
              Transactions
            </h2>

            <p className="text-3xl font-bold">
              {
                analytics.totalTransactions
              }
            </p>

          </div>


          <div className="bg-white shadow rounded-xl p-5">

            <h2 className="text-gray-500">
              Market Volume
            </h2>

            <p className="text-2xl font-bold">
              $
              {
                analytics.marketVolume
              }
            </p>

          </div>


          <div className="bg-white shadow rounded-xl p-5">

            <h2 className="text-gray-500">
              Platform Value
            </h2>

            <p className="text-2xl font-bold">
              $
              {
                analytics.platformValue
              }
            </p>

          </div>

        </div>


        {/* RECENT TRADES */}

        <div className="bg-white shadow rounded-xl overflow-hidden">

          <div className="p-5 border-b">

            <h2 className="text-2xl font-bold">
              Recent Transactions
            </h2>

          </div>


          <table className="w-full">

            <thead className="bg-black text-white">

              <tr>

                <th className="p-4 text-left">
                  User
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

              </tr>

            </thead>


            <tbody>

              {analytics.recentTransactions.map(
                (trade) => (

                  <tr
                    key={trade._id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {
                        trade.user.name
                      }
                    </td>

                    <td className="p-4 font-bold">
                      {
                        trade.stock.symbol
                      }
                    </td>

                    <td
                      className={`p-4 font-bold ${
                        trade.type === "BUY"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {trade.type}
                    </td>

                    <td className="p-4">
                      {
                        trade.quantity
                      }
                    </td>

                    <td className="p-4">
                      $
                      {
                        trade.totalAmount
                      }
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default AdminAnalytics;