import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL=import.meta.env.VITE_BASE_URL

const initialState = {
  courseData: [],
  courseDetails: {},
  isLoading: false,
  TotalStates: {},
};

export const addCourse = createAsyncThunk(
  "courseSlice/addCourse",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}/api/admin/courses/add`,
        data
      );

      return response.data;
    } catch (error) {
      console.log("Failed to add course from frontend" + error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getAllCourses = createAsyncThunk(
  "adminCourseSlice/getAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/api/admin/courses/get`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to get All courses from frontend" + error.message
      );
    }
  }
);
export const getCourseDetails = createAsyncThunk(
  "adminCourseSlice/getCourseDetails",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/api/admin/courses/get/${id}`);

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to get course details from frontend" + error.message
      );
    }
  }
);

export const updateCourse = createAsyncThunk(
  "adminCourseSlice/updateCourse",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}/api/admin/courses/update/${id}`,
        data
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Failed to update course from frontend" + error.message);
      return rejectWithValue(error.message);
    }
  }
);


export const getTotalRevenueAndStudents = createAsyncThunk(
  "adminCourseSlice/getTotalRevenueAndStudents",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/api/admin/courses/total-state`);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Failed to update course from frontend" + error.message);
      return rejectWithValue(error.message);
    }
  }
);

const AdminCourseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseData = action.payload.data;
      })
      .addCase(addCourse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseData = action.payload.data;
      })
      .addCase(getAllCourses.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCourseDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseDetails = action.payload.data;
      })
      .addCase(getCourseDetails.rejected, (state) => {
        state.isLoading = false;
        state.courseDetails = {};
      })
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseData = action.payload.data;
      })
      .addCase(updateCourse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTotalRevenueAndStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalRevenueAndStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.TotalStates = action.payload.data;
      })
      .addCase(getTotalRevenueAndStudents.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminCourseSlice.reducer;
