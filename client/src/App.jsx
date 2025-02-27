// import React, { useEffect } from "react";
// import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
// import AuthPage from "./components/Auth/AuthPage";
// import LoginRegistration from "./pages/Auth/LoginRegistration";
// import AdminLayout from "./components/Admin/AdminLayout.jsx";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import AdminCourses from "./pages/Admin/AdminCourses";
// import UserLayout from "./components/User/UserLayout.jsx";
// import UserHome from "./pages/User/UserHome.jsx";
// import UserCourses from "./pages/User/UserCourses.jsx";
// import UserContact from "./pages/User/UserContact.jsx";
// import { useSelector, useDispatch } from "react-redux";
// import RouteGuard from "./components/Auth/RouteGuard.jsx";
// import { checkAuth } from "./Redux/auth/authSlice.js";
// import AddNewCourse from "./pages/Admin/AddNewCourse.jsx";
// import UserCourseDetails from "./pages/User/UserCourseDetails.jsx";
// import PaypalPaymentReturn from "./pages/User/PaypalPaymentReturn.jsx";
// import UserMyCourses from "./pages/User/UserMyCourses.jsx";
// import UserCourseProgress from "./pages/User/UserCourseProgress.jsx";

// const App = () => {
//   const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth)
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkAuth())
//   },[dispatch])

//   return (
//     <div className="overflow-x-hidden ">
//       <Routes>

//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               user?.role === "admin" ? (
//                 <Navigate to="/admin" />
//               ) : (
//                 <Navigate to="/home" />
//               )
//             ) : (
//               <Navigate to="/auth" />
//             )
//           }
//         />
//         <Route
//           path="/auth"
//           element={
//             <RouteGuard isAuthenticated={isAuthenticated} user={user}>
//               <AuthPage />
//             </RouteGuard>
//           }
//         >
//           <Route index element={<LoginRegistration />} />
//         </Route>

//         <Route
//           path="/admin"
//           element={
//             <RouteGuard isAuthenticated={isAuthenticated} user={user}>
//               <AdminLayout />
//             </RouteGuard>
//           }
//         >
//           <Route index element={<AdminDashboard />} />
//           <Route path="courses" element={<AdminCourses />} />
//           <Route path="edit/:id" element={<AddNewCourse />} />
//           <Route path="add-new-course" element={<AddNewCourse />} />
//         </Route>

//         <Route
//           path="/home"
//           element={
//             <RouteGuard isAuthenticated={isAuthenticated} user={user}>
//               <UserLayout />
//             </RouteGuard>
//           }
//         >
//           <Route index element={<UserHome />} />
//           <Route path="courses" element={<UserCourses />} />
//           <Route path="courses/:id" element={<UserCourseDetails />} />
//           <Route path="contact" element={<UserContact />} />
//           <Route path="my-courses" element={<UserMyCourses />} />
//           <Route path="course-progress/:id" element={<UserCourseProgress />} />
//         </Route>
//         <Route path="payment-return" element={<PaypalPaymentReturn />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AuthPage from "./components/Auth/AuthPage";
import LoginRegistration from "./pages/Auth/LoginRegistration";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCourses from "./pages/Admin/AdminCourses";
import UserLayout from "./components/User/UserLayout.jsx";
import UserHome from "./pages/User/UserHome.jsx";
import UserCourses from "./pages/User/UserCourses.jsx";
import UserContact from "./pages/User/UserContact.jsx";
import { useSelector, useDispatch } from "react-redux";
import RouteGuard from "./components/Auth/RouteGuard.jsx";
import { checkAuth } from "./Redux/auth/authSlice.js";
import AddNewCourse from "./pages/Admin/AddNewCourse.jsx";
import UserCourseDetails from "./pages/User/UserCourseDetails.jsx";
import PaypalPaymentReturn from "./pages/User/PaypalPaymentReturn.jsx";
import UserMyCourses from "./pages/User/UserMyCourses.jsx";
import UserCourseProgress from "./pages/User/UserCourseProgress.jsx";
import { PulseLoader } from "react-spinners";

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="bg-slate-950 w-screen h-screen flex items-center justify-center">
        <PulseLoader size={13} color="#c026dc" speedMultiplier={0.7} />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden ">
      <Routes>
        <Route
          path="/auth"
          element={
            <RouteGuard isAuthenticated={isAuthenticated} user={user}>
              <AuthPage />
            </RouteGuard>
          }
        >
          <Route index element={<LoginRegistration />} />
        </Route>

        <Route
          path="/admin"
          element={
            <RouteGuard isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </RouteGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="edit/:id" element={<AddNewCourse />} />
          <Route path="add-new-course" element={<AddNewCourse />} />
        </Route>

        <Route
          path="/"
          element={
            <RouteGuard isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </RouteGuard>
          }
        >
          <Route index element={<UserHome />} />
          <Route path="courses" element={<UserCourses />} />
          <Route path="courses/:id" element={<UserCourseDetails />} />
          <Route path="contact" element={<UserContact />} />
          <Route path="my-courses" element={<UserMyCourses />} />
          <Route path="course-progress/:id" element={<UserCourseProgress />} />
        </Route>
        <Route path="payment-return" element={<PaypalPaymentReturn />} />
      </Routes>
    </div>
  );
};

export default App;
