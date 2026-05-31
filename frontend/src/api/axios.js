import axios from "axios";

const api = axios.create({
  baseURL: "https://stock-trading-simulator-dcor.onrender.com/api",

  withCredentials: true,
});

export default api;