import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Balance() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    api.get('/game/balance').then(res => setBalance(res.data.balance));
  }, []);

  return <p>Current Balance: ${balance}</p>;
}
