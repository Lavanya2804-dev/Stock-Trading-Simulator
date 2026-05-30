import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";

import toast from "react-hot-toast";


function AdminUsers() {

  const [users, setUsers] =
    useState([]);


  // FETCH USERS
  const fetchUsers =
    async () => {

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


  // BLOCK USER
  const toggleBlock =
    async (id) => {

      try {

        const { data } =
          await api.put(
            `/admin/users/block/${id}`
          );

        toast.success(data.message);

        fetchUsers();

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );
      }
    };


  // DELETE USER
  const deleteUser =
    async (id) => {

      try {

        const { data } =
          await api.delete(
            `/admin/users/${id}`
          );

        toast.success(data.message);

        fetchUsers();

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );
      }
    };


  useEffect(() => {

    fetchUsers();

  }, []);


  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          User Management
        </h1>


        <div className="bg-white shadow rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {users
  .filter((user) => !user.isAdmin)
  .map((user) => (
                <tr
                  key={user._id}
                  className="border-b"
                >

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">

                    {user.isAdmin
                      ? "Admin"
                      : "User"}

                  </td>

                  <td className="p-4">

                    {user.isBlocked ? (

                      <span className="text-red-500 font-bold">
                        Blocked
                      </span>

                    ) : (

                      <span className="text-green-500 font-bold">
                        Active
                      </span>

                    )}

                  </td>


                  <td className="p-4 flex gap-2">

                    {!user.isAdmin && (

                      <>
                        <button
                          onClick={() =>
                            toggleBlock(
                              user._id
                            )
                          }
                          className={`px-4 py-2 rounded text-white ${
                            user.isBlocked
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        >

                          {user.isBlocked
                            ? "Unblock"
                            : "Block"}

                        </button>


                        <button
                          onClick={() =>
                            deleteUser(
                              user._id
                            )
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}

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

export default AdminUsers;