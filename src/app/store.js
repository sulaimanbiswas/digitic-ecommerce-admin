import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customer/customerSlice";

export const store = configureStore({
  reducer: { auth: authReducer, customer: customerReducer },
});
