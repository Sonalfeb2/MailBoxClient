import { createSlice } from "@reduxjs/toolkit";
const userEmail = localStorage.getItem("userEmail");
const userId = localStorage.getItem("userId");
const authReducer = createSlice({
  name: "authSlice",
  initialState: {
    userEmail: userEmail ? userEmail : null,
    userId: userId ? userId : null
  },
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userEmail", action.payload.userEmail);

      state.userEmail = action.payload.userId
      state.userId = action.payload.userEmail
    },
    logOutUser: state => {
      localStorage.clear("userEmail");
      localStorage.clear("userId");
      state.userEmail = null;
      state.userId = null;
    }
  }
});
export const AuthReducerAction = authReducer.actions;
export default authReducer.reducer;
