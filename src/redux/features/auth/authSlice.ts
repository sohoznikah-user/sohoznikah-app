// File: src/redux/features/auth/authSlice.ts
import { authAccessKey, authRefreshKey } from "@/constant/authkey";
import { RootState } from "@/redux/store";
import { getCookie, removeCookie, setCookie } from "@/utils/cookieHelper";
import { decodeToken, TUser } from "@/utils/tokenHelper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearBiodataFormData } from "../biodata/biodataSlice";

type TAuthState = {
  user: TUser | null;
  acesstoken: string | null;
  refreshtoken: string | null;
};

// Retrieve token from cookies
const storedAccessToken = getCookie(authAccessKey);
const storedRefreshToken = getCookie(authRefreshKey);
const storedUser = decodeToken(storedAccessToken); // Decode user from token

const initialState: TAuthState = {
  user: storedUser,
  acesstoken: storedAccessToken,
  refreshtoken: storedRefreshToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TAuthState>) => {
      const { user, acesstoken, refreshtoken } = action.payload;
      state.user = user;
      state.acesstoken = acesstoken;
      state.refreshtoken = refreshtoken;
      if (acesstoken && refreshtoken) {
        setCookie(authAccessKey, acesstoken); // Store token in cookies
        setCookie(authRefreshKey, refreshtoken); // Store token in cookies
      }
    },
    logout: (state) => {
      state.user = null;
      state.acesstoken = null;
      state.refreshtoken = null;
      clearBiodataFormData();
      removeCookie(authAccessKey); // Remove token from cookies
      removeCookie(authRefreshKey); // Remove token from cookies
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state: RootState) => state.auth.acesstoken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
