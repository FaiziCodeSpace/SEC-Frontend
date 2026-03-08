import { createContext, useContext, useState, useEffect } from 'react';
import api from '../src/services/api/api.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.post('/auth/refresh');
        setUser(data.user);
      } catch (err) {
        console.warn("Auth check failed, user is unauthenticated");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  const isSuper = user?.role === "superadmin";
  const isSalesman = user?.role === "salesman";
  const isApprovedSalesman = isSalesman && user?.status === "approved";
  const canAccess = isAdmin || isApprovedSalesman;
  return (
    <AuthContext.Provider value={{
      user, login, logout, loading,
      isAdmin, isSuper, isApprovedSalesman, canAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);