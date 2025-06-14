# 🎰 Project Name

**Full Stack – Casino Slot Game**

---

## 🚀 Features

1. **🔐 User Authentication (JWT)**  
   - **Register** endpoint: `POST /auth/register`  
     Stores user data securely (hashed password)  
   - **Login** endpoint: `POST /auth/login`  
     Returns a JWT token  
   - JWT Middleware to protect sensitive routes like `/spin`, `/balance`

2. **🎰 Slot Machine Spin Logic**  
   - `POST /spin`  
   - Accepts a wager  
   - Simulates spinning a 3-reel slot (with symbols and weights)  
   - Calculates win/loss  
   - Deducts wager or adds winnings to balance  
   - Saves result as a transaction in MongoDB

3. **💰 Balance and Transaction History**  
   - `GET /balance`  
     Shows current user balance  
   - `GET /transactions?page=&limit=`  
     Paginated view of past spin history  
     Must be queryable and indexable by user and time

4. **🏆 Leaderboard (with Redis Cache)**  
   - `GET /leaderboard?days=7`  
     Shows top 10 users by net win in past N days  
     Uses MongoDB aggregation to calculate scores  
     Caches result in Redis (Upstash) for 2 minutes

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Authentication:** JWT  
- **Database:** MongoDB  
- **Cache:** Redis (node-redis)  
- **Other Tools:** Docker, Axios

---

## 📁 .env (Environment Variables)

Create a `.env` file at the **root of the backend** folder with the following keys:

```env
PORT=                # Example: 5000
DB_URI=              # MongoDB connection string
CORS_ORIGIN=         # e.g., http://localhost:3000
ACCESS_TOKEN_SECRET= # Strong secret for JWT access tokens
REFRESH_TOKEN_SECRET=# Strong secret for JWT refresh tokens
ACCESS_TOKEN_EXPIRY= # e.g., 15m
REFRESH_TOKEN_EXPIRY=# e.g., 7d
REDIS_URL=           # Your Redis connection string (Upstash or local)
REDIS_TOKEN=         # Token if required by your Redis host

## 📦 Installation

Follow these steps to run the project locally:

1. **Clone the repository**

```bash
git clone https://github.com/hemants1234/game.git
cd game
