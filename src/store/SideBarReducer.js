import { createSlice } from "@reduxjs/toolkit";
const sideBarSlice = createSlice({
  name: "sideBarList",
  initialState: {
    sideBarList: [
      { name: "email", show: false },
      { name: "inbox", show: true },
      { name: "unread", show: false },
      { name: "sentbox", show: false }
    ],
    viewContent: { show: false }
  },
  reducers: {
    updatedSideBarList: (state, action) => {
      if (action.payload.name === "email") {
        state.sideBarList = [
          { name: "email", show: true },
          { name: "inbox", show: false },
          { name: "unread", show: false },
          { name: "sentbox", show: false }
        ];
        state.viewContent = { show: false };
      }
      if (action.payload.name === "inbox") {
        state.sideBarList = [
          { name: "email", showl: false },
          { name: "inbox", show: true },
          { name: "unread", show: false },
          { name: "sentbox", show: false }
        ];
        state.viewContent = { show: false };
      }
      if (action.payload.name === "unread") {
        state.sideBarList = [
          { name: "email", show: false },
          { name: "inbox", show: false },
          { name: "unread", show: true },
          { name: "sentbox", show: false }
        ];
        state.viewContent = { show: false };
      }
      if (action.payload.name === "sentbox") {
        state.sideBarList = [
          { name: "email", show: false },
          { name: "inbox", show: false },
          { name: "unread", show: false },
          { name: "sentbox", show: true }
        ];
        state.viewContent = { show: false };
      }
    },
    showViewContent: (state, action) => {
      const active = state.sideBarList.filter(data => data.show === true);
      state.viewContent = {
        show: true,
        ...action.payload,
        active: active
      };
    }
  }
});
export const SideBarSliceActions = sideBarSlice.actions;
export default sideBarSlice.reducer;
