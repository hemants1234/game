import { Transaction } from "../models/transactions.model.js";
import { User } from "../models/user.model.js";
import redisClient from '../services/redis.js'; // ioredis instance
//const mongoose = require('mongoose');
import { symbols } from '../utils/Symbols.js';
import { spinReel } from '../utils/Spin.js';
import { asyncHandler } from "../utils/asyncHandler.js";

// get Spin

const handleSpin = asyncHandler(async (req, res) => {
  const { wager } = req.body;
  const userId = req.user._id;

  if (!wager || wager <= 0) return res.status(400).json({ error: 'Invalid wager' });

  const user = await User.findById(userId);
  if (!user || user.balance < wager) return res.status(400).json({ error: 'Insufficient balance' });

  // Simulate 3 reels
  const result = [spinReel(), spinReel(), spinReel()];

  // Determine win
  const isMatch = result.every((s) => s === result[0]);
  const matchedSymbol = symbols.find(s => s.emoji === result[0]);
  const win = isMatch ? wager * (matchedSymbol?.payout || 0) : 0;

  // Update balance
  user.balance = user.balance - wager + win;
  await user.save();

  // Save transaction
  await Transaction.create({
    userId,
    wager,
    win,
    result,
  });

  res.json({ result, win, balance: user.balance });

})

// 💰 GET /balance
const getBalance = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('balance');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ balance: user.balance });
})

// 📜 GET /transactions?page=&limit= 
const getTransactions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;


  const aggregate = Transaction.aggregate([
    { $match: { userId: req.user._id } },
    { $sort: { createdAt: -1 } }
  ]);

  const options = {
    page: parseInt(page),
    limit: parseInt(limit)
  };

  const result = await Transaction.aggregatePaginate(aggregate, options);

  res.json({
    page: result.page,
    totalPages: result.totalPages,
    totalTransactions: result.totalDocs,
    transactions: result.docs
  });


})

// 🏆 GET /leaderboard?days=7
const getLeaderboard = asyncHandler(async (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const cacheKey = `leaderboard:${days}`;

   const cached = await redisClient.get(cacheKey);
   if (cached) return res.json(JSON.parse(cached));

  const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const result = await Transaction.aggregate([
    { $match: { createdAt: { $gte: sinceDate } } },
    {
      $group: {
        _id: '$userId',
        totalWin: { $sum: '$win' },
        totalWager: { $sum: '$wager' },
        net: { $sum: { $subtract: ['$win', '$wager'] } }
      }
    },
    { $sort: { net: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        totalWin: 1,
        totalWager: 1,
        net: 1,  
        email: { $arrayElemAt: ['$user.email', 0] }
      }
    }

  ]);

  await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 120);
  res.json(result);
})


export {
  handleSpin,
  getBalance,
  getTransactions,
  getLeaderboard
}

























/*
// 🏆 GET /leaderboard?days=7
exports.getLeaderboard = async (req, res) => {
  const days = parseInt(req.query.days) || 7;
 // const cacheKey = `leaderboard:${days}`;

  //const cached = await redis.get(cacheKey);
  //if (cached) return res.json(JSON.parse(cached));

  const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const result = await Transaction.aggregate([
    { $match: { createdAt: { $gte: sinceDate } } },
    {
      $group: {
        _id: '$userId',
        totalWin: { $sum: '$win' },
        totalWager: { $sum: '$wager' },
        net: { $sum: { $subtract: ['$win', '$wager'] } }
      }
    },
    { $sort: { net: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        net,
        email: { $arrayElemAt: ['$user.email', 0] }
      }
    }
  ]);

  //await redis.set(cacheKey, JSON.stringify(result), 'EX', 120);
  res.json(result);
};

*/




/*exports.getTransactions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const transactions = await Transaction.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.json({ transactions });
};*/




/*exports.getBalance = async (req, res) => {
  const user = await User.findById(req.user.id).select('balance');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ balance: user.balance });
};*/


/*exports.handleSpin = async (req, res) => {
  const { wager } = req.body;
  const userId = req.user.id;

  if (!wager || wager <= 0) return res.status(400).json({ error: 'Invalid wager' });

  const user = await User.findById(userId);
  if (!user || user.balance < wager) return res.status(400).json({ error: 'Insufficient balance' });

  // Simulate 3 reels
  const result = [spinReel(), spinReel(), spinReel()];

  // Determine win
  const isMatch = result.every((s) => s === result[0]);
  const matchedSymbol = symbols.find(s => s.emoji === result[0]);
  const win = isMatch ? wager * (matchedSymbol?.payout || 0) : 0;

  // Update balance
  user.balance = user.balance - wager + win;
  await user.save();

  // Save transaction
  await Transaction.create({
    userId,
    wager,
    win,
    result,
  });

  res.json({ result, win, balance: user.balance });
};*/