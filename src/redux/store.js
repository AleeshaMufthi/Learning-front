import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../feautures/userSlice";
import tutorReducer from "../feautures/tutorSlice";
import adminReducer from "../feautures/adminSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tutor: tutorReducer,
        admin: adminReducer,
    },
})