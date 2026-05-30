import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import api from "../api/axios";

import socket from "../socket/socket";

import Navbar from "../components/Navbar";

import BuyModal from "../components/BuyModal";

import AnalyticsCharts from "../components/AnalyticsCharts";

import {
  useAuth,
} from "../context/AuthContext";

import toast from "react-hot-toast";

import {
  Carousel,
} from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import StockNews from "../components/StockNews";


function Dashboard() {

  const { user } = useAuth();

  const [stocks, setStocks] =
    useState([]);

  const [analytics, setAnalytics] =
    useState(null);

  const [selectedStock, setSelectedStock] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");


  // FETCH STOCKS
  const fetchStocks = async () => {

    try {

      const { data } =
        await api.get("/stocks");

      setStocks(data);

    } catch (error) {

      console.log(error);

    }
  };


  // FETCH ANALYTICS
  const fetchAnalytics = async () => {

    try {

      const { data } =
        await api.get("/analytics");

      setAnalytics(data);

    } catch (error) {

      console.log(error);

    }
  };


  // FILTER STOCKS
  const filteredStocks =
    stocks.filter((stock) => {

      const matchesSearch =

        stock.symbol
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        stock.companyName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      if (filter === "GAINERS") {

        return (
          matchesSearch &&
          stock.changePercent > 0
        );
      }

      if (filter === "LOSERS") {

        return (
          matchesSearch &&
          stock.changePercent < 0
        );
      }

      return matchesSearch;
    });


  // INITIAL FETCH
  useEffect(() => {

    fetchStocks();

    if (!user?.isAdmin) {
      fetchAnalytics();
    }

  }, [user]);


  // SOCKET LIVE UPDATES
  useEffect(() => {

    socket.on(
      "stockUpdated",
      (updatedStock) => {

        setStocks((prevStocks) =>

          prevStocks.map((stock) =>

            stock._id === updatedStock._id

              ? updatedStock

              : stock
          )
        );
      }
    );

    return () => {

      socket.off("stockUpdated");

    };

  }, []);


  return (
    <>
      <Navbar />

      <div className="p-4 md:p-6">

        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Dashboard
        </h1>

        {/* STOCK MARKET CAROUSEL */}

<div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">

  <Carousel
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    interval={3500}
    transitionTime={800}
  >

    {/* IMAGE 1 */}
    <div className="relative">

      <img
        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
        alt="Trading"
        className="h-[350px] w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">

        <h2 className="text-4xl font-bold mb-4">
          Trade Smarter
        </h2>

        <p className="text-lg">
          Real-time stock trading simulation
        </p>

      </div>

    </div>


    {/* IMAGE 2 */}
    <div className="relative">

      <img
        src="https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop"
        alt="Analytics"
        className="h-[350px] w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">

        <h2 className="text-4xl font-bold mb-4">
          Analyze Markets
        </h2>

        <p className="text-lg">
          Live charts and insights
        </p>

      </div>

    </div>


    {/* IMAGE 3 */}
    <div className="relative">

      <img
        src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2070&auto=format&fit=crop"
        alt="Finance"
        className="h-[350px] w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">

        <h2 className="text-4xl font-bold mb-4">
          Build Your Portfolio
        </h2>

        <p className="text-lg">
          Experience realistic stock investing
        </p>

      </div>

    </div>

  </Carousel>

</div>


        {/* SEARCH + FILTER */}

        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search Stocks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border p-3 rounded w-full"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="border p-3 rounded"
          >

            <option value="ALL">
              All
            </option>

            <option value="GAINERS">
              Gainers
            </option>

            <option value="LOSERS">
              Losers
            </option>

          </select>

        </div>


        {/* USER ANALYTICS */}
{!user?.isAdmin && analytics && (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-gray-500">Balance</h2>
      <p className="text-2xl font-bold">
          ${Number(analytics.availableBalance || 0).toFixed(2)}
      </p>
    </div>

    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-gray-500">Portfolio Value</h2>
      <p className="text-2xl font-bold">
        ${Number(analytics.currentPortfolioValue || 0).toFixed(2)}
      </p>
    </div>

    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-gray-500">Profit / Loss</h2>
      <p className="text-2xl font-bold">
         ${Number(analytics.totalProfitLoss || 0).toFixed(2)}
      </p>
    </div>

  </div>
)}


        {/* CHARTS */}

        {!user?.isAdmin && (

          <div className="overflow-x-auto">

  <AnalyticsCharts
    analytics={analytics}
  />

</div>

        )}

        <StockNews />


        {/* STOCK TABLE */}

        <div className="bg-white shadow rounded-xl overflow-x-auto">

         <table className="w-full min-w-[700px]">

            <thead className="bg-black text-white">

              <tr>

                <th className="p-4 text-left">
                  Symbol
                </th>

                <th className="p-4 text-left">
                  Company
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Change %
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredStocks.map((stock) => (

                <tr
                  key={stock._id}
                  className="border-b"
                >

                  <td className="p-4 font-bold">
                    {stock.symbol}
                  </td>

                  <td className="p-4">
                    {stock.companyName}
                  </td>

                  <td className="p-4">
                    $
                    {stock.currentPrice}
                  </td>

                  <td
                    className={`p-4 font-bold ${
                      stock.changePercent >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >

                    {stock.changePercent}%

                  </td>


                <td className="p-4 flex flex-col md:flex-row gap-2">

                    {!user?.isAdmin && (
                      <>

                        <button
                          onClick={async () => {

                            try {

                              const { data } =
                                await api.post(
                                  "/watchlist",
                                  {
                                    symbol:
                                      stock.symbol,
                                  }
                                );

                              console.log(data);

                             toast.success("Added to Watchlist");

                            } catch (error) {

                              console.log(
                                error.response?.data
                              );

                             toast.error(
  error.response?.data?.message
);
                            }
                          }}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Watch
                        </button>


                        <button
                          onClick={() =>
                            setSelectedStock(stock)
                          }
                          className="bg-black text-white px-4 py-2 rounded"
                        >
                          Buy
                        </button>

                      </>
                    )}


                    <Link
                      to={`/stocks/${stock.symbol}`}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Analytics
                    </Link>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* BUY MODAL */}

      {!user?.isAdmin &&
        selectedStock && (

          <BuyModal
            stock={selectedStock}
            onClose={() =>
              setSelectedStock(null)
            }
            refreshAnalytics={
              fetchAnalytics
            }
          />

        )}

    </>
  );
}

export default Dashboard;