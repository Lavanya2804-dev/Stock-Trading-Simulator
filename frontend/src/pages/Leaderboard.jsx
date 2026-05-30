import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";

function Leaderboard() {

  const [leaders, setLeaders] =
    useState([]);

  const fetchLeaderboard =
    async () => {

      try {

        const { data } =
          await api.get(
            "/leaderboard"
          );

        setLeaders(data);

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchLeaderboard();

  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Leaderboard
        </h1>

        <div className="bg-white shadow rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">

              <tr>

                <th className="p-4">
                  Rank
                </th>

                <th className="p-4">
                  User
                </th>

                <th className="p-4">
                  Balance
                </th>

                <th className="p-4">
                  Portfolio
                </th>

                <th className="p-4">
                  Profit/Loss
                </th>

                <th className="p-4">
                  Total Value
                </th>

              </tr>

            </thead>

            <tbody>

              {leaders.map(
                (user, index) => (

                  <tr
                    key={user._id}
                    className="border-b"
                  >

                    <td className="p-4 font-bold">
                      #{index + 1}
                    </td>

                    <td className="p-4">
                      {user.name}
                    </td>

                    <td className="p-4">
                      ${user.balance}
                    </td>

                    <td className="p-4">
                      $
                      {user.portfolioValue}
                    </td>

                    <td
                      className={`p-4 font-bold ${
                        user.profitLoss >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      $
                      {user.profitLoss}
                    </td>

                    <td className="p-4 font-bold">
                      $
                      {user.totalValue}
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

export default Leaderboard;