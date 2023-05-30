import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    newsfeed: true,
    friends: false,
    profile: false,
    setting: false,
  },
  reducers: {
    switchComponent: (state, action) => {
      const { payload } = action;
      state.newsfeed = payload === "newsfeed";
      state.friends = payload === "friends";
      state.profile = payload === "profile";
      state.setting = payload === "setting";
    },
  },
});

export const { switchComponent } = pageSlice.actions;
export default pageSlice.reducer;
