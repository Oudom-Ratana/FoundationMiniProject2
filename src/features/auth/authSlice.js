import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || "";
const storedRefreshToken = sessionStorage.getItem("refreshToken") || "";
const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  accessToken: storedToken,
  refreshToken: storedRefreshToken,
  user: storedUser,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      if (action.payload) {
        localStorage.setItem("accessToken", action.payload);
      } else {
        localStorage.removeItem("accessToken");
      }
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      if (action.payload) {
        sessionStorage.setItem("refreshToken", action.payload);
      } else {
        sessionStorage.removeItem("refreshToken");
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setLogout: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("user");
    },
  },
});
export const { setAccessToken, setLogout, setRefreshToken, setUser } = authSlice.actions;
export default authSlice.reducer;

