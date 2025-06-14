# Project Name

Full Stack – Casino Slot Game

---

## 🚀 Features

1. 🔐 User Authentication (JWT)
Register endpoint: POST /auth/register

Store user data securely (hashed password)

Login endpoint: POST /auth/login

Return a JWT token

JWT Middleware to protect sensitive routes like /spin, /balance

2. 🎰 Slot Machine Spin Logic
POST /spin

Accepts a wager

Simulates spinning a 3-reel slot (with symbols and weights)

Calculates win/loss

Deducts wager or adds winnings to balance

Saves result as a transaction in MongoDB

3. 💰 Balance and Transaction History
GET /balance

Shows current user balance

GET /transactions?page=&limit=

Paginated view of past spin history

Must be queryable and indexable by user and time

4. 🏆 Leaderboard (with Redis Cache)
GET /leaderboard?days=7

Shows top 10 users by net win in past N days

Uses MongoDB aggregation to calculate scores

Caches result in Redis (Upstash) for 2 minutes

---

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express  
**Auth:** JWT  
**Database:** MongoDB
**Cache:** Redis (node-redis)
**Other Tools:** Docker, Axios

---

## .env(provide value and add on root of our backend)

**PORT=?**
**DB_URI=?**
**CORS_ORIGIN=?**
**ACCESS_TOKEN_SECRET=?**
**REFRESH_TOKEN_SECRET=?** 
**ACCESS_TOKEN_EXPIRY=?** 
**REFRESH_TOKEN_EXPIRY=?** 
**REDIS_URL=?** ' 
**REDIS_TOKEN=?**

---
## 📦 Installation

Clone the project:

```bash
[https://github.com/hemants1234/game.git]
cd game
first goto backend and install node_module (npm install) then run on local using (npm run dev)
then goto game-frontend and install node_module (npm install) then run on local using (npm run dev)

