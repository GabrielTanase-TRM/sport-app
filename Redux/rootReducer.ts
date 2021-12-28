import { combineReducers } from "redux";
import badgeNotificationsReducer from "./Slices/badgeNotification.slice";
import isLoggedInReducer from "./Slices/isLoggedIn.slice";
import userReducer from "./Slices/user.slice";

const rootReducer = combineReducers({
  user: userReducer,
  isLoggedIn: isLoggedInReducer,
  badgeNotifications: badgeNotificationsReducer,
});

export default rootReducer;
