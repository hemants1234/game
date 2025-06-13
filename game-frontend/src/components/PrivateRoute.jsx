import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  console.log('PrivateRoute token:', token);
  return token ? children : <Navigate to="/" replace />;
}
