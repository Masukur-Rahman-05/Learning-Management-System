import React from "react";

import { FaGoogle } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { SiAmazon } from "react-icons/si";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";

const UserFooter = () => {
  return (
    <div className="bg-slate-900 w-full h-full flex flex-col items-center text-white gap-7 p-5">
      <div className="w-full flex flex-col items-center gap-5 text-slate-500 font-bold select-none">
        <h1 className="text-xl lg:text-2xl text-slate-500 font-bold">Tech Partner</h1>
        <div className="w-full flex flex-wrap justify-evenly items-center gap-5 text-xl lg:text-3xl">
          <div className="flex flex-col items-center gap-0 lg:gap-2">
            <FaGoogle />
            <p className="text-[10px] lg:text-sm">Google</p>
          </div>
          <div className="flex flex-col items-center gap-0 lg:gap-2">
            <FaMeta />
            <p className="text-[10px] lg:text-sm">Meta</p>
          </div>
          <div className="flex flex-col items-center gap-0 lg:gap-2">
            <SiAmazon />
            <p className="text-[10px] lg:text-sm">Amazon</p>
          </div>
          <div className="flex flex-col items-center gap-0 lg:gap-2">
            <TfiMicrosoftAlt />
            <p className="text-[10px] lg:text-sm">Microsoft</p>
          </div>
          <div className="flex flex-col items-center gap-0 lg:gap-2">
            <FaGithub />
            <p className="text-[10px] lg:text-sm">Github</p>
          </div>
        </div>
          </div>
          
          <div>
              <p className=" text-[10px] lg:text-sm text-slate-500">All Rights Reserved by &copy; 2025 E-Learning Inc.</p>
          </div>
    </div>
  );
};

export default UserFooter;
