import React, { createContext, useContext, useReducer } from "react";

const testReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      throw new Error("Unsupported action type:", action.type);
  }
};

const TestContext = createContext();
const DispatchContext = createContext();

export const TestStore = (props) => {
  const temp = {
    name: "test-name",
    job: "test-job",
    userType: "user",
    count: 0,
  };
  const [state, dispatch] = useReducer(testReducer, temp);

  return (
    <TestContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </TestContext.Provider>
  );
};

export default TestStore;

export function useTestState() {
  const context = useContext(TestContext);
  return context;
}
// function Context() {}

// export default Context;
