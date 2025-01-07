// import React, { useRef, useState } from "react";
// import { category, language } from "./HomeElements.js";
// import Marquee from "react-fast-marquee";


// const HomeCategory = () => {
//   return (
//     <div className="w-[90%] flex flex-col items-center justify-center gap-10 mt-32">
//       <Marquee
        
//         direction="right"
        
//       >
//         {category?.map((item, index) => {
//           return (
//             <div key={index}>
//               <div className=" w-[150px] h-[80px] flex items-center justify-center text-center mx-2 bg-slate-900 rounded-lg">
//                 <p className="text-white text-wrap">{item}</p>
//               </div>
//             </div>
//           );
//         })}
//       </Marquee>
//       <Marquee
        
//         direction="left"
        
//       >
//         {language?.map((item, index) => {
//           return (
//             <div key={index}>
//               <div className=" w-[150px] h-[50px] flex items-center justify-center text-center mx-2 bg-slate-900 rounded-lg">
//                 <p className="text-white text-wrap">{item}</p>
//               </div>
//             </div>
//           );
//         })}
//       </Marquee>
//     </div>
//   );
// };

// export default HomeCategory;



import React from "react";
import { category, language } from "./HomeElements.js";
import Marquee from "react-fast-marquee";

const HomeCategory = () => {
  return (
    <div className="w-[95%] md:w-[90%] flex flex-col items-center justify-center gap-10 mt-16 md:mt-32">
      {/* Categories Marquee */}
      <Marquee direction="right" speed={50} className="w-full">
        {category?.map((item, index) => (
          <div key={index} className="mx-2">
            <div className="w-[120px] md:w-[150px] h-[60px] md:h-[80px] flex items-center justify-center text-center bg-slate-900 rounded-lg">
              <p className="text-sm md:text-base text-white">{item}</p>
            </div>
          </div>
        ))}
      </Marquee>

      {/* Languages Marquee */}
      <Marquee direction="left" speed={50} className="w-full">
        {language?.map((item, index) => (
          <div key={index} className="mx-2">
            <div className="w-[120px] md:w-[150px] h-[40px] md:h-[50px] flex items-center justify-center text-center bg-slate-900 rounded-lg">
              <p className="text-sm md:text-base text-white">{item}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default HomeCategory;

