import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const isLoggedInSlice = createSlice({
  name: "IsLoggedIn",
  initialState,
  reducers: {
    setIsLoggedIn: (state: boolean, action: PayloadAction<boolean>) =>
      (state = action.payload),
  },
});

export const { setIsLoggedIn } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
