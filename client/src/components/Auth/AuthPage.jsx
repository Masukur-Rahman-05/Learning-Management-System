import React from "react";
import { Outlet } from "react-router-dom";
import { BsBookHalf } from "react-icons/bs";

const AuthPage = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-slate-900 text-white">
      <div className="w-screen p-5 flex items-center">
        <div className="flex items-center gap-2 font-extrabold text-2xl">
          <BsBookHalf />
          <h1>E-Learning</h1>
        </div>
      </div>
      <div className="w-full p-5 flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
