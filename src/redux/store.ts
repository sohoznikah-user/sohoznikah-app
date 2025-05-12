import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/authSlice"; // Assuming you have an auth slice
import biodataReducer from "./features/biodata/biodataSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["biodata", "auth"], // Persist biodata and auth slices
};

const rootReducer = combineReducers({
  biodata: biodataReducer,
  auth: authReducer, // Include other reducers as needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
