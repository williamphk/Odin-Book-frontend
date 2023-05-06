import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    newsfeed: true,
    friends: false,
  },
  reducers: {
    switchToFriends: (state) => {
      state.newsfeed = false;
      state.friends = true;
    },
    switchToNewfeed: (state) => {
      state.newsfeed = true;
      state.friends = false;
    },
  },
});

export const { switchToFriends, switchToNewfeed } = pageSlice.actions;
export default pageSlice.reducer;
