import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/users/auth/login', { email, password, username });
      login(data.data.accessToken);
      setHasLoggedIn(true); // mark as attempted
      console.log('Login successful', data.data.accessToken , hasLoggedIn);
    } catch (err) {
      console.error('Login error', err);
    }
  };

  useEffect(() => {
    if (hasLoggedIn && token) {
      console.log('Token updated, navigating to /spin');
      navigate('/spin');
    }
  }, [token, hasLoggedIn, navigate]);



    return (
        <div className="flex items-center justify-center h-screen ">
            <form
                className="bg-orange-300 p-10 rounded shadow-md flex flex-col space-y-4 w-full  max-w-sm"
                onSubmit={handleLogin}
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2  rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
