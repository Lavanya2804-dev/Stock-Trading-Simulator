import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";


function Transactions() {

  const [transactions, setTransactions] =
    useState([]);


  const fetchTransactions =
    async () => {

      try {

        const { data } =
          await api.get(
            "/transactions"
          );

        setTransactions(data);

      } catch (error) {

        console.log(error);

      }
    };


  useEffect(() => {
    fetchTransactions();
  }, []);


  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Transaction History
        </h1>

        <div className="bg-white shadow rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">

              <tr>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-left">
                  Symbol
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((tx) => (

                <tr
                  key={tx._id}
                  className="border-b"
                >

                  <td
                    className={`p-4 font-bold ${
                      tx.type === "BUY"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {tx.type}
                  </td>

                  <td className="p-4">
                    {tx.stock.symbol}
                  </td>

                  <td className="p-4">
                    {tx.quantity}
                  </td>

                  <td className="p-4">
                    ${tx.price}
                  </td>

                  <td className="p-4">
                    {new Date(
                      tx.createdAt
                    ).toLocaleString()}
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

export default Transactions;