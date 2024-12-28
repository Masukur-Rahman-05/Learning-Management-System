
import express from "express";
import { getAllCourses, getCourseDetails } from "../../controller/user/UserController.js";

const router = express.Router();


router.get('/get', getAllCourses)
router.get('/get/:id/:userId', getCourseDetails)

export default router

