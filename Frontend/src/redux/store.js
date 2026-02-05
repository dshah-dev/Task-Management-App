import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import  userReducer  from "./usersSlice";
import authStateReducer from "./authStateManageSlice"
export const store =  configureStore({
    reducer:{
        auth:authReducer,
        users:userReducer,
        authState:authStateReducer,
    },
});