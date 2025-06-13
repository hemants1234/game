import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Leaderboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
       api.get('/game/leaderboard?days=7').then((res) => setData(res.data));
    }, []);

    return (
        <div>
            <h2>🏆 Leaderboard</h2>
            <table className="table-auto border border-black border-collapse w-full">
                <thead>
                    <tr>
                        <th className="border border-black px-4 py-2">Email</th>
                        <th className="border border-black px-4 py-2">Net Win</th>
                        <th className="border border-black px-4 py-2">Total Win</th>
                        <th className="border border-black px-4 py-2">Total Wager</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length == 0 ? <tr className='flex items-center justify-center '>data is not here !!!</tr> : data.map((u, i) => (
                        <tr key={i}>
                            <td className="border border-black px-4 py-2">{u.email}</td>
                            <td className="border border-black px-4 py-2">{u.net}</td>
                            <td className="border border-black px-4 py-2">{u.totalWin}</td>
                            <td className="border border-black px-4 py-2">{u.totalWager}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
