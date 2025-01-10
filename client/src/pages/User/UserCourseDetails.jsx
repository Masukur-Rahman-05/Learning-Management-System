// import React, {useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getCourseDetails } from "@/Redux/user/UserSlice.js";
// import { useDispatch, useSelector } from "react-redux";
// import { PulseLoader } from "react-spinners";

// import { GiCheckMark } from "react-icons/gi";
// import { SlGlobe } from "react-icons/sl";
// import { CiPlay1 } from "react-icons/ci";
// import { IoLockClosedOutline } from "react-icons/io5";

// import VideoPlayer from "@/Config/video/VideoPlayer.jsx";
// import { Button } from "@/components/ui/button";
// import { createOrder } from "@/Redux/user/UserPaymentSlice.js";
// const UserCourseDetails = () => {

//   const [approvalUrl, setApprovalUrl] = useState('');
//   const [orderId, setOrderId] = useState('');
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate()

//   const { userCourseDetails, isLoading } = useSelector(
//     (state) => state.userSlice
//   );

//   const {user} = useSelector((state)=>state.auth)

//   const freePreviewVideoUrlIndex =
//     userCourseDetails?.curriculum?.findIndex((item) => item.freePreview) ?? -1;
//   const freePreviewVideoUrl =
//     freePreviewVideoUrlIndex !== -1 &&
//     userCourseDetails?.curriculum[freePreviewVideoUrlIndex]?.videoUrl;

//   useEffect(() => {

//     const fetchDetails = async () => {
//       const result = await dispatch(getCourseDetails({ id: id, userId: user?.id }));

//       if (result?.payload?.success && result?.payload?.isCoursePurchased) {
//         navigate(`/home/course-progress/${result?.payload?.courseId}`);
//       }
//       console.log(result.payload)
//     }

//     fetchDetails()
//   }, [dispatch]);


//   const handleEnrollNow = async () => {
//     try {

//       const paymentPayload = {
//         userId: user.id,
//         userName: user.username,
//         userEmail: user.email,
//         orderStatus: 'pending',
//         paymentMethod: 'paypal',
//         paymentStatus: 'initiated',
//         orderDate: new Date(),
//         paymentId: '',
//         payerId: '',
//         courseImage: userCourseDetails?.thumbnail.image,
//         courseTitle: userCourseDetails?.courseTitle,
//         courseId: userCourseDetails?._id,
//         coursePricing: userCourseDetails?.price,
//       };

//       const result = await dispatch(createOrder({ paymentData: paymentPayload }))

//       if (result?.payload?.success) {

//         sessionStorage.setItem('currentOrderId', JSON.stringify(result?.payload?.data?.orderId))

        
//         setApprovalUrl(result?.payload?.data?.approveUrl)
//         setOrderId(result?.payload?.data?.orderId)
//       }

      
//     } catch (error) {

//       console.log(error.message)
      
//     }
//   }

//   if (approvalUrl !== '') {
//     window.location.href = approvalUrl
//   }

//   return (
//     <div className="w-screen min-h-screen flex flex-col gap-5 text-white">
//       {isLoading ? (
//         <div className="w-full h-[700px] flex items-center justify-center">
//           <PulseLoader size={13} color="#c026dc" speedMultiplier={0.7} />
//         </div>
//       ) : (
//         <div className="w-full h-full flex flex-col gap-5 p-10">
//           <div className="w-full h-[250px] bg-transparent border-[2px] border-slate-500 rounded-2xl p-8 space-y-4">
//             <h1 className="text-3xl font-bold flex items-center gap-4">
//               {userCourseDetails?.courseTitle}
//               <span className="text-sm text-yellow-400 flex items-center gap-1">
//                 <SlGlobe /> {userCourseDetails?.language}
//               </span>
//             </h1>

//             <p className="text-sm text-slate-400">
//               {userCourseDetails?.subtitle}
//             </p>
//             <div>
//               <p className="text-md text-green-500">
//                 {userCourseDetails?.category}
//               </p>
//               <p className="text-md text-violet-500">
//                 {userCourseDetails?.level}
//               </p>
//             </div>
//             <div className="flex items-center gap-8 font-bold">
//               <p className="text-md text-slate-500 flex items-center gap-2">
//                 Last Update : {userCourseDetails?.date}
//               </p>
//               <p className="text-md text-slate-500 flex items-center gap-2">
//                 Total Students : {userCourseDetails?.students?.length}
//               </p>
//             </div>
//           </div>

//           <div className="w-full h-full flex justify-center  gap-5">
//             {/* Left Side Div Start */}
//             <div className="w-1/2">
//               {/*What You will Learn */}
//               <div className="w-full flex-flex-col gap-8 border-[2px] border-slate-500 rounded-2xl p-8 relative">
//                 <div className="absolute w-36 h-36 rounded-full bg-yellow-700 top-[200px] -right-20 blur-3xl  "></div>
//                 <h1 className="text-lg text-green-500 tracking-wider">
//                   What You will learn
//                 </h1>

