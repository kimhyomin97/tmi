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
            // console.log(res);
            // console.log(res.data);
            // setTest(res.data.statusCode);
            // setTest2(res.data.body);
            // setTest3(res.data.headers);
            // setTest4(res.data.request);
            
        })  
    })
    return(
        <>
        <div>Trend Site</div>
        {/* <div>{test}</div>
        <div>{test2}</div>
        <div>{test3}</div>
        <div>{test4}</div> */}
        </>
    )
}

export default TrendPage;