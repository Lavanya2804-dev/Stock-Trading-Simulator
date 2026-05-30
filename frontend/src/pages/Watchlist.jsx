import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";

import socket from "../socket/socket";

function Watchlist() {

  const [watchlist, setWatchlist] =
    useState([]);

  const [search, setSearch] =
    useState("");


  // FETCH WATCHLIST
  const fetchWatchlist =
    async () => {

      try {

        const { data } =
          await api.get(
            "/watchlist"
          );

        setWatchlist(data);

      } catch (error) {

        console.log(error);

      }
    };


  useEffect(() => {

    fetchWatchlist();

  }, []);


  // LIVE STOCK UPDATES
  useEffect(() => {

    socket.on(
      "stockUpdated",
      (updatedStock) => {

        setWatchlist((prev) =>

          prev.map((item) =>

            item.stock &&
            item.stock._id ===
            updatedStock._id

              ? {
                  ...item,
                  stock: updatedStock,
                }

              : item
          )
        );
      }
    );

    return () => {

      socket.off(
        "stockUpdated"
      );

    };

  }, []);


  // REMOVE WATCHLIST
  const removeWatchlist =
    async (id) => {

      try {

        await api.delete(
          `/watchlist/${id}`
        );

        fetchWatchlist();

      } catch (error) {

        console.log(error);

      }
    };


  // FILTER WATCHLIST
  const filteredWatchlist =
    watchlist.filter((item) => {

      if (!item.stock)
        return false;

      return (

        item.stock.symbol
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.stock.companyName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );

    });


  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Watchlist
        </h1>


        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search watchlist..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-xl
            w-full
            mb-6
            shadow-sm
            focus:outline-none
          "
        />


        {/* ANALYTICS CARDS */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
          mb-8
        ">

          {/* TOTAL */}
          <div className="
            bg-white
            shadow
            rounded-2xl
            p-5
          ">

            <h2 className="text-gray-500">
              Total Stocks
            </h2>

            <p className="
              text-3xl
              font-bold
              mt-2
            ">

              {
                watchlist.filter(
                  (item) =>
                    item.stock
                ).length
              }

            </p>

          </div>


          {/* GAINERS */}
          <div className="
            bg-white
            shadow
            rounded-2xl
            p-5
          ">

            <h2 className="text-gray-500">
              Gainers
            </h2>

            <p className="
              text-3xl
              font-bold
              text-green-500
              mt-2
            ">

              {
                watchlist.filter(
                  (item) =>

                    item.stock &&

                    item.stock
                      .changePercent > 0

                ).length
              }

            </p>

          </div>


          {/* LOSERS */}
          <div className="
            bg-white
            shadow
            rounded-2xl
            p-5
          ">

            <h2 className="text-gray-500">
              Losers
            </h2>

            <p className="
              text-3xl
              font-bold
              text-red-500
              mt-2
            ">

              {
                watchlist.filter(
                  (item) =>

                    item.stock &&

                    item.stock
                      .changePercent < 0

                ).length
              }

            </p>

          </div>

        </div>


        {/* WATCHLIST GRID */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-5
        ">

          {filteredWatchlist
            .filter(
              (item) =>
                item.stock
            )
            .map((item) => (

              <div
                key={item._id}
                className="
                  bg-white
                  rounded-2xl
                  shadow
                  p-5
                  hover:shadow-lg
                  transition
                "
              >

                <h2 className="
                  text-2xl
                  font-bold
                ">
                  {item.stock.symbol}
                </h2>

                <p className="
                  text-gray-500
                  mt-1
                ">
                  {
                    item.stock
                      .companyName
                  }
                </p>


                <p className="
                  mt-4
                  text-2xl
                  font-bold
                ">

                  $
                  {
                    item.stock
                      .currentPrice
                      ?.toFixed(2)
                  }

                </p>


                <p
                  className={`
                    mt-2
                    font-bold
                    text-lg
                    ${
                      item.stock
                        .changePercent >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  `}
                >

                  {
                    item.stock
                      .changePercent
                      ?.toFixed(2)
                  }%

                </p>


                {/* ACTIONS */}
                <div className="
                  flex
                  gap-3
                  mt-5
                ">

                  <button
                    className="
                      bg-black
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      hover:bg-gray-800
                    "
                  >
                    Buy
                  </button>


                  <button
                    onClick={() =>
                      removeWatchlist(
                        item._id
                      )
                    }
                    className="
                      bg-red-500
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      hover:bg-red-600
                    "
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

        </div>

      </div>
    </>
  );
}

export default Watchlist;