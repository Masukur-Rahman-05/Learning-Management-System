import mongoose from "mongoose";


const studentCoursesSchema = new mongoose.Schema({
  userId: String,
  courses: [
    {
      courseId: String,
      title: String,
      dateOfPurchase: Date,
      courseImage: String,
    },
  ],
});

export const StudentCourses = mongoose.model("StudentCourse", studentCoursesSchema);