import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  mode: "login",
};

const authStateManageSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isOpen = true;
      state.mode = "login";
    },
    openSignup: (state) => {
      state.isOpen = true;
      state.mode = "signup";
    },
    closeAuthState: (state) => {
      state.isOpen = false;
    },
    switchToLogin: (state) => {
      state.mode = "login";
    },
    switchToSignup: (state) => {
      state.mode = "signup";
    },
    openProfile: (state) => {
      state.isOpen = true;
      state.mode="profile";
    },
  },
});

export const {
  openLogin,
  openSignup,
  closeAuthState,
  switchToLogin,
  switchToSignup,
  openProfile,
} = authStateManageSlice.actions;

export default authStateManageSlice.reducer;
