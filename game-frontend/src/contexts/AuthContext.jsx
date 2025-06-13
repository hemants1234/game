import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');

  const login = (accessToken) => {
    setToken(accessToken);
    console.log('Login successful, token set:', accessToken);
    localStorage.setItem('accessToken', accessToken);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
