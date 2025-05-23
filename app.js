import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {dbConnection} from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/user.js";
import paymentRoute from "./routes/paymentRoutes.js";
import courseRoute from "./routes/course.js"
import collegeRoute from "./routes/college.js";
const app = express();
dotenv.config({path : "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods : ["POST"],
    credentials : true,
})
);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/',userRouter);

app.get("/", (req, res, next)=>{return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use("/api", paymentRoute);
app.use("/course", courseRoute);
app.use('/college', collegeRoute)

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.get("/course/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.get("/college/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.use(errorMiddleware);

export default app;