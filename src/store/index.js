import { configureStore } from "@reduxjs/toolkit";
import inboxRedux from "./inboxRedux";
import DeleteReducer from "./CheckBoxReducer";
import SentBoxReducer from "./SentBoxReducer";
import SideBarReducer from "./SideBarReducer";
const store = configureStore({
  reducer: {
    inboxList: inboxRedux,
    checkInboxMsg: DeleteReducer,
    sentBox : SentBoxReducer,
    sideBarList: SideBarReducer
    
  }
});
export default store;
