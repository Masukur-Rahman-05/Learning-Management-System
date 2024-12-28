import mongoose from "mongoose";



const LectureProgress = new mongoose.Schema({
    lectureId: String,
    viewed: Boolean,
    dateViewed:Date,
})


const CourseSchema = new mongoose.Schema({
    userId: String,
    courseId: String,
    completed: Boolean,
    completionDate: Date,
    lectureProgress: [LectureProgress]
})


export const CourseProgress = mongoose.model("CourseProgress", CourseSchema);

