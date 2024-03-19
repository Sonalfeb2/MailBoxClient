import { createSlice } from "@reduxjs/toolkit";
const inboxSlice = createSlice({
  name: "inboxList",
  initialState: {
    list: [],
    totalMsg: 0,
    unread: 0,
    unreadList: [],
    sideBarList: [
      { name: "email", show: false },
      { name: "inbox", show: true },
      { name: "unread", show: false }
    ],
    viewContent: { show: false }
  },
  reducers: {
    getList: (state, action) => {
      state.list = action.payload;
      state.totalMsg = state.list.length;
      state.unreadList = state.list.filter(data => data.read === false);
      state.unread = state.unreadList.length;
    },
    updatedSideBarList: (state, action) => {
      if (action.payload.name === "email") {
        state.sideBarList = [
          { name: "email", show: true },
          { name: "inbox", show: false },
          { name: "unread", show: false }
        ];
        state.viewContent = { show: false };
      }
      if (action.payload.name === "inbox") {
        state.sideBarList = [
          { name: "email", showl: false },
          { name: "inbox", show: true },
          { name: "unread", show: false }
        ];
        state.viewContent = { show: false };
      }
      if (action.payload.name === "unread") {
        state.sideBarList = [
          { name: "email", show: false },
          { name: "inbox", show: false },
          { name: "unread", show: true }
        ];
        state.viewContent = { show: false };
      }
    },
    showViewContent: (state, action) => {
      state.viewContent = { show: true, ...action.payload };
    }
  }
});
export const InboxSliceActions = inboxSlice.actions;
export default inboxSlice.reducer;
