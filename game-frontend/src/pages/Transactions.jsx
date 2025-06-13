import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Transactions() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`/game/transactions?page=${page}&limit=10`)
      .then(res => setData(res.data.transactions));
  }, [page]);

  return (
    <div>
      <h3>Transaction History</h3>
      <ul>
        {data.length == 0 ?<h1>Data is not here !!!</h1> :data.map((t, i) => (
          <li key={i}>
            {t.result.join(' ')} | Wager: {t.wager} | Win: {t.win} | {new Date(t.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
      <div className='flex flex-row justify-between w-1/4'>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
         <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