//                 <div className="flex flex-wrap gap-5 ml-5 mt-5">
//                   <p className="flex items-center gap-2 text-slate-500">
//                     {" "}
//                     <GiCheckMark className="text-green-500" />{" "}
//                     {userCourseDetails?.courseTitle}
//                   </p>
//                   <p className="flex items-center gap-2 text-slate-500">
//                     {" "}
//                     <GiCheckMark className="text-green-500" />{" "}
//                     {userCourseDetails?.courseTitle}
//                   </p>
//                   <p className="flex items-center gap-2 text-slate-500">
//                     {" "}
//                     <GiCheckMark className="text-green-500" />{" "}
//                     {userCourseDetails?.courseTitle}
//                   </p>
//                   <p className="flex items-center gap-2 text-slate-500">
//                     {" "}
//                     <GiCheckMark className="text-green-500" />{" "}
//                     {userCourseDetails?.courseTitle}
//                   </p>
//                   <p className="flex items-center gap-2 text-slate-500">
//                     {" "}
//                     <GiCheckMark className="text-green-500" />{" "}
//                     {userCourseDetails?.courseTitle}
//                   </p>
//                 </div>
//               </div>

//               <div className="w-full my-5">
//                 <h1 className="my-5 text-2xl text-green-500 tracking-wider">
//                   Course Details
//                 </h1>
//                 <p className="text-slate-500 w-full text-justify">
//                   {userCourseDetails?.description}
//                 </p>
//               </div>
//             </div>
//             {/* Left Side Div End */}
//             {/*Right Side Div Start */}
//             <div className="w-1/2  flex flex-col pl-24 gap-4 relative">
//               <div className="absolute w-36 h-36 rounded-full bg-violet-700 bottom-0 right-0 blur-3xl  "></div>
//               <div className="w-full h-[300px] ml-5 ">
//                 {freePreviewVideoUrlIndex !== -1 ? (
//                   <VideoPlayer
//                     url={freePreviewVideoUrl}
//                     width="75%"
//                     height="100%"
//                   />
//                 ) : (
//                   <p className="text-xl text-slate-500 font-bold">
//                     No preview available
//                   </p>
//                 )}
//               </div>

//               <div className="my-10 border-[2px] border-slate-500 rounded-2xl p-8">
//                 <h1 className="text-xl font-bold text-green-500 tracking-wider mb-4">
//                   Course Curriculum
//                 </h1>
//                 <div className="space-y-4">
//                   {userCourseDetails?.curriculum?.map((item, index) => {
//                     return (
//                       <div
//                         key={index}
//                         className="flex items-center gap-2 text-slate-500 font-bold"
//                       >
//                         {item?.freePreview ? (
//                           <CiPlay1 />
//                         ) : (
//                           <IoLockClosedOutline />
//                         )}
//                         <p className=" ">{item?.title}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <p className="text-2xl font-bold text-green-500 mt-5">
//                   ${userCourseDetails?.price}
//                 </p>
//               </div>

//               <Button
//                 className="bg-violet-700 hover:bg-violet-900"
//                 onClick={handleEnrollNow}
//               >
//                 Enroll Now
//               </Button>
//             </div>
//             {/*Right Side Div End */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserCourseDetails;









import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseDetails } from "@/Redux/user/UserSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

import { GiCheckMark } from "react-icons/gi";
import { SlGlobe } from "react-icons/sl";
import { CiPlay1 } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";

