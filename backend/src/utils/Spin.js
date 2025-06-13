import { symbols } from './Symbols.js';

export const spinReel = () => {
  const totalWeight = symbols.reduce((acc, s) => acc + s.weight, 0);
  const rand = Math.random() * totalWeight;
  let cumulative = 0;
  for (const sym of symbols) {
    cumulative += sym.weight;
    if (rand < cumulative) return sym.emoji;
  }
};