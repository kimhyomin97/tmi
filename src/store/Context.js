import React, { createContext, useContext } from "react";

export const TestContext = createContext({});

const TestStore = (props) => {
  const temp = {
    name: "test-name",
    job: "test-job",
  };
  return (
    <TestContext.Provider value={temp}>{props.children}</TestContext.Provider>
  );
};

export default TestStore;

export function useTestState() {
  const context = useContext(TestContext);
  return context;
}
// function Context() {}

// export default Context;
