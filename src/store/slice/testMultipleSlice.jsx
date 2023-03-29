import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testMultipleValue1: "",
  testMultipleValue2: "",
  testMultipleValue3: "",
};

export const testMultipleSlice = createSlice({
  name: "testMultipleChecker",
  initialState,
  reducers: {
    setTestMultipleReducer: (state, action) => {
      state.testMultipleValue1 = action.payload.testMultipleValue1;
      state.testMultipleValue2 = action.payload.testMultipleValue2;
      state.testMultipleValue3 = action.payload.testMultipleValue3;
    },
  },
});

export const { setTestMultipleReducer } = testMultipleSlice.actions;

export default testMultipleSlice.reducer;
