// import React,{useState,useEffect} from 'react';
// import bannerOne from '../../assets/Banners/bannerOne.jpg';
// import bannerTwo from '../../assets/Banners/bannerTwo.jpg';
// import bannerThree from "../../assets/Banners/bannerThree.jpg";
// import bannerFour from "../../assets/Banners/bannerFour.jpg";
// import { Button } from '@/components/ui/button';

// import { MdKeyboardArrowRight } from "react-icons/md";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { HiArrowLongRight } from "react-icons/hi2";

// import HomeCategory from './HomeUtils.js/HomeCategory.jsx';
// import HomeInstructor from './HomeUtils.js/HomeInstructors.jsx';
// import { contents } from './HomeUtils.js/HomeElements.js';
// import { useNavigate } from 'react-router-dom';

// const UserHome = () => {
//   const banners = [bannerOne, bannerTwo, bannerThree, bannerFour];
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-screen min-h-screen flex flex-col gap-5 ">
//       <div className="flex flex-col items-center w-full h-auto gap-5 py-10 mt-5 bg-transparent relative">
//         <div className="absolute w-36 h-36 rounded-full bg-yellow-700 top-[100px] left-[200px] blur-3xl "></div>
//         <div className="absolute w-32 h-32 rounded-full bg-violet-600 bottom-24 right-32 blur-3xl "></div>
//         <h1 className="text-5xl font-bold tracking-wide leading-relaxed text-white">
//           Unleash Your Potential
//         </h1>
//         <p className="text-white text-md w-[60%]  overflow-hidden">
//           At E-learning, we are committed to empowering learners worldwide with
//           high-quality, expert-led courses tailored to help you achieve your
//           personal and professional goals. Whether you're a beginner exploring a
//           new skill, a professional aiming to advance your career, or a lifelong
//           learner pursuing your passions, we have something for everyone. Our
//           platform offers a diverse range of courses in technology, business,
//           creative arts, and more, ensuring that you find the perfect learning
//           path for your needs. Each course is carefully crafted by industry
//           experts to provide a balance of theory and practical application,
//           helping you master essential skills through real-world projects and
//           hands-on practice. With E-learning, you’ll enjoy a seamless and
//           flexible learning experience. Access your courses anytime, anywhere,
//           on any device. Learn at your own pace with lifetime access to your
//           enrolled courses, and stay motivated with interactive quizzes,
//           downloadable resources, and engaging assignments. Join our vibrant
//           community of learners and gain access to tools that transform
//           knowledge into success. Whether you’re preparing for your next big
//           opportunity, exploring a new hobby, or looking to upskill, E-learning
//           is here to guide you every step of the way. Start your journey today
//           with E-learning and unlock endless possibilities!
//         </p>

//         <Button className="flex items-center gap-2 w-1/6 text-lg p-8 bg-violet-950 " onClick = {() => navigate("/home/courses")}>
//           EXPLORE COURSES <HiArrowLongRight />{" "}
//         </Button>
//       </div>
//       <div className=" w-full  flex justify-evenly items-center my-32">
//         <div className="w-[300px] h-[200px] p-5 flex flex-col items-center text-justify rounded-xl shadow-xl space-y-3 bg-slate-900 hover:scale-110 duration-700">
//           <h1 className="text-xl font-bold text-violet-500">Learn</h1>
//           <p className="text-white">
//             Discover new skills and knowledge with our expert-led courses. Dive
//             into engaging content designed to simplify complex topics and make
//             learning fun and effective.
//           </p>
//         </div>
//         <div className="w-[300px] h-[200px] p-5 flex flex-col items-center text-justify rounded-xl shadow-xl space-y-3 bg-slate-900 hover:scale-110 duration-700">
//           <h1 className="text-xl font-bold text-violet-500">Grow</h1>
//           <p className="text-white">
//             Expand your horizons and advance your career. Gain the confidence
//             and skills to tackle challenges and achieve your personal and
//             professional goals.
//           </p>
//         </div>
//         <div className="w-[300px] h-[200px] p-5 flex flex-col items-center text-justify rounded-xl shadow-xl space-y-3 bg-slate-900 hover:scale-110 duration-700">
//           <h1 className="text-xl font-bold text-violet-500">Implement</h1>
//           <p className="text-white">
//             Turn knowledge into action! Apply what you’ve learned through
//             hands-on projects and practical exercises to build real-world
//             expertise.
//           </p>
//         </div>
//         <div className="w-[300px] h-[200px] p-5 flex flex-col items-center text-justify rounded-xl shadow-xl space-y-3 bg-slate-900 hover:scale-110 duration-700">
//           <h1 className="text-xl font-bold text-violet-500">Succeed</h1>
//           <p className="text-white">
//             Achieve your dreams with the power of knowledge. From mastering
//             skills to landing opportunities, we’re here to help you thrive.
//           </p>
//         </div>
//       </div>
//       <div className="relative flex justify-center items-center ">
//         <div className="relative w-1/2 h-[400px] overflow-hidden rounded-2xl">
//           {banners.map((banner, index) => {
//             return (
//               <img
//                 src={banner}
//                 alt="Banner"
//                 key={index}
//                 className={`${
//                   index === currentSlide ? "opacity-100" : "opacity-0"
//                 } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
//               />
//             );
//           })}

