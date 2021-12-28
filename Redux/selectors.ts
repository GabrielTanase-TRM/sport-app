import { AppRootStore } from "./interface";

export const getUser = (state: AppRootStore) => state?.user;

export const getIsLoggedIn = (state: AppRootStore) => state?.isLoggedIn;

export const getBadgeNotifications = (state: AppRootStore) =>
  state?.badgeNotifications;
export const getStore = (state: AppRootStore) => state;
