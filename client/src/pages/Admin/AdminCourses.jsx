
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getAllCourses } from "@/Redux/admin/CourseSlice.js";


const AdminCourses = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.adminSlice);

  useEffect(() => {
    dispatch(getAllCourses())

    
  }, [dispatch])
  

  return (
    <div className="w-full flex flex-col p-8 mt-10">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between gap-5">
          <h1 className="text-2xl font-bold">All Courses</h1>
          <Button onClick={() => navigate("/admin/add-new-course")}>
            Add New Course
          </Button>
        </div>
        <div className="w-full">
          <Table>
            <TableCaption>Overall course analysis</TableCaption>
            <TableHeader className="bg-slate-900 hover:bg-slate-950">
              <TableRow>
                <TableHead className="w-[300px] text-white">
                  Course name
                </TableHead>
                <TableHead className="text-right text-white">
                  Students
                </TableHead>
                <TableHead className="text-right text-white">Revenue</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                courseData?.map((course,index) => {
                  return (
                    <TableRow
                      className="bg-slate-200 font-semibold border-black border-b-1 "
                      key={index}
                    >
                      <TableCell className="font-medium">
                        {course.courseTitle}
                      </TableCell>
                      <TableCell className="text-right">0</TableCell>
                      <TableCell className="text-right">0</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" onClick={() => navigate(`/admin/edit/${course._id}`)}>{<FaRegEdit />}</Button>
                          <Button size="sm">{<FiDelete />}</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;