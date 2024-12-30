import { Course } from "../../model/admin/Course.js";
import { StudentCourses } from "../../model/user/StudentCourses.js";



export const getAllCourses = async (req, res) => {

    const { category = [], language = [], level = [] } = req.query;

    
    let filter = {}

     if (typeof category === "string" && category.length > 0) {
       filter.category = { $in: category.split(",") };
     }
     if (typeof language === "string" && language.length > 0) {
       filter.language = { $in: language.split(",") };
     }
     if (typeof level === "string" && level.length > 0) {
       filter.level = { $in: level.split(",") };
     }

    


    try {

        const coursesList = await Course.find(filter);

        if(coursesList.length <= 0){
            return res.status(404).json({
                success: false,
                message: "No course found", 
            });
        }

        return res.status(200).json({
            success: true,
            data: coursesList,
        })
        
    } catch (error) {

        console.log('Course not found in backend' + error.message);
        return res.status(404).json({
            success: false,
            message: "No course found",
        })
        
    }
}

export const getCourseDetails = async (req, res) => {
    
    const { id, userId } = req.params;

    if (!id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters: 'id' and 'userId' are required.",
      });
    }


    try {

        const courseDetails = await Course.findById(id);
       

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "No Course Found in the Database"
            })
        }

        const studentPaidCourses = await StudentCourses.findOne({ userId: userId });

        if (!studentPaidCourses) {
            return res.status(200).json({
                success: true,
                data: courseDetails,
                isCoursePurchased: false,
                courseId: id,
            })
        }
        
        const isCoursePurchased = studentPaidCourses.courses.findIndex((item) => item.courseId === id) > -1
        
        

        return res.status(200).json({
            success: true,
            data: courseDetails,
            isCoursePurchased,
            courseId:id,
        })
        
    } catch (error) {

        console.log('Course not found in backend' + error.message);
        return res.status(404).json({
            success: false,
            message: "No course found error",
        })
        
    }
}