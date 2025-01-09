import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BsBookHalf } from "react-icons/bs";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Redux/auth/authSlice.js";

import { RiMenuFill } from "react-icons/ri";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    dispatch(logoutUser())
  }
  return (
    <div className="relative w-screen min-h-screen flex">
      <div className="absolute top-5 left-5 lg:hidden text-white font-bold">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-slate-900 hover:bg-slate-950 ">
              <RiMenuFill className="text-white font-bold" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-5">
            <DropdownMenuLabel>
              <div
                className="cursor-pointer"
                onClick={() => navigate("/admin")}
              >
                <div className="flex items-center gap-2 font-extrabold text-lg">
                  <BsBookHalf />
                  <h1>E-Learning</h1>
                </div>
                <p className="text-sm">Admin Panel</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <li
                className="cursor-pointer text-md font-semibold  p-1 hover:bg-slate-300 flex items-center gap-2"
                onClick={() => navigate("/admin")}
              >
                <MdOutlineDashboardCustomize />
                Dashboard
              </li>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <li
                className="cursor-pointer text-md font-semibold  p-1 hover:bg-slate-300 flex items-center gap-2"
                onClick={() => navigate("/admin/courses")}
              >
                <TfiWrite />
                Courses
              </li>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <li
                className="cursor-pointer text-md font-semibold  p-1 hover:bg-slate-300 flex items-center gap-2"
                onClick={() => handleLogout()}
              >
                <MdLogout />
                Logout
              </li>
            </DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden lg:block w-1/6 bg-slate-200 p-5 ">
        <div
          className="mb-[100px] cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          <div className="flex items-center gap-2 font-extrabold lg:text-lg xl:text-2xl">
            <BsBookHalf />
            <h1>E-Learning</h1>
          </div>
          <p className="text-sm">Admin Panel</p>
        </div>

        <div className="w-full">
          <ul className="space-y-3 text-white">
            <li
              className="cursor-pointer lg:text-sm xl:text-[16px] font-semibold  bg-slate-900 rounded-lg p-1 pl-5 hover:scale-105 duration-150 flex items-center gap-2"
              onClick={() => navigate("/admin")}
            >
              <MdOutlineDashboardCustomize />
              Dashboard
            </li>
            <li
              className="cursor-pointer lg:text-sm xl:text-[16px] font-semibold  bg-slate-900 rounded-lg p-1 pl-5 hover:scale-105 duration-150 flex items-center gap-2"
              onClick={() => navigate("/admin/courses")}
            >
              <TfiWrite />
              Courses
            </li>
            <li
              className="cursor-pointer lg:text-sm xl:text-[16px] font-semibold bg-slate-900 rounded-lg p-1 pl-5 hover:scale-105 duration-150 flex items-center gap-2"
              onClick={() => handleLogout()}
            >
              <MdLogout />
              Logout
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full flex flex-1 flex-col items-center mt-10 lg:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
