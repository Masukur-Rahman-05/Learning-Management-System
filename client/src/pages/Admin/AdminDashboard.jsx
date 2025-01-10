import { getTotalRevenueAndStudents } from "@/Redux/admin/CourseSlice.js";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TotalRevenue from "./utils/DashboardCharts/TotalRevenue.jsx";
import TotalStudents from "./utils/DashboardCharts/TotalStudents.jsx";
import TotalCourses from "./utils/DashboardCharts/TotalCourses.jsx";
import CourseOverview from "./utils/DashboardCharts/CourseOverview.jsx";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { TotalStates } = useSelector((state) => state.adminSlice);
  const courses = TotalStates?.courses;

  const coursesData = courses?.map((course) => {
    return {
      courseTitle: course.courseTitle,
      students: course.students.length,
      revenue: course.students.reduce((acc, student) => acc + parseFloat(student.paidAmount) || 0, 0),
    }
  })

  console.log(coursesData)

  console.log(TotalStates);

  const fetchTotalStates = useCallback(async () => {
    try {
      const result = await dispatch(getTotalRevenueAndStudents());
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTotalStates();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 mt-10 w-full p-10">
      <div>
        <h1 className="text-3xl font-bold text-center text-wrap">Instructor Dashboard</h1>
      </div>
      <div className="flex flex-wrap justify-center  gap-10 w-full ">
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          {TotalStates?.totalRevenue && (
            <TotalCourses totalCourses={TotalStates.totalCourses} />
          )}
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          {TotalStates?.totalRevenue && (
            <TotalRevenue totalRevenue={TotalStates.totalRevenue} />
          )}
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Students Overview</h2>
          {TotalStates?.totalStudents && (
            <TotalStudents totalStudents={TotalStates.totalStudents} />
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto ">
        <CourseOverview courseData={coursesData} />
      </div>

      <div className="w-full"></div>
    </div>
  );
};

export default React.memo(AdminDashboard);
