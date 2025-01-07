import { Course } from "../../model/admin/Course.js";
import { CourseProgress } from "../../model/user/CourseProgress.js";
import { StudentCourses } from "../../model/user/StudentCourses.js";

export const getCourseProgress = async (req, res) => {
  const { courseId, userId } = req.params;

  try {
    const studentPurchasedCourse = await StudentCourses.findOne({ userId });

    if (!studentPurchasedCourse) {
      return res.status(404).json({
        success: false,
        message: "No course found",
      });
    }

    const isCoursePurchased =
      studentPurchasedCourse.courses.findIndex(
        (item) => item.courseId == courseId
      ) > -1;

    if (!isCoursePurchased) {
      return res.status(404).json({
        success: true,
        isPurchased: false,
        message: "You have not purchased this course yet",
      });
    }

    const currentUserCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course found",
      });
    }

    if (!currentUserCourseProgress) {
      return res.status(200).json({
        success: true,
        message: "No course progress found, You have to start watching video",
        data: {
          courseDetails: courseDetails,
          isPurchased: true,
          progress: [],
          completed: false,
        },
      });
    }

    const { completed } = currentUserCourseProgress;

    return res.status(200).json({
      success: true,
      data: {
        courseDetails: courseDetails,
        progress: currentUserCourseProgress.lectureProgress,
        completed,
        completionDate: currentUserCourseProgress.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};






//......................Mark controller....................................

export const MarkCurrentLectureAsViewed = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;

    let progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        lectureProgress: [
          {
            lectureId,
            viewed: true,
            dateViewed: new Date(),
          },
        ],
      });
      await progress.save();
    } else {
      const lectureProgress = progress.lectureProgress.find(
        (item) => item.lectureId === lectureId
      );

      if (lectureProgress) {
        lectureProgress.viewed = true;
        lectureProgress.dateViewed = new Date();
      } else {
        progress.lectureProgress.push({
          lectureId,
          viewed: true,
          dateViewed: new Date(),
        });
      }
      await progress.save();
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    //check all the lectures are viewed or not
    const allLecturesViewed =
      progress.lectureProgress.length === course.curriculum.length &&
      progress.lectureProgress.every((item) => item.viewed);

    if (allLecturesViewed) {
      progress.completed = true;
      progress.completionDate = new Date();

      await progress.save();
    }

    res.status(200).json({
      success: true,
      message: "Lecture marked as viewed",
      data: progress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};



//.........................................RESET ..............................................

export const ResetCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found!",
      });
    }

    progress.lectureProgress = [];
    progress.completed = false;
    progress.completionDate = null;

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Course progress has been reset",
      data: progress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};
