import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './auth/authSlice.js'
import CourseUploadSlice from './admin/CourseUpload.js'
import AdminSlice from './admin/CourseSlice.js'
import UserSlice from './user/UserSlice.js'
import UserPaymentSlice from './user/UserPaymentSlice.js'
import UserPaidCourseSlice from './user/UserPaidCourseSlice.js'
import CourseProgressSlice from './user/CourseProgressSlice.js'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    adminCourse: CourseUploadSlice,
    adminSlice: AdminSlice,
    userSlice: UserSlice,
    userPaymentSlice: UserPaymentSlice,
    userPaidCourseSlice: UserPaidCourseSlice,
    CourseProgress: CourseProgressSlice,
  },
});
