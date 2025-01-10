import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;


const initialState = {
  CourseProgressData: {},
  MarkedCourseProgressData: {},
  isLoading: false,
};


export const getCourseProgress = createAsyncThunk(
  "courseProgressSlice/getCourseProgress",
  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/api/user/courses/progress/get/${courseId}/${userId}`
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to get course progress from frontend" + error.message
      );
    }
  }
);


//...........................Mark Course.....................................
export const markCourseProgress = createAsyncThunk(
  "courseProgressSlice/markCourseProgress",
  async ({ userId, courseId, lectureId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}/api/user/courses/progress/mark-progress`,
        { userId, courseId, lectureId }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to mark course progress from frontend" + error.message
      );
    }
  }
);


//........................................Reset Course Progress...............................
export const resetCourseProgress = createAsyncThunk(
  "courseProgressSlice/resetCourseProgress",
  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}/api/user/courses/progress/reset-progress`,
        { courseId, userId }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to reset course progress from frontend" + error.message
      );
    }
  }
);

const CourseProgressSlice = createSlice({
  name: "courseProgressSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getCourseProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.CourseProgressData = action.payload.data;
      })
      .addCase(getCourseProgress.rejected, (state) => {
        state.isLoading = false;
        state.CourseProgressData = {};
      })
      .addCase(markCourseProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markCourseProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.MarkedCourseProgressData = action.payload.data;
      })
      .addCase(markCourseProgress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(resetCourseProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetCourseProgress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(resetCourseProgress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default CourseProgressSlice.reducer;
