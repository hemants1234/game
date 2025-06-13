import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, SetFullname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post('/users/auth/register', {
                fullname,
                email,
                username,
                password,
            });
            console.log(res.data);
            navigate('/');
        } catch (err) {
            console.error('Registration failed', err.response?.data?.message || err.message);
        }
    };

    return (
        <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10 p-6 bg-orange-300 shadow rounded">
            <h2 className="text-xl mb-4">Register</h2>
            <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => SetFullname(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
                required
            />
            <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded w-full">
                Register
            </button>
        </form>
    );
}
