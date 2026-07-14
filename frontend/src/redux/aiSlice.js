import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    prompt: "",
    response: "",
    loading: false,
  },
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearChat: (state) => {
      state.prompt = "";
      state.response = "";
      state.loading = false;
    },
  },
});

export const { setPrompt, setResponse, setLoading, clearChat } =
  aiSlice.actions;

export default aiSlice.reducer;
