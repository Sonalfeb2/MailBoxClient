import { createSlice } from "@reduxjs/toolkit";
const sideBarSlice = createSlice({
  name: "sideBarList",
  initialState: {
    sideBarList: [
      { name: "Compose", show: false },
      { name: "Inbox", show: true },
      { name: "Unread", show: false },
      { name: "Sentbox", show: false }
    ],
    viewContent: { show: false }
  },
  reducers: {
    updatedSideBarList: (state, action) => {
      if (action.payload.name === "Compose") {
        state.sideBarList = [
          { name: "Compose", show: true },
          { name: "Inbox", show: false },
          { name: "Unread", show: false },
          { name: "Sentbox", show: false }
        ];
        state.viewContent = { show: false };
      }
      if (action.payload.name === "Inbox") {
        state.sideBarList = [
          { name: "Compose", showl: false },
          { name: "Inbox", show: true },
          { name: "Unread", show: false },
          { name: "Sentbox", show: false }
        ];
        state.viewContent = { show: false };
      }
      if (action.payload.name === "Unread") {
        state.sideBarList = [
          { name: "Compose", show: false },
          { name: "Inbox", show: false },
          { name: "Unread", show: true },
          { name: "Sentbox", show: false }
        ];
        state.viewContent = { show: false };
      }
      if (action.payload.name === "Sentbox") {
        state.sideBarList = [
          { name: "Compose", show: false },
          { name: "Inbox", show: false },
          { name: "Unread", show: false },
          { name: "Sentbox", show: true }
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
