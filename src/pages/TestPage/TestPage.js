import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTestMultipleReducer } from "../../store/slice/testMultipleSlice";
import { setTestReducer } from "../../store/slice/testSlice";
import ReduxTestPage1 from "../ReduxTestPage/ReduxTestPage1";
import ReduxTestPage2 from "../ReduxTestPage/ReduxTestPage2";

const TestPage = () => {
  const dispatch = useDispatch();
  const [asyncTest, setAsyncTest] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://httpbin.org/delay/5");
      // 5초에 딜레이가 지난 후 응답을 주는 api
      // async 테스트를 위한 api
      setAsyncTest(res.data.url);
    };
    fetchData();
  }, []);

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

  const handleAsyncTest = () => {
    console.log(asyncTest);
  };
  return (
    <>
      <div>this is TestPage</div>
      <button onClick={handleAsyncTest}>AsyncTest</button>
      <button onClick={handleTest}>change test value</button>
      <ReduxTestPage1></ReduxTestPage1>
      <ReduxTestPage2></ReduxTestPage2>
    </>
  );
};

export default TestPage;
