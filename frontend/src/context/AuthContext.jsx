import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import socket from "../socket/socket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // GET PROFILE
  const fetchProfile = async () => {

    try {

      const { data } = await api.get(
        "/auth/profile"
      );

      setUser(data);

      socket.emit(
  "joinUserRoom",
  data._id
);

   } catch (error) {

  // USER NOT LOGGED IN
  if (error.response?.status !== 401) {
    console.log(error);
  }

  setUser(null);
    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);


  // REGISTER
  const register = async (formData) => {

    const { data } = await api.post(
      "/auth/register",
      formData
    );

    setUser(data);

    socket.emit(
  "joinUserRoom",
  data._id
);
  };


  // LOGIN
  const login = async (formData) => {

    const { data } = await api.post(
      "/auth/login",
      formData
    );

    setUser(data);

    socket.emit(
  "joinUserRoom",
  data._id
);
  };


  // LOGOUT
  const logout = async () => {

    await api.post("/auth/logout");

    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};