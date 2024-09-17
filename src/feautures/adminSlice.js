import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    adminId: null,
    loggedIn: false,
  };
  const adminSlice = createSlice({
    name: "admin",
    initialState: initialState,
    reducers: {
      setAdmin: (state, action) => {
        console.log(action);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.adminId = action.payload._id;
        state.loggedIn = true;
      },
      removeAdmin: (state) => {
        state.name = null;
        state.email = null;
        state.adminId = null;
        state.loggedIn = false;
      },
    },
  });
  
  export const { setAdmin, removeAdmin } = adminSlice.actions;
  
  export default adminSlice.reducer;