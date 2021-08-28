const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const PORT = 5000;

require('dotenv').config({ path: "../.env"});

app.listen(PORT, () => {
    console.log(`SERVER ON : http://localhost:${PORT}/`);
})

var request = require('request');
var client_id = process.env.NAVER_TREND_API_CLIENT_ID;
var client_secret = process.env.NAVER_TREND_API_CLIENT_SECRET;
// var client_id = '%REACT_APP_NAVER_TREND_API_CLIENT_ID%';
// var client_secret = 'REACT_APP_NAVER_TREND_API_CLIENT_SECRET';
var api_url = 'https://openapi.naver.com/v1/datalab/search';

app.get('/api/trend', (req, res) => {
    console.log("TEST");
    // 네이버 검색어 트렌드 api 공부
    // var request_body = {
    //     "startDate": "2017-01-01",
    //     "endDate": "2017-04-30",
    //     "timeUnit": "month",
    //     "keywordGroups": [
    //         {
    //             "groupName": "한글",
    //             "keywords": [
    //                 "한글",
    //                 "korean"
    //             ]
    //         },
    //         {
    //             "groupName": "영어",
    //             "keywords": [
    //                 "영어",
    //                 "english"
    //             ]
    //         }
    //     ],
    //     "device": "pc",
    //     "ages": [
    //         "1",
    //         "2"
    //     ],
    //     "gender": "f"
    // };
    // request.post({
    //         url: api_url,
    //         body: JSON.stringify(request_body),
    //         headers: {
    //             'X-Naver-Client-Id': client_id,
    //             'X-Naver-Client-Secret': client_secret,
    //             'Content-Type': 'application/json'
    //         }
    //     },
    //     function (error, response, body) {
    //         // console.log(response.statusCode);
    //         // console.log(body);
    //         // console.log(response);
    //         res.send(response);
    //     });
})



