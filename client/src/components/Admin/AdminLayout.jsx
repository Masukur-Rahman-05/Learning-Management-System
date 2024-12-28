import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BsBookHalf } from "react-icons/bs";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Redux/auth/authSlice.js";

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    dispatch(logoutUser())
  }
  return (
    <div className="w-screen min-h-screen flex">
      <div className="w-1/6 bg-slate-200 p-5 ">
        <div
          className="mb-[100px] cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          <div className="flex items-center gap-2 font-extrabold text-2xl">
            <BsBookHalf />
            <h1>E-Learning</h1>
          </div>
          <p className="text-sm">Admin Panel</p>
        </div>

        <div className="w-full">
          <ul className="space-y-3 text-white">
            <li
              className="cursor-pointer text-md font-semibold  bg-slate-900 rounded-lg p-1 pl-5 hover:scale-105 duration-150 flex items-center gap-2"
              onClick={() => navigate("/admin")}
            >
              <MdOutlineDashboardCustomize />
              Dashboard
            </li>
            <li
              className="cursor-pointer text-md font-semibold  bg-slate-900 rounded-lg p-1 pl-5 hover:scale-105 duration-150 flex items-center gap-2"
              onClick={() => navigate("/admin/courses")}
            >
              <TfiWrite />
              Courses
            </li>
            <li
              className="cursor-pointer text-md font-semibold bg-slate-900 rounded-lg p-1 pl-5 hover:scale-105 duration-150 flex items-center gap-2"
              onClick={() => handleLogout()}
            >
              <MdLogout />
              Logout
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full flex flex-1 flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
