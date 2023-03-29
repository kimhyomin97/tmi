import { useSelector } from "react-redux";

const ReduxTestPage2 = () => {
  const testValue = useSelector((state) => state.testChecker.testValue);

  return (
    <>
      <br />
      <br />
      <br />
      <div>this is ReduxTestPage 2</div>
      {/* <div>test state : {testValue}</div> */}
      <div>test state1 : {testValue.test1}</div>
      <div>test state2 : {testValue.test2}</div>
    </>
  );
};

export default ReduxTestPage2;
