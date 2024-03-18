import { createSlice } from "@reduxjs/toolkit";
const inboxSlice = createSlice({
  name: "inboxList",
  initialState: {
    list: [],
    totalMsg: 0
  },
  reducers: {
    getList: (state, action) => {
      state.list = action.payload;
      state.totalMsg = state.list.length
    }
  }
});
export const InboxSliceActions = inboxSlice.actions;
export default inboxSlice.reducer;
