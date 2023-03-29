import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testValue: "",
};

export const testSlice = createSlice({
  name: "testChecker",
  initialState,
  reducers: {
    setTestReducer: (state, action) => {
      state.testValue = action.payload.testValue;
    },
  },
});

export const { setTestReducer } = testSlice.actions;

export default testSlice.reducer;
