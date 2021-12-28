import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remove } from "lodash";
import { BadgeNotification } from "../interface";

const initialState: BadgeNotification[] = [];

export const badgeErrorSlice = createSlice({
  name: "BadgeNotifications",
  initialState,
  reducers: {
    setBadgeNotification: (
      state: Array<BadgeNotification>,
      action: PayloadAction<BadgeNotification>
    ) => (state = [...state, { ...action.payload, id: state.length + 1 }]),
    removeBadgeNotification: (state, action: PayloadAction<number>) => {
      remove(state, (error: BadgeNotification) => error.id === action.payload);
    },
  },
});

export const { setBadgeNotification, removeBadgeNotification } =
  badgeErrorSlice.actions;

export default badgeErrorSlice.reducer;
