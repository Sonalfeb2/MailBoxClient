import { createSlice } from "@reduxjs/toolkit";
const sentBoxSlice = createSlice({
  name: "sentBox",
  initialState: {
    list: [],
  },
  reducers: {
    getList: (state, action) => {
      state.list = action.payload;
    },
   
  }
});
export const SentBoxSliceActions = sentBoxSlice.actions;
export default sentBoxSlice.reducer;
