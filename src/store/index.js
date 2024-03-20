import { configureStore } from "@reduxjs/toolkit";
import inboxRedux from "./inboxRedux";
import DeleteReducer from "./CheckBoxReducer";
import SentBoxReducer from "./SentBoxReducer";
import SideBarReducer from "./SideBarReducer";
import AuthReducer from "./AuthReducer";
const store = configureStore({
  reducer: {
    inboxList: inboxRedux,
    checkInboxMsg: DeleteReducer,
    sentBox : SentBoxReducer,
    sideBarList: SideBarReducer,
    authSlice: AuthReducer
    
  }
});
export default store;
