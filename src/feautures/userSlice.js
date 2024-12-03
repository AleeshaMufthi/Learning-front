import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  userId: null,
  username: null,
  role: null,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("Dispatched action:", action.payload);
      
      state.name = action.payload.name || null;
      state.userId = action.payload.userId || null;
      state.email = action.payload.email || null;
      state.phone = action.payload.phone || null;
      state.username = action.payload.username || null;
      state.role = action.payload.role || null;
      state.loggedIn = true;
    },
    removeUser: (state) => {
      state.name = null;
      state.userId = null;
      state.email = null;
      state.phone = null;
      state.username = null;
      state.role = null;
      state.loggedIn = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;