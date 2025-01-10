import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;


const initialState = {
  userCourseData: [],
  userCourseDetails: {},
  isLoading: false,
};


export const getAllCourses = createAsyncThunk(
  "userSlice/getAllCourses",
    async ({ filter }, { rejectWithValue }) => {
      
        const query = new URLSearchParams({...filter})
    try {
      const response = await axios.get(
        `${URL}/api/user/courses/get?${query}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to get All courses from frontend" + error.message
      );
    }
  }
);
export const getCourseDetails = createAsyncThunk(
  "userSlice/getCourseDetails",
  async ({ id,userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/api/user/courses/get/${id}/${userId}`
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to get course details from frontend" + error.message
      );
    }
  }
);



const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCourseData = action.payload.data;
      })
      .addCase(getAllCourses.rejected, (state) => {
          state.isLoading = false;
          state.userCourseData = [];
      })
      .addCase(getCourseDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCourseDetails = action.payload.data;
      })
      .addCase(getCourseDetails.rejected, (state) => {
        state.isLoading = false;
        state.userCourseDetails = {};
      })
      
  },
});

export default UserSlice.reducer;
