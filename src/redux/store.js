import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feautures/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})