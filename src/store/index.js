import { configureStore } from "@reduxjs/toolkit";
import inboxRedux from "./inbox-reducer";
import DeleteReducer from "./checkbox-reducer";
import SentBoxReducer from "./sentbox-reducer";
import SideBarReducer from "./sidebar-reducer";
import AuthReducer from "./auth-reducer";
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
