import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../utils/api';


const Navbar = () => {

const { logout } = useContext(AuthContext);
    
const logouts = async() => {
     await api.post('/users/auth/logout', {  }).then((res) => console.log(res.data)).catch((err) => console.log(err.response.data.error));
     logout();
     localStorage.removeItem('accessToken');
  }

  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">
      <Link to="/spin" className="hover:text-yellow-400">🎰 Spin</Link>
      <Link to="/balance" className="hover:text-yellow-400">💰 Balance</Link>
      <Link to="/transactions" className="hover:text-yellow-400">📜 Transactions</Link>
      <Link to="/leaderboard" className="hover:text-yellow-400">🏆 Leaderboard</Link>
      <Link to="/" className="ml-auto hover:text-red-400" onClick={logouts}>Logout</Link>
    </nav>
  );
};

export default Navbar;
