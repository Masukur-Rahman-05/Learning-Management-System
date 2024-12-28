import express from "express";
import {
  addCourse,
  getCourse,
  getCourseDetails,
  updateCourse,
  getTotalRevenueAndStudents,
} from "../../controller/admin/CourseController.js";

const router = express.Router();


router.post('/add', addCourse)
router.get('/get', getCourse)
router.get('/get/:id', getCourseDetails)
router.put('/update/:id', updateCourse)
router.get("/total-state", getTotalRevenueAndStudents);

export default router