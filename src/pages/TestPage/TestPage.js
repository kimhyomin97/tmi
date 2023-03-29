import { useDispatch } from "react-redux";
import { setTestMultipleReducer } from "../../store/slice/testMultipleSlice";
import { setTestReducer } from "../../store/slice/testSlice";
import ReduxTestPage1 from "../ReduxTestPage/ReduxTestPage1";
import ReduxTestPage2 from "../ReduxTestPage/ReduxTestPage2";

const TestPage = () => {
  const dispatch = useDispatch();
  const handleTest = () => {
    dispatch(setTestReducer({ testValue: { test1: "test1", test2: "test2" } }));
    dispatch(
      setTestMultipleReducer({
        testMultipleValue1: "test111",
        testMultipleValue2: "test222",
        testMultipleValue3: "test333",
      })
    );
  };
  return (
    <>
      <div>this is TestPage</div>
      <button onClick={handleTest}>change test value</button>
      <ReduxTestPage1></ReduxTestPage1>
      <ReduxTestPage2></ReduxTestPage2>
    </>
  );
};

export default TestPage;
