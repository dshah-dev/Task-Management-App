import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import authStateReducer from "./authStateManageSlice";
import { userApi } from "./services/UsersApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authState: authStateReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
