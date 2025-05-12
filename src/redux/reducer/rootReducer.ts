// File: src/redux/reducer/rootReducer.ts
import { baseApi } from "../api/baseApi";
import authReducer from "../features/auth/authSlice";
import biodataReducer from "../features/biodata/biodataSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer, // This gets persisted in `store.ts`
  biodata: biodataReducer,
};
