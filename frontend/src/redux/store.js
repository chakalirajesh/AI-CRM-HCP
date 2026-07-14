import { configureStore } from "@reduxjs/toolkit";
import hcpReducer from "./hcpSlice";
import interactionReducer from "./interactionSlice";
import dashboardReducer from "./dashboardSlice";
import aiReducer from "./aiSlice";

export const store = configureStore({
  reducer: {
    hcp: hcpReducer,
    interaction: interactionReducer,
    dashboard: dashboardReducer,
    ai: aiReducer,
  },
});
