import { createSlice } from "@reduxjs/toolkit";

const hcpSlice = createSlice({
  name: "hcp",
  initialState: {
    hcps: [],
  },
  reducers: {
    setHCPs: (state, action) => {
      state.hcps = action.payload;
    },
  },
});

export const { setHCPs } = hcpSlice.actions;

export default hcpSlice.reducer;
