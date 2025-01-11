import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./database.js";
import userRouter from './routes/auth/userRoutes.js'
import UploadRouter from './routes/admin/CourseUpload.js'
import AdminCourseRouter from './routes/admin/CourseController.js'
import UserRouter from './routes/user/UserRouter.js'
import UserPaymentRouter from './routes/user/OrderRoutes.js'
import PaidCourseRouter from './routes/user/PaidCourseRoutes.js'
import CourseProgressRouter from './routes/user/CourseProgressRoutes.js'
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // origin: "https://ace4-2404-1c40-166-390-5c70-291e-d8d4-d3f3.ngrok-free.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies and auth tokens
    allowedHeaders: "Content-Type,Authorization,Cache-Control",
  })
);

(() => {
  try {
    connectDB();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
})();

app.use('/api/auth',userRouter)
app.use("/api/admin/courses", UploadRouter);
app.use("/api/admin/courses", AdminCourseRouter);
app.use("/api/user/courses", UserRouter);
app.use("/api/user/courses/order", UserPaymentRouter);
app.use('/api/user/courses/paid', PaidCourseRouter)
app.use('/api/user/courses/progress', CourseProgressRouter)

app.get('/', async (req, res) => {
  res.send("Backend is running well")
})

app.get("*", (req, res) => {
  res.send("Invalid URL, please try again");
});

app.listen(3000, async () => {
  try {
    console.log("Server started");
  } catch (error) {
    console.log(error.message);
  }
});


export default app