import VideoPlayer from "@/Config/video/VideoPlayer.jsx";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/Redux/user/UserPaymentSlice.js";
const UserCourseDetails = () => {
  const [approvalUrl, setApprovalUrl] = useState("");
  const [orderId, setOrderId] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userCourseDetails, isLoading } = useSelector(
    (state) => state.userSlice
  );

  const { user } = useSelector((state) => state.auth);

  const freePreviewVideoUrlIndex =
    userCourseDetails?.curriculum?.findIndex((item) => item.freePreview) ?? -1;
  const freePreviewVideoUrl =
    freePreviewVideoUrlIndex !== -1 &&
    userCourseDetails?.curriculum[freePreviewVideoUrlIndex]?.videoUrl;

  useEffect(() => {
    const fetchDetails = async () => {
      const result = await dispatch(
        getCourseDetails({ id: id, userId: user?.id })
      );

      if (result?.payload?.success && result?.payload?.isCoursePurchased) {
        navigate(`/course-progress/${result?.payload?.courseId}`);
      }
      console.log(result.payload);
    };

    fetchDetails();
  }, [dispatch]);

  const handleEnrollNow = async () => {
    try {
      const paymentPayload = {
        userId: user.id,
        userName: user.username,
        userEmail: user.email,
        orderStatus: "pending",
        paymentMethod: "paypal",
        paymentStatus: "initiated",
        orderDate: new Date(),
        paymentId: "",
        payerId: "",
        courseImage: userCourseDetails?.thumbnail.image,
        courseTitle: userCourseDetails?.courseTitle,
        courseId: userCourseDetails?._id,
        coursePricing: userCourseDetails?.price,
      };

      const result = await dispatch(
        createOrder({ paymentData: paymentPayload })
      );

      if (result?.payload?.success) {
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(result?.payload?.data?.orderId)
        );

        setApprovalUrl(result?.payload?.data?.approveUrl);
        setOrderId(result?.payload?.data?.orderId);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 text-white">
      {isLoading ? (
        <div className="w-full h-[700px] flex items-center justify-center">
          <PulseLoader size={13} color="#c026dc" speedMultiplier={0.7} />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-5 p-5 md:p-10">
          <div className="w-full h-auto bg-transparent border-[2px] border-slate-500 rounded-2xl p-8 space-y-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-4">
              {userCourseDetails?.courseTitle}
              <span className="text-[10px] md:text-sm text-yellow-400 flex items-center gap-1">
                <SlGlobe /> {userCourseDetails?.language}
              </span>
            </h1>

            <p className="text-[10px] lg:text-sm text-slate-400">
              {userCourseDetails?.subtitle}
            </p>
            <div>
              <p className="text-[12px] lg:text-[16px] text-green-500">
                {userCourseDetails?.category}
              </p>
              <p className="text-[12px] lg:text-[16px] text-violet-500">
                {userCourseDetails?.level}
              </p>
            </div>
            <div className="text-[12px] lg:text-[16px] flex items-center gap-8 font-bold">
              <p className=" text-slate-500 flex items-center gap-2">
                Last Update : {userCourseDetails?.date}
              </p>
              <p className="text-slate-500 flex items-center gap-2">
                Total Students : {userCourseDetails?.students?.length}
              </p>
            </div>
          </div>

          <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center gap-5">
            {/* Left Side Div Start */}
            <div className="w-full lg:w-1/2">
              {/*What You will Learn */}
              <div className="w-full flex-flex-col gap-8 border-[2px] border-slate-500 rounded-2xl p-8 relative">
                <div className="absolute w-36 h-36 rounded-full bg-yellow-700 top-[200px] -right-20 blur-3xl  "></div>
                <h1 className="text-[16px] lg:text-lg text-green-500 tracking-wider">
                  What You will learn
                </h1>

                <div className="text-[12px] lg:text-base flex flex-wrap gap-5 ml-5 mt-5 ">
                  <p className="flex items-center gap-2 text-slate-500">
                    {" "}
                    <GiCheckMark className="text-green-500" />{" "}
                    {userCourseDetails?.courseTitle}
                  </p>
                  <p className="flex items-center gap-2 text-slate-500">
                    {" "}
                    <GiCheckMark className="text-green-500" />{" "}
                    {userCourseDetails?.courseTitle}
                  </p>
                  <p className="flex items-center gap-2 text-slate-500">
                    {" "}
                    <GiCheckMark className="text-green-500" />{" "}
                    {userCourseDetails?.courseTitle}
                  </p>
                  <p className="flex items-center gap-2 text-slate-500">
                    {" "}
                    <GiCheckMark className="text-green-500" />{" "}
                    {userCourseDetails?.courseTitle}
                  </p>
                  <p className="flex items-center gap-2 text-slate-500">
                    {" "}
                    <GiCheckMark className="text-green-500" />{" "}
                    {userCourseDetails?.courseTitle}
                  </p>
                </div>
              </div>

              <div className="w-full my-5">
                <h1 className="my-5  text-green-500 tracking-wider text-[16px] lg:text-2xl font-bold">
                  Course Details
                </h1>
                <p className="text-slate-500 w-full text-justify text-[10px] lg:text-base">
                  {userCourseDetails?.description}
                </p>
              </div>
            </div>
            {/* Left Side Div End */}
            {/*Right Side Div Start */}
            <div className="w-full lg:w-1/2  flex flex-col justify-center items-center  pl-0 lg:pl-24 gap-4 relative">
              <div className="absolute w-36 h-36 rounded-full bg-violet-700 bottom-0 right-0 blur-3xl  "></div>
              <div className="w-full h-[300px] lg:ml-5 ">
                {freePreviewVideoUrlIndex !== -1 ? (
                  <VideoPlayer
                    url={freePreviewVideoUrl}
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <p className="text-xl text-slate-500 font-bold">
                    No preview available
                  </p>
                )}
              </div>

              <div className="w-full my-10 border-[2px] border-slate-500 rounded-2xl p-8">
                <h1 className=" text-green-500 tracking-wider mb-4 text-[16px] lg:text-2xl font-bold">
                  Course Curriculum
                </h1>
                <div className="space-y-4 ">
                  {userCourseDetails?.curriculum?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-slate-500 text-[12px] lg:text-base font-bold"
                      >
                        {item?.freePreview ? (
                          <CiPlay1 />
                        ) : (
                          <IoLockClosedOutline />
                        )}
                        <p className=" ">{item?.title}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-2xl font-bold text-green-500 mt-5">
                  ${userCourseDetails?.price}
                </p>
              </div>

              <Button
                className="bg-violet-700 hover:bg-violet-900"
                onClick={handleEnrollNow}
              >
                Enroll Now
              </Button>
            </div>
            {/*Right Side Div End */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCourseDetails;

