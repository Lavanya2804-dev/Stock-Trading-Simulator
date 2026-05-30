import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import {
  useAuth,
} from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import Watchlist from "./pages/Watchlist";
import Admin from "./pages/Admin";
import Insights from "./pages/Insights";
import StockDetails from "./pages/StockDetails";
import AdminAnalytics from "./pages/AdminAnalytics";
import Leaderboard from "./pages/Leaderboard";
import Notifications from "./pages/Notifications";
import PriceAlerts from "./pages/PriceAlerts";
import AdminUsers from "./pages/AdminUsers";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import Orders from "./pages/Orders";

function App() {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {

    return (
      <h1 className="text-center mt-10 text-2xl">
        Loading...
      </h1>
    );

  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "70px",
          },
        }}
      />

      <Routes>

        {/* LANDING PAGE */}
        <Route
          path="/"
          element={
            !user
              ? <LandingPage />
              : <Navigate to="/dashboard" />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !user
              ? <Login />
              : <Navigate to="/dashboard" />
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            !user
              ? <Register />
              : <Navigate to="/dashboard" />
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        />

        {/* PORTFOLIO */}
        <Route
          path="/portfolio"
          element={
            user
              ? <Portfolio />
              : <Navigate to="/login" />
          }
        />

        {/* TRANSACTIONS */}
        <Route
          path="/transactions"
          element={
            user
              ? <Transactions />
              : <Navigate to="/login" />
          }
        />

        {/* WATCHLIST */}
        <Route
          path="/watchlist"
          element={
            user
              ? <Watchlist />
              : <Navigate to="/login" />
          }
        />

        {/* INSIGHTS */}
        <Route
          path="/insights"
          element={
            user
              ? <Insights />
              : <Navigate to="/login" />
          }
        />

        {/* STOCK DETAILS */}
        <Route
          path="/stocks/:symbol"
          element={
            user
              ? <StockDetails />
              : <Navigate to="/login" />
          }
        />

        {/* LEADERBOARD */}
        <Route
          path="/leaderboard"
          element={
            user
              ? <Leaderboard />
              : <Navigate to="/login" />
          }
        />

        {/* NOTIFICATIONS */}
        <Route
          path="/notifications"
          element={
            user
              ? <Notifications />
              : <Navigate to="/login" />
          }
        />

        {/* ALERTS */}
        <Route
          path="/alerts"
          element={
            user
              ? <PriceAlerts />
              : <Navigate to="/login" />
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            user
              ? <Profile />
              : <Navigate to="/login" />
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            user?.isAdmin
              ? <Admin />
              : <Navigate to="/dashboard" />
          }
        />

        {/* ADMIN ANALYTICS */}
        <Route
          path="/admin/analytics"
          element={
            user?.isAdmin
              ? <AdminAnalytics />
              : <Navigate to="/dashboard" />
          }
        />

        {/* ADMIN USERS */}
        <Route
          path="/admin/users"
          element={
            user?.isAdmin
              ? <AdminUsers />
              : <Navigate to="/dashboard" />
          }
        />

        <Route
  path="/orders"
  element={
    user
      ? <Orders />
      : <Navigate to="/login" />
  }
/>

      </Routes>
    </>
  );
}

export default App;