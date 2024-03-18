import { configureStore } from "@reduxjs/toolkit";
import inboxRedux from "./inboxRedux";
const store = configureStore({
  reducer: {
    inboxList: inboxRedux
  }
});
export default store;
