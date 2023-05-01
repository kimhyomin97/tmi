import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setHeaderReducer from "./slice/headerSlice";
import setTestMultipleReducer from "./slice/testMultipleSlice";
import testReducer from "./slice/testSlice";

const rootReducer = combineReducers({
  testChecker: testReducer,
  testMultipleChecker: setTestMultipleReducer,
  headerChecker: setHeaderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
