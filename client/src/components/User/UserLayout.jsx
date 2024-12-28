import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BsBookHalf } from "react-icons/bs";
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/Redux/auth/authSlice.js';

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    dispatch(logoutUser())
  }
    return (
      <div className="w-screen min-h-screen flex flex-col bg-slate-950">
        <div className="bg-none w-full h-[80px] p-5  flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-2xl text-violet-400">
            <BsBookHalf />
            <h1>E-Learning</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-5 font-semibold text-white">
              <p className="cursor-pointer" onClick={() => navigate("/home")}>
                Home
              </p>
              <p
                className="cursor-pointer"
                onClick={() => navigate("/home/courses")}
              >
                Courses
              </p>
              <p
                className="cursor-pointer"
                onClick={() => navigate("/home/contact")}
              >
                Contact
              </p>
              <p
                className="cursor-pointer"
                onClick={() => navigate("/home/my-courses")}
              >
                My-Courses
              </p>
            </div>
            <Button onClick={() => handleLogout()} className="bg-violet-800">
              Logout
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Outlet />
        </div>
      </div>
    );
};

export default UserLayout;