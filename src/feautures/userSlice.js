import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    userId: null,
    username: null,
    loggedIn: false,
}

const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.loggedIn = true;
        },
        removeUser: (state) => {
            state.name = null;
            state.userId = null;
            state.email = null;
            state.phone = null;
            state.username = null;
            state.loggedIn = false;
          },
    }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer