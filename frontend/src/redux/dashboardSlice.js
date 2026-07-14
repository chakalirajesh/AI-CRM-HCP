import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalHCPs: 0,
    totalInteractions: 0,
  },
  reducers: {
    setDashboardData: (state, action) => {
      state.totalHCPs = action.payload.totalHCPs;
      state.totalInteractions = action.payload.totalInteractions;
    },
  },
});

export const { setDashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
