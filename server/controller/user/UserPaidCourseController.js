import { StudentCourses } from "../../model/user/StudentCourses.js"



export const getAllPaidCourses = async (req, res) => {

    const {id} = req.params
    try {

        const allCourses = await StudentCourses.findOne({ userId: id })
        
        
        if (!allCourses) {
            return res.status(404).json({
                success: false,
                message: "No course found",
            })
        }

        return res.status(200).json({
            success: true,
            data:allCourses.courses,
        })
        
    } catch (error) {

        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get course" + error.message,
        })
        
    }
}