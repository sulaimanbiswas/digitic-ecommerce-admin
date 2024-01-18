import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const initialState = {
  enquiries: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getEnquiries = createAsyncThunk("enquiries", async (thunkAPI) => {
  try {
    return await enquiryService.getEnquiries();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default enquirySlice.reducer;
