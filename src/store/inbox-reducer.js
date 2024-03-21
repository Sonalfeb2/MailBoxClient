import { createSlice } from "@reduxjs/toolkit";
const inboxSlice = createSlice({
  name: "inboxList",
  initialState: {
    list: [],
    totalMsg: 0,
    unread: 0,
    unreadList: [],
  },
  reducers: {
    getList: (state, action) => {
      state.list = action.payload;
      state.totalMsg = state.list.length;
      state.unreadList = state.list.filter(data => data.read === false);
      state.unread = state.unreadList.length;
    },
   
  }
});
export const InboxSliceActions = inboxSlice.actions;
export default inboxSlice.reducer;
