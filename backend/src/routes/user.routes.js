import { Router } from "express";
import {
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentUserPassword, 
    getCurrentUSer, 
    updateAccountDetails
  } from "../controllers/user.controller.js";
import  {verifyJWT}  from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentUserPassword)
router.route("/current-user").get( verifyJWT, getCurrentUSer)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)


export default router;
