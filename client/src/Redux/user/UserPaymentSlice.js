import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  orderInfo: {},
  paymentInfo: {},
  isEnrollLoading: false,
};

export const createOrder = createAsyncThunk(
  "userPaymentSlice/createOrder",
  async ({ paymentData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
          `${URL}/api/user/courses/order/create`,
          paymentData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to create Order from frontend" + error.message
      );
    }
  }
);
export const CapturePayment = createAsyncThunk(
  "userPaymentSlice/capturePayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}/api/user/courses/order/capture`,
        data
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to capture payment from frontend" + error.message
      );
    }
  }
);

const UserSlice = createSlice({
  name: "userPaymentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createOrder.pending, (state) => {
        state.isEnrollLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isEnrollLoading = false;
        state.orderInfo = action.payload.data;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isEnrollLoading = false;
        state.orderInfo = {};
      })
      .addCase(CapturePayment.pending, (state) => {
        state.isEnrollLoading = true;
      })
      .addCase(CapturePayment.fulfilled, (state, action) => {
        state.isEnrollLoading = false;
        state.paymentInfo = action.payload.data;
      })
      .addCase(CapturePayment.rejected, (state) => {
        state.isEnrollLoading = false;
        state.paymentInfo = {};
      });
  },
});

export default UserSlice.reducer;
