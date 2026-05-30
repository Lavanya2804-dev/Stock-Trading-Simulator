import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import api from "../api/axios";

import Navbar from "../components/Navbar";


function Admin() {

  const [users, setUsers] =
    useState([]);

  const [stocks, setStocks] =
    useState([]);

  const [formData, setFormData] =
    useState({
      symbol: "",
      companyName: "",
      currentPrice: "",
    });


  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const { data } =
        await api.get(
          "/admin/users"
        );

      setUsers(data);

    } catch (error) {

      console.log(error);

    }
  };


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


  useEffect(() => {

    fetchUsers();

    fetchStocks();

  }, []);


  // ADD STOCK
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/admin/stocks",
          formData
        );

        toast.success(
          "Stock Added"
        );

        setFormData({
          symbol: "",
          companyName: "",
          currentPrice: "",
        });

        fetchStocks();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message
        );

      }
    };


  // DELETE STOCK
  const handleDelete =
    async (id) => {

      try {

        await api.delete(
          `/admin/stocks/${id}`
        );

        toast.success(
          "Stock Deleted"
        );

        fetchStocks();

      } catch (error) {

        console.log(error);

      }
    };


  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Admin Panel
        </h1>


        {/* ADD STOCK */}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-5 mb-8"
        >

          <h2 className="text-2xl font-bold mb-4">
            Add Stock
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Symbol"
              value={formData.symbol}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  symbol:
                    e.target.value,
                })
              }
              className="border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Company Name"
              value={
                formData.companyName
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  companyName:
                    e.target.value,
                })
              }
              className="border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Price"
              value={
                formData.currentPrice
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentPrice:
                    e.target.value,
                })
              }
              className="border p-3 rounded"
            />

          </div>

          <button
            className="mt-4 bg-black text-white px-6 py-3 rounded"
          >
            Add Stock
          </button>

        </form>


        {/* USERS */}

        <div className="bg-white shadow rounded-xl p-5 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Users
          </h2>

          {users.map((user) => (

            <div
              key={user._id}
              className="border-b py-3 flex justify-between"
            >

              <span>
                {user.name}
              </span>

              <span>
                ${user.balance}
              </span>

            </div>
          ))}

        </div>


        {/* STOCKS */}

        <div className="bg-white shadow rounded-xl p-5">

          <h2 className="text-2xl font-bold mb-4">
            Manage Stocks
          </h2>

          {stocks.map((stock) => (

            <div
              key={stock._id}
              className="border-b py-3 flex justify-between items-center"
            >

              <div>

                <p className="font-bold">
                  {stock.symbol}
                </p>

                <p>
                  {
                    stock.companyName
                  }
                </p>

              </div>

              <button
                onClick={() =>
                  handleDelete(
                    stock._id
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default Admin;