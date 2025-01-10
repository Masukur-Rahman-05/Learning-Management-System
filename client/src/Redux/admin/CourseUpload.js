import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  courseData: null,
  isLoading: false,
  uploadProgress: 0,
};

export const UploadCourseFile = createAsyncThunk(
  "CourseUploadSlice/uploadCourseFile",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${URL}/api/admin/courses/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
          onUploadProgress: (progressEvent) => {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total;
            // Calculate exact percentage without rounding up
            const exactProgress = (loaded * 100) / total;
            // Round to 1 decimal place to get more granular progress
            const progress = Math.round(exactProgress);
            dispatch(setUploadProgress(progress));
          },
        }
      );
        
      return response.data;
    } catch (error) {
        dispatch(resetUploadProgress());
      return rejectWithValue(error.response.data);
    }
  }
);
export const UploadBulkFiles = createAsyncThunk(
  "CourseUploadSlice/uploadBulkFile",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${URL}/api/admin/courses/bulk-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
          onUploadProgress: (progressEvent) => {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total;
            // Calculate exact percentage without rounding up
            const exactProgress = (loaded * 100) / total;
            // Round to 1 decimal place to get more granular progress
            const progress = Math.round(exactProgress);
            dispatch(setUploadProgress(progress));
          },
        }
      );
        
      return response.data;
    } catch (error) {
        dispatch(resetUploadProgress());
      return rejectWithValue(error.response.data);
    }
  }
);
export const DeleteCourseFile = createAsyncThunk(
  "CourseUploadSlice/deleteCourseFile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}/api/admin/courses/delete/${id}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const CourseUploadSlice = createSlice({
  name: "courseUploadFile",
  initialState,
  reducers: {
    setUploadProgress(state, action) {
      state.uploadProgress = action.payload; // Updates the progress in the Redux store
    },
    resetUploadProgress(state) {
      state.uploadProgress = 0; // Reset progress after the upload is completed or failed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UploadCourseFile.pending, (state) => {
        state.isLoading = true;
        state.courseData = null;
      })
      .addCase(UploadCourseFile.fulfilled, (state, action) => {
        state.courseData = action.payload.data;
        state.isLoading = false;
        state.uploadProgress = 100;
      })
      .addCase(UploadCourseFile.rejected, (state, action) => {
        state.courseData = null;
        state.isLoading = false;
        state.uploadProgress = 0;
      })
      .addCase(UploadBulkFiles.pending, (state) => {
        state.isLoading = true;
        state.courseData = null;
      })
      .addCase(UploadBulkFiles.fulfilled, (state, action) => {
        state.courseData = action.payload.data;
        state.isLoading = false;
        state.uploadProgress = 100;
      })
      .addCase(UploadBulkFiles.rejected, (state, action) => {
        state.courseData = null;
        state.isLoading = false;
        state.uploadProgress = 0;
      })
      .addCase(DeleteCourseFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteCourseFile.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(DeleteCourseFile.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setUploadProgress, resetUploadProgress } = CourseUploadSlice.actions;
export default CourseUploadSlice.reducer;
