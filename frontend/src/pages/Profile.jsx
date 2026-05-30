import {
  useState,
  useEffect,
} from "react";

import Navbar from "../components/Navbar";

import {
  useAuth,
} from "../context/AuthContext";

import api from "../api/axios";

import toast from "react-hot-toast";

import {
  FaUserCircle,
  FaMoon,
  FaLock,
  FaBell,
  FaTrash,
} from "react-icons/fa";


function Profile() {

  const { user } =
    useAuth();

  const [activeTab,
    setActiveTab] =
      useState("profile");

  const [name,
    setName] =
      useState(
        user?.name || ""
      );

  const [password,
    setPassword] =
      useState("");

  const [darkMode,
    setDarkMode] =
      useState(false);

  const [notifications,
    setNotifications] =
      useState(
        user?.notificationsEnabled
      );

      useEffect(() => {

  if (darkMode) {

    document.documentElement.classList.add(
      "dark"
    );

  } else {

    document.documentElement.classList.remove(
      "dark"
    );

  }

}, [darkMode]);


  // UPDATE PROFILE
  const updateProfile =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await api.put(
            "/auth/update-profile",
            { name }
          );

        toast.success(
          data.message
        );

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

      }
    };


  // CHANGE PASSWORD
  const changePassword =
    async (e) => {

      e.preventDefault();

      try {

        await api.put(
          "/auth/change-password",
          { password }
        );

        toast.success(
          "Password Updated"
        );

        setPassword("");

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

      }
    };


  // DELETE ACCOUNT
  const deleteAccount =
    async () => {

      const confirmDelete =
        window.confirm(
          "Delete your account permanently?"
        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(
          "/auth/delete-account"
        );

        toast.success(
          "Account Deleted"
        );

        window.location.href =
          "/register";

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

      }
    };


  return (
    <>

      <Navbar />

        <div
  className="
    min-h-screen
    bg-gray-100
    dark:bg-gray-900
    text-black
    dark:text-white
    p-6
    transition-all
    duration-300
  "
>

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            md:grid-cols-4
            gap-6
          "
        >

          {/* SIDEBAR */}
          <div
            className="
            bg-white dark:bg-gray-800
              rounded-2xl
              shadow-lg
              p-6
              h-fit
            "
          >

            <div
              className="
                flex
                flex-col
                items-center
                mb-8
              "
            >

              <FaUserCircle
                className="
                  text-7xl
                  text-gray-700
                "
              />

              <h2
                className="
                  mt-4
                  text-2xl
                  font-bold
                "
              >
                {user?.name}
              </h2>

            </div>


            <div
              className="
                flex
                flex-col
                gap-4
              "
            >

              <button
                onClick={() =>
                  setActiveTab(
                    "profile"
                  )
                }
                className="
                  text-left
                  font-medium
                "
              >
                Profile
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    "security"
                  )
                }
                className="
                  text-left
                  font-medium
                "
              >
                <FaLock className="inline mr-2" />
                Security
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    "appearance"
                  )
                }
                className="
                  text-left
                  font-medium
                "
              >
                <FaMoon className="inline mr-2" />
                Appearance
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    "notifications"
                  )
                }
                className="
                  text-left
                  font-medium
                "
              >
                <FaBell className="inline mr-2" />
                Notifications
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    "danger"
                  )
                }
                className="
                  text-left
                  text-red-500
                  font-medium
                "
              >
                <FaTrash className="inline mr-2" />
                Danger Zone
              </button>

            </div>

          </div>


          {/* CONTENT */}
          <div
            className="
              md:col-span-3
              bg-white dark:bg-gray-800
              rounded-2xl
              shadow-lg
              p-8
            "
          >

            {/* PROFILE */}
            {activeTab ===
              "profile" && (

              <form
                onSubmit={
                  updateProfile
                }
                className="
                  space-y-6
                "
              >

                <h1
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  Profile Settings
                </h1>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="
  w-full
  border
  border-gray-300
  dark:border-gray-700
  bg-white
  dark:bg-gray-900
  p-4
  rounded-xl
"
                />

                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="
                    w-full
                    border
                    p-4
                    rounded-xl
                    bg-gray-100 dark:bg-gray-900
                  "
                />

                <button
                  className="
                    bg-black
                    text-white
                    px-6
                    py-3
                    rounded-xl
                  "
                >
                  Save Changes
                </button>

              </form>

            )}


            {/* SECURITY */}
            {activeTab ===
              "security" && (

              <form
                onSubmit={
                  changePassword
                }
                className="
                  space-y-6
                "
              >

                <h1
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  Change Password
                </h1>

                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    p-4
                    rounded-xl
                  "
                />

                <button
                  className="
                    bg-black
                    text-white
                    px-6
                    py-3
                    rounded-xl
                  "
                >
                  Update Password
                </button>

              </form>

            )}


            {/* APPEARANCE */}
            {activeTab ===
              "appearance" && (

              <div
                className="
                  space-y-6
                "
              >

                <h1
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  Appearance
                </h1>

                <button
                  onClick={() =>
                    setDarkMode(
                      !darkMode
                    )
                  }
                  className="
                    bg-gray-800
                    text-white
                    px-6
                    py-3
                    rounded-xl
                  "
                >

                  {
                    darkMode
                      ? "Disable Dark Mode"
                      : "Enable Dark Mode"
                  }

                </button>

              </div>

            )}


            {/* NOTIFICATIONS */}
            {activeTab ===
              "notifications" && (

              <div
                className="
                  space-y-6
                "
              >

                <h1
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  Notifications
                </h1>

                <button
                  onClick={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                  className="
                    bg-blue-500
                    text-white
                    px-6
                    py-3
                    rounded-xl
                  "
                >

                  {
                    notifications
                      ? "Disable Notifications"
                      : "Enable Notifications"
                  }

                </button>

              </div>

            )}


            {/* DANGER ZONE */}
            {activeTab ===
              "danger" && (

              <div
                className="
                  space-y-6
                "
              >

                <h1
                  className="
                    text-3xl
                    font-bold
                    text-red-500
                  "
                >
                  Danger Zone
                </h1>

                <button
                  onClick={
                    deleteAccount
                  }
                  className="
                    bg-red-500
                    text-white
                    px-6
                    py-3
                    rounded-xl
                  "
                >
                  Delete Account
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default Profile;