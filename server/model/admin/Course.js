import mongoose from "mongoose";


const curriculumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  freePreview: {
    type: Boolean,
    default: false,
  },
  publicID: {
    type: String,
    required: true,
  },
});

// Define the Thumbnail Schema
const thumbnailSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  publicID: {
    type: String,
    required: true,
  },
});



const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  welcomeMessage: {
    type: String,
    required: true,
  },
  isPublished: Boolean,
  thumbnail: {
    type: thumbnailSchema,
    required: true,
  },
  curriculum: {
    type: [curriculumSchema], // Array of curriculum objects
  },
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  date: {
    type:String
  }
});

// Create the Course Model
export const Course = mongoose.model("Course", courseSchema);