//           <Button
//             className="absolute top-1/2 left-4 transform -translate-y-1/2 hover:text-white"
//             onClick={() =>
//               setCurrentSlide(
//                 currentSlide === 0 ? banners.length - 1 : currentSlide - 1
//               )
//             }
//           >
//             <MdKeyboardArrowLeft className="w-10 h-10" />
//           </Button>
//           <Button
//             className="absolute top-1/2 right-4 transform -translate-y-1/2 hover:text-white"
//             onClick={() =>
//               setCurrentSlide(
//                 currentSlide === banners.length - 1 ? 0 : currentSlide + 1
//               )
//             }
//           >
//             <MdKeyboardArrowRight className="w-10 h-10" />
//           </Button>
//         </div>
//       </div>

//       <div className="w-screen flex justify-center my-5">
//         <HomeCategory />
//       </div>

//       <div className="w-screen flex flex-col gap-10  items-center my-10 relative">
//         <div className="absolute w-36 h-36 rounded-full bg-yellow-700 top-[400px] right-[700px] blur-3xl  "></div>
//         <div className="absolute w-36 h-36 rounded-full bg-green-500 bottom-0 -right-[100px] blur-3xl "></div>
//         {contents?.map((item, index) => {
//           return (
//             <div
//               key={index}
//               className="w-[90%] flex justify-evenly items-center gap-20 "
//             >
//               <div className="w-1/2">
//                 <img
//                   src={item.image}
//                   className="w-full h-[500px] object-cover rounded-xl shadow-lg "
//                 />
//               </div>

//               <div className="w-1/2 text-center">
//                 <h1 className="text-4xl font-bold text-violet-600 tracking-wider my-5">
//                   {item.title}
//                 </h1>
//                 <p className="text-justify text-gray-300">{item.description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex flex-col items-center gap-10 my-10">
//         <h1 className="text-3xl font-bold text-violet-500 ">OUR INSTRUCTORS</h1>
//         <HomeInstructor />
//       </div>
//     </div>
//   );
// };

// export default UserHome;

/*



*/

import { useState, useEffect } from "react";
import bannerOne from "../../assets/Banners/bannerOne.jpg";
import bannerTwo from "../../assets/Banners/bannerTwo.jpg";
import bannerThree from "../../assets/Banners/bannerThree.jpg";
import bannerFour from "../../assets/Banners/bannerFour.jpg";
import { Button } from "@/components/ui/button";

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { HiArrowLongRight } from "react-icons/hi2";

import HomeCategory from "./HomeUtils.js/HomeCategory.jsx";
import HomeInstructor from "./HomeUtils.js/HomeInstructors.jsx";
import { contents } from "./HomeUtils.js/HomeElements.js";
import { useNavigate } from "react-router-dom";
import UserFAQ from "./UserFAQ.jsx";

