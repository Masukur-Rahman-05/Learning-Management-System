import express from "express";
import { getAllPaidCourses } from "../../controller/user/UserPaidCourseController.js";

const router = express.Router();

router.get("/get-courses/:id", getAllPaidCourses);

export default router;
