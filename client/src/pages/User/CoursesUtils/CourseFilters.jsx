
// import React, { useEffect } from "react";
// import { filterItems } from "./CourseElements.js";

// import { Label } from "@/components/ui/label.jsx";
// import { Checkbox } from "@/components/ui/checkbox";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const CourseFilters = ({ filter, handleFilter }) => {
    
    
//   return (
//     <div>
//       {Object.entries(filterItems).map(([filterKey, filterValues]) => (
//         <div key={filterKey} className="space-y-5 my-5">
//           {/* Section Header */}
//           <h2 className="text-xl font-bold text-white capitalize">
//             {filterKey}
//           </h2>
//           {/* Filter Options */}
//           <div className="flex flex-col justify-center gap-3 ml-3">
//             {filterValues.map((item) => (
//               <Label
//                 key={item.id}
//                 className="flex  items-center gap-2 text-white"
//               >
//                 <Checkbox
//                   className="border-white"
//                   value={item.id}
//                   onCheckedChange={() => handleFilter(filterKey, item.id)}
//                   checked={filter?.[filterKey]?.includes(item.id) || false}
//                 />
//                 {item.label}
//               </Label>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseFilters;






// import React, { useState } from "react";
// import { filterItems } from "./CourseElements.js";
// import { Label } from "@/components/ui/label.jsx";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const CourseFilters = ({ filter, handleFilter}) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <div>
//       {/* Button for smaller devices */}
//       <div className="block xl:hidden">
//         <DropdownMenu>
//           <DropdownMenuTrigger
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-md"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           >
//             Filter
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="h-[400px] md:h-auto bg-gray-900 text-white p-4 rounded-lg border border-gray-700 flex flex-col md:flex-row overflow-y-auto ">
//             {Object.entries(filterItems).map(([filterKey, filterValues]) => (
//               <div key={filterKey} className=" space-y-5 my-5">
//                 {/* Section Header */}
//                 <h2 className="text-lg font-bold capitalize">{filterKey}</h2>
//                 {/* Filter Options */}
//                 <div className="flex flex-col gap-3 ml-3">
//                   {filterValues.map((item) => (
//                     <Label key={item.id} className="flex items-center gap-2">
//                       <Checkbox
//                         className="border-white"
//                         value={item.id}
//                         onCheckedChange={() => handleFilter(filterKey, item.id)}
//                         checked={
//                           filter?.[filterKey]?.includes(item.id) || false
//                         }
//                       />
//                       {item.label}
//                     </Label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {/* Full filter options for larger screens */}
//       <div className="hidden xl:block">
//         {Object.entries(filterItems).map(([filterKey, filterValues]) => (
//           <div key={filterKey} className="space-y-5 my-5">
//             {/* Section Header */}
//             <h2 className="text-xl font-bold text-white capitalize">
//               {filterKey}
//             </h2>
//             {/* Filter Options */}
//             <div className="flex flex-col justify-center gap-3 ml-3">
//               {filterValues.map((item) => (
//                 <Label
//                   key={item.id}
//                   className="flex items-center gap-2 text-white"
//                 >
//                   <Checkbox
//                     className="border-white"
//                     value={item.id}
//                     onCheckedChange={() => handleFilter(filterKey, item.id)}
//                     checked={filter?.[filterKey]?.includes(item.id) || false}
//                   />
//                   {item.label}
//                 </Label>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseFilters;





import React from "react";
import { filterItems } from "./CourseElements.js";
import { Label } from "@/components/ui/label.jsx";
import { Checkbox } from "@/components/ui/checkbox";

const CourseFilters = ({ filter, handleFilter }) => {
  const FilterContent = () => (
    <div className="space-y-5">
      {Object.entries(filterItems).map(([filterKey, filterValues]) => (
        <div key={filterKey} className="space-y-3">
          <h2 className="text-lg font-bold capitalize text-white">
            {filterKey}
          </h2>
          <div className="flex flex-col gap-3 ml-3">
            {filterValues.map((item) => (
              <Label
                key={item.id}
                className="flex items-center gap-2 text-white"
              >
                <Checkbox
                  className="border-white"
                  value={item.id}
                  onCheckedChange={() => handleFilter(filterKey, item.id)}
                  checked={filter?.[filterKey]?.includes(item.id) || false}
                />
                {item.label}
              </Label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return <FilterContent />;
};

export default CourseFilters;