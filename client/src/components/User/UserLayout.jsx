import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BsBookHalf } from "react-icons/bs";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Redux/auth/authSlice.js";

import { CiMenuFries } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserFooter from "./UserFooter.jsx";

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <div
      className="w-screen min-h-screen flex flex-col bg-slate-950"
    >
      <div className="bg-none w-full h-[80px] p-5 flex items-center justify-between">
        <div
          className="flex items-center gap-2 font-extrabold sm:text-lg md:text-xl lg:text-2xl text-violet-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <BsBookHalf />
          <h1>E-Learning</h1>
        </div>
        <div className="flex items-center gap-5">
          {/* Navigation links: Hidden on small/medium screens */}
          <div className="hidden lg:flex items-center gap-5 font-semibold text-white">
            <p className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </p>
            <p
              className="cursor-pointer"
              onClick={() => navigate("/courses")}
            >
              Courses
            </p>
            <p
              className="cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact
            </p>
            <p
              className="cursor-pointer"
              onClick={() => navigate("/my-courses")}
            >
              My-Courses
            </p>
          </div>

          {/* Logout button: Hidden on small/medium screens */}
          <Button
            onClick={() => handleLogout()}
            className="hidden lg:block bg-violet-800"
          >
            Logout
          </Button>

          {/* Dropdown Menu: Visible on small/medium screens */}
          <div className="block lg:hidden ">
            <DropdownMenu className="w-[100px]">
              <DropdownMenuTrigger asChild>
                <Button>
                  <CiMenuFries />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24 bg-black/20 backdrop-blur-[10px] border-none text-white mr-5 space-y-3 ">
                <DropdownMenuItem onClick={() => navigate("/")}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/courses")}>
                  Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/contact")}>
                  Contact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-courses")}>
                  My-Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <Button className="bg-violet-800 w-[70px] h-[30px]">
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Outlet />
      </div>

      <div className="w-full">
        <UserFooter/>
      </div>
    </div>
  );
};

export default UserLayout;

// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { BsBookHalf } from "react-icons/bs";
// import { Button } from "../ui/button";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "@/Redux/auth/authSlice.js";

// import { CiMenuFries } from "react-icons/ci";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const UserLayout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     dispatch(logoutUser());
//   };

//   return (
//     <div className="w-screen min-h-screen flex flex-col bg-slate-950">
//       <div className="bg-none w-full h-[80px] p-5 flex items-center justify-between">
//         <div
//           className="flex items-center gap-2 font-extrabold text-2xl text-violet-400 cursor-pointer"
//           onClick={() => navigate("/home")}
//         >
//           <BsBookHalf />
//           <h1>E-Learning</h1>
//         </div>
//         <div className="flex items-center gap-5">
//           {/* Navigation links: Hidden on small/medium screens */}
//           <div className="hidden lg:flex items-center gap-5 font-semibold text-white">
//             <p className="cursor-pointer" onClick={() => navigate("/home")}>
//               Home
//             </p>
//             <p
//               className="cursor-pointer"
//               onClick={() => navigate("/home/courses")}
//             >
//               Courses
//             </p>
//             <p
//               className="cursor-pointer"
//               onClick={() => navigate("/home/contact")}
//             >
//               Contact
//             </p>
//             <p
//               className="cursor-pointer"
//               onClick={() => navigate("/home/my-courses")}
//             >
//               My-Courses
//             </p>
//           </div>

//           {/* Logout button */}
//           <Button onClick={() => handleLogout()} className="hidden lg:block bg-violet-800">
//             Logout
//           </Button>

//           {/* Menu icon: Visible on small/medium screens */}
//           <div className="block lg:hidden">
//             <Button>
//               <CiMenuFries />
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col items-center">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default UserLayout;
