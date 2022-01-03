import { combineReducers } from "redux";
import badgeNotificationsReducer from "./slices/badgeNotification.slice";
import isLoggedInReducer from "./slices/isLoggedIn.slice";
import userReducer from "./slices/user.slice";

const rootReducer = combineReducers({
  user: userReducer,
  isLoggedIn: isLoggedInReducer,
  badgeNotifications: badgeNotificationsReducer,
});

export default rootReducer;
