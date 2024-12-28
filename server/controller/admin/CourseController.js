import { Course } from "../../model/admin/Course.js";

export const addCourse = async (req, res) => {
  try {
    const courseData = req.body;

    const newlyCreatedCourse = new Course(courseData);
    await newlyCreatedCourse.save();

    return res.status(201).json({
      success: true,
      data: newlyCreatedCourse,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add course" + error.message,
    });
  }
};
export const getCourse = async (req, res) => {
  try {
    const courseList = await Course.find({});

    if (courseList.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "No course found",
      });
    }

    return res.status(200).json({
      success: true,
      data: courseList,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get course" + error.message,
    });
  }
};
export const getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course found",
      });
    }

    return res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get course details" + error.message,
    });
  }
};
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const CourseData = req.body;

    const updateCourse = await Course.findByIdAndUpdate(id, CourseData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: updateCourse,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update course" + error.message,
    });
  }
};




export const getTotalRevenueAndStudents = async (req, res) => {
  try {
    const courses = await Course.find();

    let totalRevenue = 0;
    let totalStudents = 0;

    courses.forEach((course) => {
      totalStudents += course.students.length;
      course.students.forEach((student) => {
        totalRevenue += parseFloat(student.paidAmount) || 0;
      });
    });

    return res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalStudents,
        totalCourses: courses.length,
        courses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to calculate stats",
      error: error.message,
    });
  }
};
