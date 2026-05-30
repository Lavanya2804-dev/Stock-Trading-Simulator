import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";

function Notifications() {

  const [notifications,
    setNotifications] =
      useState([]);

  const fetchNotifications =
    async () => {

      try {

        const { data } =
          await api.get(
            "/notifications"
          );

        setNotifications(data);

      } catch (error) {

        console.log(error);

      }
    };

  const markRead =
    async (id) => {

      try {

        await api.put(
          `/notifications/${id}`
        );

        fetchNotifications();

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchNotifications();

  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Notifications
        </h1>

       <div className="space-y-4">

  {notifications.length === 0 ? (

    <div className="bg-white p-6 rounded-xl shadow text-center">

      <p className="text-gray-500 text-lg">
        No notifications yet
      </p>

    </div>

  ) : (

    notifications.map((n) => (

      <div
        key={n._id}
        className={`p-4 rounded-xl shadow ${
          n.isRead
            ? "bg-gray-100"
            : "bg-blue-100"
        }`}
      >

        <p className="font-semibold">
          {n.message}
        </p>

        <p className="text-sm text-gray-500">
          {new Date(
            n.createdAt
          ).toLocaleString()}
        </p>

        {!n.isRead && (

          <button
            onClick={() =>
              markRead(n._id)
            }
            className="mt-2 bg-black text-white px-4 py-2 rounded"
          >
            Mark as Read
          </button>

        )}

      </div>
    ))

  )}

</div>

      </div>
    </>
  );
}

export default Notifications;