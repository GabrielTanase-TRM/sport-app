import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../shared/shared.interface";
import { generateHexColor } from "../../shared/utils";

const initialState: User = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  disabled: false,
  isTrainer: false,
  deleted: true,
  avatar: generateHexColor(),
  testimonials: "",
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) =>
      (state = action.payload),
    clearUser: (state: User) => (state = initialState),
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
