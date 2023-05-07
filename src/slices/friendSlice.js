import { createSlice } from "@reduxjs/toolkit";

const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState: {
    acceptOrDeleteCount: 0,
  },
  reducers: {
    incrementAcceptOrDeleteCount: (state) => {
      state.acceptOrDeleteCount += 1;
    },
  },
});

export const { incrementAcceptOrDeleteCount } = friendRequestSlice.actions;
export default friendRequestSlice.reducer;
