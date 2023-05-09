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
    switchToFriends: (state) => {
      state.newsfeed = false;
      state.friends = true;
      state.profile = false;
      state.setting = false;
    },
    switchToNewfeed: (state) => {
      state.newsfeed = true;
      state.friends = false;
      state.profile = false;
      state.setting = false;
    },
    switchToProfile: (state) => {
      state.newsfeed = false;
      state.friends = false;
      state.profile = true;
      state.setting = false;
    },
    switchToSetting: (state) => {
      state.newsfeed = false;
      state.friends = false;
      state.profile = false;
      state.setting = true;
    },
  },
});

export const {
  switchToFriends,
  switchToNewfeed,
  switchToProfile,
  switchToSetting,
} = pageSlice.actions;
export default pageSlice.reducer;
