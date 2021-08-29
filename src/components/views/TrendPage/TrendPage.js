import { useEffect, useState } from 'react';
import axios from 'axios';
import './public/TrendPage.css';

function TrendPage(){
    const [test, setTest] = useState([]);
    const [test2, setTest2] = useState([]);
    const [test3, setTest3] = useState([]);
    const [test4, setTest4] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/trend')
        .then(res => {
            console.log(res);
            console.log(res.data);
            // setTest(res.data.statusCode);
            setTest2(res.data.body);
            // setTest3(res.data.headers);
            // setTest4(res.data.request);
            
        })  
    }, [])
    return(
        <>
        <div>Trend Site</div>
        <div>{test}</div>
        <div>{test2}</div>
        <div>{test3}</div>
        <div>{test4}</div>
        {/* 
            결과 : data":[{"period":"2019-01-01","ratio":7.91896},{"period":"2019-01-02","ratio":11.63998},{"period":"2019-01-03","ratio":11.15597},{"period":"2019-01-04","ratio":11.26694},{"period":"2019-01-05","ratio":12.30816},{"period":"2019-01-06","ratio":8.86338},{"period":"2019-01-07","ratio":10.5539},{"period":"2019-01-08","ratio":10.66251},{"period":"2019-01-09","ratio":11.25749},{"period":"2019-01-10","ratio":13.13689},{"period":"2019-01-11","ratio":12.10275}
            설정한 주제어에 대해 기간을 일간, 주간, 월간 단위로 조회 가능하다
            그리고, 5살 단위로 연령을 세분화해 조회할 수 있따.
            성별도 남성, 여성으로 세분화해서 조회할 수 있다
            마지막으로 PC와 모바일을 각각 구분해서 조회할 수 있다
            
            상대적 값으로만 제공된다
            요청된 가근 중 검색 횟수가 가장 높은 시점을 100으로 두고 나머지는 상대적 값으로 제공하고 있다
            검색 횟수의 절대값 제공은 아직 고려하지 않고 있다
            
        */}
        </>
    )
}

export default TrendPage;