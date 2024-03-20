import { configureStore } from "@reduxjs/toolkit";
import inboxRedux from "./inboxRedux";
import DeleteReducer from "./CheckBoxReducer";
const store = configureStore({
  reducer: {
    inboxList: inboxRedux,
    checkInboxMsg: DeleteReducer
  }
});
export default store;
