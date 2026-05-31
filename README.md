# 📈 Stock Trading Simulator

A full-stack Stock Trading Simulator built with the MERN Stack that allows users to buy and sell stocks using virtual money, track portfolio performance, receive real-time updates, and compete with other users through leaderboards.

## 🚀 Live Demo

Frontend: https://stock-trading-simulator-lake.vercel.app

Backend API: https://stock-trading-simulator-dcor.onrender.com

---

## ✨ Features

### 👤 User Authentication

* User Registration & Login
* JWT Authentication
* Secure Cookie-Based Sessions
* Protected Routes
* User Profile Management

### 📊 Stock Market Simulation

* Real-Time Stock Price Updates
* Simulated Market Fluctuations
* Live Data Updates using Socket.IO
* Stock Search & Tracking

### 💼 Portfolio Management

* Buy Stocks
* Sell Stocks
* Portfolio Overview
* Holdings Tracking
* Average Purchase Price Calculation

### 📝 Transactions

* Transaction History
* Buy/Sell Records
* Profit & Loss Tracking

### ⭐ Watchlist

* Add Stocks to Watchlist
* Remove Stocks from Watchlist
* Monitor Favorite Stocks

### 🔔 Notifications & Alerts

* Real-Time Notifications
* Price Alert System
* User Notification Preferences

### 🏆 Leaderboard

* User Rankings
* Portfolio Value Comparison
* Competitive Trading Environment

### 📈 Analytics & Insights

* Portfolio Analytics
* Investment Insights
* Performance Tracking
* Market Statistics

### 🛠️ Admin Panel

* User Management
* Block/Unblock Users
* Platform Analytics
* Administrative Dashboard

### 📦 Order Management

* Place Buy Orders
* Place Sell Orders
* Order Matching System
* Pending & Completed Orders

---

## 🏗️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Hook Form
* React Hot Toast
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Cookie Parser
* Socket.IO

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

## 📂 Project Structure

### Frontend

```bash
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── socket/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

### Backend

```bash
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
└── package.json
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Lavanya2804-dev/Stock-Trading-Simulator.git
cd Stock-Trading-Simulator
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🎯 Key Learning Outcomes

* Full Stack MERN Development
* Authentication & Authorization
* Real-Time Communication using Socket.IO
* REST API Development
* MongoDB Data Modeling
* State Management with React Context
* Deployment using Vercel and Render
* Portfolio and Trading Logic Implementation

---

## 🔮 Future Enhancements

* Limit Orders
* Stop Loss Orders
* Candlestick Charts
* Historical Market Data
* Advanced Trading Engine
* AI-Powered Investment Insights
* Multi-Currency Support

---

## 👩‍💻 Author

**Lakshmi Lavanya**

GitHub: https://github.com/Lavanya2804-dev

LinkedIn:https://www.linkedin.com/in/sanneboyana-lakshmi-lavanya-6a0a842b3/

