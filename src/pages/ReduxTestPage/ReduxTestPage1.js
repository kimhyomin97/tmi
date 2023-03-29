import { useSelector } from "react-redux";

const ReduxTestPage1 = () => {
  const testValue = useSelector((state) => state.testChecker.testValue);
  const { testMultipleValue1, testMultipleValue2, testMultipleValue3 } =
    useSelector((state) => state.testMultipleChecker);

  return (
    <>
      <br />
      <br />
      <br />
      <div>this is ReduxTestPage 1</div>
      {/* <div>test state : {testValue}</div> */}
      <div>test state1 : {testValue?.test1}</div>
      <div>test state2 : {testValue?.test2}</div>
      <div>test multiple state1 : {testMultipleValue1}</div>
      <div>test multiple state2 : {testMultipleValue2}</div>
      <div>test multiple state3 : {testMultipleValue3}</div>
    </>
  );
};

export default ReduxTestPage1;
