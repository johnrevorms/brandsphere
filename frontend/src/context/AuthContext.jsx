/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const res = await api.get('/user');
        setUser(res.data);
      } catch {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
  }, []);

  useEffect(() => {
    const handleForcedLogout = () => {
      setUser(null);
    };

    window.addEventListener('auth:logout', handleForcedLogout);

    return () => window.removeEventListener('auth:logout', handleForcedLogout);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    sessionStorage.setItem('token', res.data.access_token);
    sessionStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.error(e);
    } finally {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, checkAuth }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
