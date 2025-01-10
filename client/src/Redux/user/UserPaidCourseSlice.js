import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  isLoading: false,
  userPaidCourseData: [],
  userPaidCourseDetails: {},
};

export const getAllPaidCourses = createAsyncThunk(
  "userPaidCourseSlice/getAllPaidCourses",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/api/user/courses/paid/get-courses/${id}`,
        
      );

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(
        "Error getting all courses from frontend" + error.message
      );
    }
  }
);

export const UserPaidCourseSlice = createSlice({
  name: "userPaidCourseSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllPaidCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPaidCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPaidCourseData = action.payload.data;
      })
      .addCase(getAllPaidCourses.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default UserPaidCourseSlice.reducer;
