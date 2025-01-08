import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CourseFilters from "./CoursesUtils/CourseFilters.jsx";
import { HiArrowLongDown } from "react-icons/hi2";
import { BiSort } from "react-icons/bi";
import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaUp } from "react-icons/bs";
import { BsSortUp } from "react-icons/bs";
import { BsSortUpAlt } from "react-icons/bs";
import { TfiFaceSad } from "react-icons/tfi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "@/Redux/user/UserSlice.js";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { Button } from "@/components/ui/button.jsx";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
};

const UserCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCourseData, isLoading } = useSelector((state) => state.userSlice);

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (Object.keys(filter).length > 0) {
      dispatch(getAllCourses({ filter: filter }));
    } else {
      dispatch(getAllCourses({ filter: {} }));
    }
  }, [dispatch, filter]);

  const handleSort = (value) => {
    setSort(value);
  };

  const sortedCourseList = [...userCourseData];
  if (sort === "lowtohigh") {
    sortedCourseList.sort((a, b) => a.price - b.price);
  } else if (sort === "hightolow") {
    sortedCourseList.sort((a, b) => b.price - a.price);
  } else if (sort === "atoz") {
    sortedCourseList.sort((a, b) => a.courseTitle.localeCompare(b.courseTitle));
  } else if (sort === "ztoa") {
    sortedCourseList.sort((a, b) => b.courseTitle.localeCompare(a.courseTitle));
  }

  const handleFilter = (category, value) => {
    // console.log(category, value)
    let copyFilter = { ...filter };
    const indexOfCategory = Object.keys(copyFilter).indexOf(category);

    if (indexOfCategory == -1) {
      copyFilter = { ...copyFilter, [category]: [value] };
    } else {
      const indexOfValue = copyFilter[category].indexOf(value);
      if (indexOfValue == -1) {
        copyFilter[category].push(value);
      } else {
        copyFilter[category].splice(indexOfValue, 1);
      }
    }
    setFilter(copyFilter);
    sessionStorage.setItem("filter", JSON.stringify(copyFilter));
    console.log(filter);
  };

  useEffect(() => {
    setFilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, []);

  //.............................................Setting Search Params.........................................
  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter]);

  // console.log(userCourseData);

  return (
    <div className="relative w-screen min-h-screen block xl:flex gap-5 ">
      <div className="fixed block xl:hidden top-24 ">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-stone-900 backdrop-blur-[10px] text-white py-2 px-4  text-sm font-medium">
            Filter
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] h-[400px] bg-black/20 backdrop-blur-[10px] text-white p-4 rounded-lg border border-gray-700 overflow-y-auto">
            <CourseFilters filter={filter} handleFilter={handleFilter} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden xl:block w-1/6 border-l border-[1px] border-slate-700 p-5 text-white spacey-y-5">
        <h1 className="text-2xl font-bold">All Courses</h1>
        <h2 className="w-[350px] text-lg font-bold text-slate-500 mt-5 flex items-center gap-2">
          Filter by <HiArrowLongDown />
        </h2>
        <CourseFilters filter={filter} handleFilter={handleFilter} />
      </div>
      <div className="w-screen flex flex-col flex-1 p-5">
        <div className="w-full h-[100px] text-white flex items-center justify-center md:justify-end gap-5 pr-10">
          <DropdownMenu>
            <DropdownMenuTrigger className=" text-[10px] xl:text-sm flex items-center  font-semibold border-[2px] border-slate-600 rounded-lg p-2">
              <BiSort />
              Sort by
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/20 backdrop-blur-[10px] text-white border-slate-700">
              <DropdownMenuItem onClick={() => handleSort("lowtohigh")}>
                <BsSortUp /> Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("hightolow")}>
                {" "}
                <BsSortUpAlt /> High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("atoz")}>
                {" "}
                <BsSortAlphaDown /> A to Z
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("ztoa")}>
                <BsSortAlphaUp /> Z to A
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="text-white">{sortedCourseList.length} Results</div>
        </div>

        <div className="w-full flex flex-col gap-5 px-0 sm:px-12 md:px-20 lg:px-0">
          {isLoading ? (
            <div className="w-full h-[400px] flex items-center justify-center">
              <PulseLoader size={13} color="#c026dc" speedMultiplier={0.7} />
            </div>
          ) : sortedCourseList.length > 0 ? (
            sortedCourseList.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/home/courses/${item._id}`)}
                className="w-full flex flex-col  lg:flex-row items-start lg:items-center gap-5 border-[1px] border-slate-700 rounded-xl p-5 text-white cursor-pointer  "
              >
                <div className="w-full sm:w-full lg:w-[310px] flex-shrink-0">
                  <img
                    src={item.thumbnail?.image || "default-image-url.jpg"}
                    className="w-full h-[190px] object-cover rounded-lg "
                    alt={item.courseTitle || "Course Thumbnail"}
                  />
                </div>
                <div className="w-full lg:min-w-0">
                  <h3 className="text-xl flex flex-col lg:flex-row items-start lg:items-center justify-between font-bold tracking-wide my-5 ">
                    <span className="truncate text-wrap">
                      {item.courseTitle || "Untitled Course"}
                    </span>
                    <p className="text-sm text-slate-500 mt-2 lg:mt-0 whitespace-nowrap text-wrap">
                      Last Updated: {item.date || "No Date"}
                    </p>
                  </h3>
                  <p className="text-blue-300 text-sm">
                    {item.subtitle || "No Subtitle"}
                  </p>
                  <p className="text-green-500">
                    {item.category || "Uncategorized"}
                  </p>
                  <p className="text-sm text-justify w-full text-slate-500 line-clamp-2">
                    {item.description || "No Description Available."}
                  </p>
                  <p className="text-sm text-violet-500">
                    {item.level || "No Level"}
                  </p>
                  <p className="text-md font-bold text-green-500 my-5">
                    ${item.price || "Free"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-3xl font-bold flex flex-col items-center justify-center gap-5">
              <p className="text-6xl">
                <TfiFaceSad />
              </p>
              <p className="text-center">
                No courses found matching the selected criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCourses;

// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import CourseFilters from "./CoursesUtils/CourseFilters.jsx";
// import { HiArrowLongDown } from "react-icons/hi2";
// import { BiSort } from "react-icons/bi";
// import { BsSortAlphaDown } from "react-icons/bs";
// import { BsSortAlphaUp } from "react-icons/bs";
// import { BsSortUp } from "react-icons/bs";
// import { BsSortUpAlt } from "react-icons/bs";
// import { TfiFaceSad } from "react-icons/tfi";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { useDispatch, useSelector } from "react-redux";
// import { getAllCourses } from "@/Redux/user/UserSlice.js";
// import { useNavigate } from "react-router-dom";
// import { PulseLoader } from "react-spinners";
// import { Button } from "@/components/ui/button.jsx";

// const createSearchParamsHelper = (filterParams) => {
//   const queryParams = [];

//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       const paramValue = value.join(",");
//       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//     }
//   }

//   return queryParams.join("&");
// };

// const UserCourses = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userCourseData, isLoading } = useSelector((state) => state.userSlice);

//   const [filter, setFilter] = useState({});
//   const [sort, setSort] = useState("lowtohigh");
//   const [searchParams, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     if (Object.keys(filter).length > 0) {
//       dispatch(getAllCourses({ filter: filter }));
//     } else {
//       dispatch(getAllCourses({ filter: {} }));
//     }
//   }, [dispatch, filter]);

//   const handleSort = (value) => {
//     setSort(value);
//   };

//   const sortedCourseList = [...userCourseData];
//   if (sort === "lowtohigh") {
//     sortedCourseList.sort((a, b) => a.price - b.price);
//   } else if (sort === "hightolow") {
//     sortedCourseList.sort((a, b) => b.price - a.price);
//   } else if (sort === "atoz") {
//     sortedCourseList.sort((a, b) => a.courseTitle.localeCompare(b.courseTitle));
//   } else if (sort === "ztoa") {
//     sortedCourseList.sort((a, b) => b.courseTitle.localeCompare(a.courseTitle));
//   }

//   const handleFilter = (category, value) => {
//     // console.log(category, value)
//     let copyFilter = { ...filter };
//     const indexOfCategory = Object.keys(copyFilter).indexOf(category);

//     if (indexOfCategory == -1) {
//       copyFilter = { ...copyFilter, [category]: [value] };
//     } else {
//       const indexOfValue = copyFilter[category].indexOf(value);
//       if (indexOfValue == -1) {
//         copyFilter[category].push(value);
//       } else {
//         copyFilter[category].splice(indexOfValue, 1);
//       }
//     }
//     setFilter(copyFilter);
//     sessionStorage.setItem("filter", JSON.stringify(copyFilter));
//     console.log(filter);
//   };

//   useEffect(() => {
//     setFilter(JSON.parse(sessionStorage.getItem("filter")) || {});
//   }, []);

//   //.............................................Setting Search Params.........................................
//   useEffect(() => {
//     if (filter && Object.keys(filter).length > 0) {
//       const createQueryString = createSearchParamsHelper(filter);
//       setSearchParams(new URLSearchParams(createQueryString));
//     }
//   }, [filter]);

//   // console.log(userCourseData);

//   return (
//     <div className="relative w-screen min-h-screen block xl:flex gap-5 ">
//       <div className="fixed block xl:hidden top-24 ">
//         <DropdownMenu>
//           <DropdownMenuTrigger className="bg-stone-900 backdrop-blur-[10px] text-white py-2 px-4  text-sm font-medium">
//             Filter
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-[300px] h-[400px] bg-black/20 backdrop-blur-[10px] text-white p-4 rounded-lg border border-gray-700 overflow-y-auto">
//             <CourseFilters filter={filter} handleFilter={handleFilter} />
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="hidden xl:block w-1/6 border-l border-[1px] border-slate-700 p-5 text-white spacey-y-5">
//         <h1 className="text-2xl font-bold">All Courses</h1>
//         <h2 className="w-[350px] text-lg font-bold text-slate-500 mt-5 flex items-center gap-2">
//           Filter by <HiArrowLongDown />
//         </h2>
//         <CourseFilters filter={filter} handleFilter={handleFilter} />
//       </div>
//       <div className="w-screen flex flex-col flex-1 p-5">
//         <div className="w-full h-[100px] text-white flex items-center justify-end gap-5 pr-10">
//           <DropdownMenu>
//             <DropdownMenuTrigger className=" text-[10px] xl:text-sm flex items-center font-semibold border-[2px] border-slate-600 rounded-lg p-2">
//               <BiSort />
//               Sort by
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="bg-black/20 backdrop-blur-[10px] text-white border-slate-700">
//               <DropdownMenuItem onClick={() => handleSort("lowtohigh")}>
//                 <BsSortUp /> Low to High
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => handleSort("hightolow")}>
//                 {" "}
//                 <BsSortUpAlt /> High to Low
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => handleSort("atoz")}>
//                 {" "}
//                 <BsSortAlphaDown /> A to Z
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => handleSort("ztoa")}>
//                 <BsSortAlphaUp /> Z to A
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <div className="text-white">{sortedCourseList.length} Results</div>
//         </div>

//         <div className="w-full flex flex-col  gap-5">
//           {isLoading ? (
//             <div className="w-full h-[400px] flex items-center justify-center">
//               <PulseLoader size={13} color="#c026dc" speedMultiplier={0.7} />
//             </div>
//           ) : sortedCourseList.length > 0 ? (
//             sortedCourseList.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => navigate(`/home/courses/${item._id}`)}
//                 className="w-full h-[250px] flex items-center gap-5 border-[1px] border-slate-700 rounded-xl p-5 text-white cursor-pointer"
//               >
//                 <div className="w-[310px]">
//                   <img
//                     src={item.thumbnail?.image || "default-image-url.jpg"}
//                     className="w-full h-[190px] object-cover"
//                     alt={item.courseTitle || "Course Thumbnail"}
//                   />
//                 </div>

//                 <div>
//                   <h3 className="text-xl flex items-center justify-between font-bold tracking-wide my-5">
//                     {item.courseTitle || "Untitled Course"}
//                     <p className="text-sm text-slate-500">
//                       Last Updated: {item.date || "No Date"}
//                     </p>
//                   </h3>
//                   <p className="text-blue-300 text-sm">
//                     {item.subtitle || "No Subtitle"}
//                   </p>
//                   <p className="text-green-500">
//                     {item.category || "Uncategorized"}
//                   </p>
//                   <p className="text-sm text-justify w-[800px] text-slate-500 line-clamp-2">
//                     {item.description || "No Description Available."}
//                   </p>
//                   <p className="text-sm text-violet-500">
//                     {item.level || "No Level"}
//                   </p>
//                   <p className="text-md font-bold text-green-500 my-5">
//                     ${item.price || "Free"}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-white text-3xl font-bold flex flex-col items-center justify-center gap-5 ">
//               <p className="text-6xl">
//                 <TfiFaceSad />
//               </p>
//               <p>No courses found matching the selected criteria.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCourses;
