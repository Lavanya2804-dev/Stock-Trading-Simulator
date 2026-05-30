import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import {
  FaBell,
  FaBars,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import socket from "../socket/socket";

import toast from "react-hot-toast";

function Navbar() {

  const {
    logout,
    user,
  } = useAuth();

  const navigate =
    useNavigate();

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);


  // LOGOUT
  const handleLogout =
    async () => {

      await logout();

      navigate("/login");
    };


  // FETCH NOTIFICATIONS
  const fetchNotifications =
    async () => {

      try {

        const { data } =
          await api.get(
            "/notifications"
          );

        const unread =
          data.filter(
            (n) => !n.isRead
          ).length;

        setUnreadCount(
          unread
        );

      } catch (error) {

        console.log(error);

      }
    };


  // INITIAL FETCH
  useEffect(() => {

    if (!user?.isAdmin) {

      fetchNotifications();

    }

  }, [user]);


  // SOCKET NOTIFICATIONS
  useEffect(() => {

    if (user?.isAdmin)
      return;

    socket.on(
      "newNotification",
      (data) => {

        if (
          user?.notificationsEnabled
        ) {

          toast.success(
            data.message
          );

          setUnreadCount(
            (prev) =>
              prev + 1
          );

        }

      }
    );

    return () => {

      socket.off(
        "newNotification"
      );

    };

  }, [user]);


  return (

    <nav
      className="
        bg-black
        text-white
        px-6
        py-4
        flex
        justify-between
        items-center
        shadow-lg
      "
    >

      {/* LOGO */}
      <h1
        className="
          text-3xl
          font-bold
          text-green-400
        "
      >
        TradeX
      </h1>


      {/* DESKTOP MENU */}
      <div
        className="
          hidden
          lg:flex
          items-center
          gap-8
          font-medium
        "
      >

        <Link to="/">
          Dashboard
        </Link>


        {!user?.isAdmin && (
          <>

            <Link to="/portfolio">
              Portfolio
            </Link>

            <Link to="/transactions">
              Transactions
            </Link>

            <Link to="/watchlist">
              Watchlist
            </Link>

            <Link to="/orders">
            Orders
            </Link>


            <Link to="/insights">
              Insights
            </Link>

            <Link to="/leaderboard">
              Leaderboard
            </Link>

            <Link to="/alerts">
              Alerts
            </Link>

          </>
        )}


        {user?.isAdmin && (
          <>

            <Link to="/admin">
              Admin
            </Link>

            <Link to="/admin/analytics">
              Analytics
            </Link>

            <Link to="/admin/users">
              Users
            </Link>

          </>
        )}


        {/* BELL */}
        {!user?.isAdmin && (

          <Link
            to="/notifications"
            className="
              relative
            "
          >

            <FaBell
              className="
                text-2xl
              "
            />

            {unreadCount > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-red-500
                  text-white
                  text-xs
                  rounded-full
                  px-1
                "
              >
                {unreadCount}
              </span>

            )}

          </Link>

        )}


        {/* PROFILE */}
        <Link
          to="/profile"
          className="
            bg-gray-800
            px-4
            py-2
            rounded-lg
            hover:bg-gray-700
          "
        >
          Profile
        </Link>


        {/* LOGOUT */}
        <button
          onClick={
            handleLogout
          }
          className="
            bg-red-500
            px-4
            py-2
            rounded-lg
            hover:bg-red-600
          "
        >
          Logout
        </button>

      </div>


      {/* MOBILE BUTTON */}
      <button
        className="
          lg:hidden
          text-2xl
        "
        onClick={() =>
          setMenuOpen(
            !menuOpen
          )
        }
      >

        <FaBars />

      </button>


      {/* MOBILE MENU */}
      {menuOpen && (

        <div
          className="
            absolute
            top-16
            left-0
            w-full
            bg-black
            flex
            flex-col
            gap-5
            p-6
            z-50
            lg:hidden
          "
        >

          <Link to="/">
            Dashboard
          </Link>

          {!user?.isAdmin && (
            <>

              <Link to="/portfolio">
                Portfolio
              </Link>

              <Link to="/transactions">
                Transactions
              </Link>

              <Link to="/watchlist">
                Watchlist
              </Link>

              <Link to="/orders">Orders</Link>

              <Link to="/insights">
                Insights
              </Link>

              <Link to="/leaderboard">
                Leaderboard
              </Link>

              <Link to="/alerts">
                Alerts
              </Link>

              <Link to="/notifications">
                Notifications
              </Link>

            </>
          )}

          {user?.isAdmin && (
            <>

              <Link to="/admin">
                Admin
              </Link>

              <Link to="/admin/analytics">
                Analytics
              </Link>

              <Link to="/admin/users">
                Users
              </Link>

            </>
          )}

          <Link to="/profile">
            Profile
          </Link>

          <button
            onClick={
              handleLogout
            }
            className="
              bg-red-500
              px-4
              py-2
              rounded-lg
            "
          >
            Logout
          </button>

        </div>

      )}

    </nav>
  );
}

export default Navbar;