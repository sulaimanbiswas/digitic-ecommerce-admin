import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uploadService from "./UploadService";

const initialState = {
  uploads: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const uploadImage = createAsyncThunk(
  "uploads/uploadImage",
  async (formData, thunkAPI) => {
    try {
      return await uploadService.uploadImage(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "uploads/deleteImage",
  async (public_id, thunkAPI) => {
    try {
      return await uploadService.deleteImage(public_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetState = createAction("uploads/resetState");

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.uploads = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.uploads = action.payload;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default uploadSlice.reducer;
