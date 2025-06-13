import { useState } from "react";
import api from '../utils/api';

export default function Spin() {
    const [wager, setWager] = useState(0);
    const [datas, setData] = useState([]);
    const [error, setError] = useState(null);

    const handleSpin = async () => {
        await api.post('/game/spin', { wager }).then((res) => setData(res.data)).catch((err) => setError(err.response.data.error));
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <input
                type="number"
                value={wager}
                onChange={(e) => setWager(e.target.value)}
                placeholder="Enter wager"
                className="border p-2 rounded w-full mb-4"
            />
            <button
                onClick={handleSpin}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Spin
            </button>

            {datas && (
                <div className="mt-4 text-center">
                    <p className="text-2xl">{datas.result}</p>
                    <p className="mt-2 text-green-600 font-semibold">Win: {datas.win}</p>
                    <p className="mt-1">Balance: {datas.balance}</p>
                    {/* {result.isFreeSpin && <p className="mt-2 text-yellow-500">🎁 Free Spin!</p>} */}
                    {error ? <p className="mt-2 text-red-700">{error}</p> : null}
                </div>
            )}
        </div>
    );
}
