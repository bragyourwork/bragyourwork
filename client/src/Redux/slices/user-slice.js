import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isAuthenticated: false,
    userEmail:null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.userEmail = action.payload.userEmail;
    },
    removeUserData: (state, action) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.userEmail = null;
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;
export const selectUserData = (state) => state.user.userData;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserEmail = (state) => state.user.userEmail;

export default userSlice.reducer;
