// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import authReducer from "../features/auth/authSlice";
import biodataReducer from "../features/biodata/biodataSlice";
import filterReducer from "../features/filter/filterSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  biodata: biodataReducer,
  filter: filterReducer,
});

export default rootReducer;
