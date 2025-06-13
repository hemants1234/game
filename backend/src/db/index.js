import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const DatabaseConnect = async () => {
    try {
        const DatabaseConnection = mongoose.connect(`${process.env.DB_URI}`)
        console.log(`\n MongoDB Connected !! DB HOST: ${DB_NAME}, ${(await DatabaseConnection).connection.host}`);
    } catch (error) {
       console.log("MongoDB Connection Error:- ", error);
       process.exit(1)        
    }
}

export default DatabaseConnect;