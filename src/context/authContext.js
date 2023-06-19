import { createContext, useEffect, useState } from "react";
import { axiosApi } from "../service/apiEnviornment";
import { useNavigate } from "react-router-dom";
import { retrieveData, storeData, removeData } from "../helper/storageHelper";

const defaultProvider = {
  user: null,
  error: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [error, setError] = useState(defaultProvider.null);
  const [isInitialized, setIsInitialized] = useState(
    defaultProvider.isInitialized
  );

  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true);
      const storedToken = retrieveData('token');
      const loggedInUser = retrieveData("user")
      if (storedToken && loggedInUser) {
        setLoading(false);
        setUser(loggedInUser);
        navigate('/dashboard/app')
      } else {
        setUser(null);
        setLoading(false);
        removeData("user");
        removeData("token")
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const resp = await axiosApi('post', '/auth/sign-in-employee', { ...data })
      if (resp) {
        console.log(resp)
        storeData('user', resp.user)
        storeData("token", resp.message)
        setUser(resp.user)
        setLoading(false)
        navigate('/dashboard/app', { replace: true })
      }
    } catch (err) {
      setLoading(false);
      setError(err);
      return Promise.reject(err);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    setIsInitialized(false);
    setLoading(null);
    navigate('/', { replace: true })
    removeData("user");
    removeData("token");
  };


  const values = {
    user,
    loading,
    error,
    setError,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