const UserHome = () => {
  const banners = [bannerOne, bannerTwo, bannerThree, bannerFour];
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5">
      {/* Hero Section */}
      <div className="flex flex-col items-center w-full h-auto gap-5 py-10 mt-5 bg-transparent relative">
        <div className="absolute w-24 h-24 md:w-36 md:h-36 rounded-full bg-yellow-700 top-[100px] left-[50px] md:left-[200px] blur-3xl "></div>
        <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-violet-600 bottom-12 right-16 md:bottom-24 md:right-32 blur-3xl "></div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide leading-relaxed text-white text-center">
          Unleash Your Potential
        </h1>
        <p className="text-white text-sm md:text-md lg:text-lg w-[90%] md:w-[60%] text-justify z-30">
          At E-learning, we are committed to empowering learners worldwide with
          high-quality, expert-led courses tailored to help you achieve your
          personal and professional goals. Whether you're a beginner exploring a
          new skill, a professional aiming to advance your career, or a lifelong
          learner pursuing your passions, we have something for everyone. Our
          platform offers a diverse range of courses in technology, business,
          creative arts, and more, ensuring that you find the perfect learning
          path for your needs. Join our vibrant community of learners and gain
          access to tools that transform knowledge into success. Whether you’re
          preparing for your next big opportunity, exploring a new hobby, or
          looking to upskill, E-learning is here to guide you every step of the
          way. Start your journey today with E-learning and unlock endless
          possibilities!
        </p>

        <Button
          className="flex items-center gap-2 w-44 md:w-1/4 text-sm md:text-md p-2 md:p-8 bg-violet-950"
          onClick={() => navigate("/courses")}
        >
          EXPLORE COURSES <HiArrowLongRight />
        </Button>
      </div>

      {/* Info Cards */}
      <div className="w-full flex flex-wrap justify-center gap-5 md:gap-10 my-10 px-5">
        <div className="w-72 md:w-[300px] h-auto p-5 flex flex-col items-center text-justify rounded-xl shadow-xl space-y-3 bg-slate-900 hover:scale-110 duration-700">
          <h1 className="sm:text-lg lg:text-xl font-bold text-violet-500">
            Learn
          </h1>
          <p className="text-white text-sm lg:text-base">
            Discover new skills and knowledge with our expert-led courses. Dive
            into engaging content designed to simplify complex topics and make
            learning fun and effective.
          </p>
        </div>
        <div className="w-72 md:w-[300px] h-auto p-5 flex flex-col items-center text-justify rounded-xl shadow-xl space-y-3 bg-slate-900 hover:scale-110 duration-700">
          <h1 className="sm:text-lg lg:text-xl font-bold text-violet-500">
            Grow
          </h1>
          <p className="text-white text-sm lg:text-base">
            Expand your horizons and advance your career. Gain the confidence
            and skills to tackle challenges and achieve your personal and
            professional goals.
          </p>
        </div>
        <div className="w-72 md:w-[300px] h-auto p-5 flex flex-col items-center text-justify rounded-xl shadow-xl space-y-3 bg-slate-900 hover:scale-110 duration-700">
          <h1 className="sm:text-lg lg:text-xl font-bold text-violet-500">
            Implement
          </h1>
          <p className="text-white text-sm lg:text-base">
            Turn knowledge into action! Apply what you’ve learned through
            hands-on projects and practical exercises to build real-world
            expertise.
          </p>
        </div>
        <div className="w-72 md:w-[300px] h-auto p-5 flex flex-col items-center text-justify rounded-xl shadow-xl space-y-3 bg-slate-900 hover:scale-110 duration-700">
          <h1 className="sm:text-lg lg:text-xl font-bold text-violet-500">
            Succeed
          </h1>
          <p className="text-white text-sm lg:text-base">
            Achieve your dreams with the power of knowledge. From mastering
            skills to landing opportunities, we’re here to help you thrive.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative flex justify-center items-center mt-10">
        <div className="relative w-full md:w-1/2 h-[200px] md:h-[400px] overflow-hidden rounded-2xl">
          {banners.map((banner, index) => (
            <img
              src={banner}
              alt="Banner"
              key={index}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          ))}

          <Button
            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 hover:text-white"
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? banners.length - 1 : currentSlide - 1
              )
            }
          >
            <MdKeyboardArrowLeft className="w-8 h-8 md:w-10 md:h-10" />
          </Button>
          <Button
            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 hover:text-white"
            onClick={() =>
              setCurrentSlide(
                currentSlide === banners.length - 1 ? 0 : currentSlide + 1
              )
            }
          >
            <MdKeyboardArrowRight className="w-8 h-8 md:w-10 md:h-10" />
          </Button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-screen flex justify-center my-5">
        <HomeCategory />
      </div>

      {/* Features Section */}
      <div className="w-full flex flex-col gap-10 items-center my-10 relative px-5">
        <div className="absolute w-24 h-24 md:w-36 md:h-36 rounded-full bg-yellow-700 top-[20px] right-[650px] blur-3xl"></div>
        <div className="absolute w-24 h-24 md:w-36 md:h-36 rounded-full bg-green-500 bottom-0 -right-12 blur-3xl"></div>
        {contents?.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-10 md:gap-20 z-30"
          >
            <div className="w-full md:w-1/2">
              <img
                src={item.image}
                className="w-full h-64 md:h-[500px] object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left px-5 z-30">
              <h1 className="text-2xl md:text-4xl font-bold text-violet-600 tracking-wider my-5 ">
                {item.title}
              </h1>
              <p className="text-gray-300 text-justify text-[12px] lg:text-base">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Instructors Section */}
      <div className="flex flex-col items-center gap-10 my-10 px-5">
        <h1 className="text-xl md:text-3xl font-bold text-violet-500">
          OUR INSTRUCTORS
        </h1>
        <HomeInstructor />
      </div>

      <div className="px-3 md:px-0">
        <UserFAQ />
      </div>
    </div>
  );
};

export default UserHome;
