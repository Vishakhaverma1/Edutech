import app from "./app.js";
import Razorpay from "razorpay";
import {dbConnection} from "./database/dbConnection.js";

dbConnection();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.listen(process.env.PORT,()=>{
    console.log(`Server Running On Port ${process.env.PORT}`);
});