import { Router } from "express";
import {
  handleSpin,
  getBalance,
  getTransactions,
  getLeaderboard
} from "../controllers/game.controller.js";
import  {verifyJWT}  from "../middlewares/auth.middlewares.js";

const router = Router()

router.use(verifyJWT); 

router.route("/spin").post(handleSpin)
router.route("/balance").get(getBalance)
router.route("/transactions").get(getTransactions)
router.route("/leaderboard").get(getLeaderboard)

export default router;
