import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Spin from './pages/Spin';
import Balance from './pages/Balance';
import Leaderboard from './pages/Leaderboard';
import Transactions from './pages/Transactions';
import PrivateRoute from './components/PrivateRoute';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route
            path="/spin"
            element={
              <PrivateRoute>
                <Spin />
              </PrivateRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <Balance />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            }
          />

        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
