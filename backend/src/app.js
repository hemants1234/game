import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors(
    {
      origin: 'http://localhost:5173',
      credentials: true     
    }
))

app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// routes import

import userRouter from './routes/user.routes.js'
import gameRuter from "./routes/game.routes.js"
 
// routes declaration

app.use("/api/v1/users/auth", userRouter)
app.use("/api/v1/game", gameRuter)

  
export {app};