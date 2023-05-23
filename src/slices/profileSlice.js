import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "user",
  initialState: {
    updatePictureCount: 0,
    updateInfoCount: 0,
  },
  reducers: {
    incrementUpdatePictureCount: (state) => {
      state.updatePictureCount += 1;
    },
    incrementUpdateInfoCount: (state) => {
      state.updateInfoCount += 1;
    },
  },
});

export const { incrementUpdatePictureCount, incrementUpdateInfoCount } =
  profileSlice.actions;
export default profileSlice.reducer;
