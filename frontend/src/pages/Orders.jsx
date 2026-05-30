import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";

import toast from "react-hot-toast";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [stock, setStock] =
    useState("");

  const [orderType,
    setOrderType] =
      useState("BUY");

  const [quantity,
    setQuantity] =
      useState("");

  const [price, setPrice] =
    useState("");


  const fetchOrders =
    async () => {

      const { data } =
        await api.get(
          "/orders"
        );

      setOrders(data);
    };


  useEffect(() => {

    fetchOrders();

  }, []);


  const placeOrder =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/orders",
          {
            stock,
            orderType,
            quantity,
            price,
          }
        );

        toast.success(
          "Order placed"
        );

        fetchOrders();

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
          Orders
        </h1>

        <form
          onSubmit={placeOrder}
          className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
        >

          <input
            type="text"
            placeholder="Stock ID"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
            className="border p-3 rounded w-full"
          />

          <select
            value={orderType}
            onChange={(e) =>
              setOrderType(
                e.target.value
              )
            }
            className="border p-3 rounded w-full"
          >

            <option value="BUY">
              BUY
            </option>

            <option value="SELL">
              SELL
            </option>

          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            className="border p-3 rounded w-full"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            className="border p-3 rounded w-full"
          />

          <button
            className="bg-black text-white px-6 py-3 rounded"
          >
            Place Order
          </button>

        </form>


        <div className="space-y-4">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white shadow rounded-xl p-4"
            >

              <h2 className="font-bold">
                {
                  order.stock
                    ?.symbol
                }
              </h2>

              <p>
                {order.orderType}
              </p>

              <p>
                Qty:
                {order.quantity}
              </p>

              <p>
                Price:
                ${order.price}
              </p>

              <p>
                Status:
                {order.status}
              </p>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Orders;