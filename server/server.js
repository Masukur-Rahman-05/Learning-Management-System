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

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies and auth tokens
    allowedHeaders: "Content-Type,Authorization,Cache-Control",
  })
);

app.use('/api/auth',userRouter)
app.use("/api/admin/courses", UploadRouter);
app.use("/api/admin/courses", AdminCourseRouter);
app.use("/api/user/courses", UserRouter);
app.use("/api/user/courses/order", UserPaymentRouter);
app.use('/api/user/courses/paid', PaidCourseRouter)
app.use('/api/user/courses/progress', CourseProgressRouter)

app.get("*", (req, res) => {
  res.send("Invalid URL, please try again");
});

app.listen(3000, async () => {
  try {
    await connectDB();
    console.log("Server started");
  } catch (error) {
    console.log(error.message);
  }
});
