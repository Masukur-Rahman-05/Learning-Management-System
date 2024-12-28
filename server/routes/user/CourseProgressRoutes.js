import express from "express";
import {
  getCourseProgress,
  MarkCurrentLectureAsViewed,
  ResetCurrentCourseProgress,
} from "../../controller/user/CourseProgressController.js";


const router = express.Router();

router.get('/get/:courseId/:userId', getCourseProgress);
router.post("/mark-progress", MarkCurrentLectureAsViewed);
router.post("/reset-progress", ResetCurrentCourseProgress);


export default router