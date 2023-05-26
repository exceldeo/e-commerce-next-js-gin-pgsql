import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: null,
};

export const languageSetup = createSlice({
  name: 'language-setup',
  initialState,
  reducers: {
    setupAction: (state, payload) => {
      state = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setupAction } = languageSetup.actions;
export default languageSetup.reducer;
