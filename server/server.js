const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();

// // server test
// const path = require('path');
// app.use(express.static(path.join(__dirname, '../build')));

// app.get('/', (res, req)=>{
//     req.sendFile(path.join(__dirname, '../build/index.html'));
// }) // server에서 html파일을 static하게 뿌려주고 싶으면 다음과 같이 사용하면 된다.
// //

app.use(express.json());
app.use(cors());

const PORT = 5000;

// require('dotenv').config({ path: "../.env"});
require('dotenv').config();

app.listen(PORT, () => {
    console.log(`SERVER ON : http://localhost:${PORT}/`);
})

var client_id = process.env.NAVER_TREND_API_CLIENT_ID;
var client_secret = process.env.NAVER_TREND_API_CLIENT_SECRET;
// var client_id = '%REACT_APP_NAVER_TREND_API_CLIENT_ID%';
// var client_secret = 'REACT_APP_NAVER_TREND_API_CLIENT_SECRET';
var api_url = 'https://openapi.naver.com/v1/datalab/search';

const food_api_url = 'https://api.odcloud.kr/api/15035732/v1/uddi:ba47232a-68fb-4252-93e8-fef2699919cc_201909091317?';
const food_api_key = process.env.FOOD_API_KEY_DECODING;

var request = require('request');
const foodlist = require('./models/foodlist'); // foodlist를 불러와서 db에 저장하는 로직 함수화
const { consoleOrigin } = require('firebase-tools/lib/api');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// certificate has expired 오류 해결하는 코드
// SSL인증 오류가 있기 때문에 발생하는 오류
// http://openapi.seoul.go.kr:8088/52616f4e73726c6139345853615451/json/LOCALDATA_072404_SD/1/10/
app.get('/foodlist', (req, res) => {
    // api 변경
    // const food_api_url = 'http://openapi.seoul.go.kr:8088/'+process.env.FOOD_API_KEY_SEOUL+'/json/CrtfcUpsoInfo/1/1/'
    // const food_api_url = 'http://openapi.seoul.go.kr:8088/'+process.env.FOOD_API_KEY_SEOUL+'/json/CrtfcUpsoInfo/1/1000/'
    // request(food_api_url, (error, respond, body) => {
    //     if(error) console.log(error);
    //     var obj = JSON.parse(body);
    //     obj.CrtfcUpsoInfo.row.map(item => {
    //         // console.log(item);
    //         // 이부분에 DB저장하는 코드 작성하면 된다
    //         console.log("X : "+item.X_CNTS);
    //         console.log("Y : "+item.Y_DNTS);
    //     })
    //     res.send(obj.CrtfcUpsoInfo.row[0]);
    //     res.send("HELLO")
        
    //     // body.row.map(item => {
    //     //     console.log("TEST START : "+item);
    //     //     console.log("END")
    //     // })
    // })
    foodlist(res);
})

app.get('/getfood', async (req, res) => {
    try{
        const base_url = `http://openapi.seoul.go.kr:8088/${process.env.FOOD_API_KEY_SEOUL}/json/LOCALDATA_072404_`;
        const region_list = ['SP',// 송파
                            'YC', // 양천
                            'GD', // 강동
                            'SM', // 서대문
                            'GR', // 구로
                            'GS', // 강서
                            'SC', // 서초
                            'SD', // 성동
                            'NW', // 노원
                            'YD', // 영등포
                            'GC', // 금천
                            'SB', // 성북
                            'JR', // 중랑
                            'GN', // 강남
                            'YS', // 용산
                            'JG', // 중구
                            'EP', // 은평
                            'DB', // 도봉
                            'MP', // 마포
                            'GA', // 관악
                            'GB', // 강북
                            'DJ', // 동작
                            'GJ', // 광진
                            'DD', // 동대문
                            'JN', // 종로
                        ];
                        console.log(base_url+'JN'+'1/10');
        var foodInfo = [];
        region_list.map(region_code => {
            // console.log(region_code);
            // request를 여러번 반복해서 보내면 에러발생
            // request를 여러번 보내는게아니라, res.send()를 여러번 반복하면 에러 발생
            // 아무래도 웹페이지상에 json코드들을 띄워주는데, 여러개가 발생해서 그런듯
            const now = `LOCALDATA_072404_${region_code}`;
            request(base_url+region_code+'/1/10', (error, respond, body) => {
                if(error) console.log(error);
                var obj = JSON.parse(body);
                // console.log(obj);
                foodInfo.push(obj);
            })
            // axios
            //     .get(base_url+region_code+'/1/10') // api에서 읽어오는 데이터가 많아지면 성능에 문제가 발생한다
            //     .then((response) => {
            //         // console.log(response.data[Object.keys(response.data)].row);
            //         response.data[Object.keys(response.data)].row.map(item => {
            //             // console.log(item.X);
            //             // console.log(item.Y);
            //             var geocoder = new kakao.maps.services.Geocoder(), wtmX = item.X, wtmY = item.Y;
            //             geocoder.transCoord(wtmX, wtmY, transCoordCB, {
            //                 input_coord: kakao.maps.services.Coords.WTM,
            //                 output_coord: kakao.maps.services.Coords.WGS84
            //             });
            //             function transCoordCB(result, status){
            //                 if(status ===kakao.maps.services.Status.OK){
            //                     var marker = new kakao.maps.Marker({
            //                         position: new kakao.maps.LatLng(result[0].y, result[0].x),
            //                     })
            //                     setFoodlist(foodlist => [...foodlist, {marker: marker}]);
            //                 }
            //             }
            //         })
            //     })
        })
        setTimeout(() => res.send(foodInfo), 1000);
        // res.send(foodInfo);
        // return res.status(200).json({success: true, foodInfo});
    } catch(e){
        console.log(e);
    }
});


app.get('/foodlist2', (req, res) => {

    
    // 넘겨줘야될 파라미터 : api_url, api_key, ...
    // page, perPage 계산은 함수 넘어가서 해줘도 될듯

    // 이부분 async await로 비동기 처리를 해줘야 된다
    // 그 다음 푸드리스트를 불러오는 부분 함수화해서 model 폴더에 구현해주자
    let page=1;
    let perPage=4000;
    let offset;
    let req_url = food_api_url+'page='+page+'&perPage='+perPage+'&serviceKey='+food_api_key;
    // foodlist(req_url, res)
    //     .then(() => {

    // //     });
    // // request(food_api_url+'serviceKey='+food_api_key, (error, respond, body) => {
    // // for(let i=0; i<10; i++){
    // console.log('before');
    // const getfoodlist = async (url, page) => {
    //     console.log("in : " + page);
    //     request(url, (error, respond, body) => {
    //         if(error) console.log(error);
    //         console.log(url);
    //         var obj = JSON.parse(body);
    //         console.log(obj.page);
    //         // res.send(obj);
    //     })
    // }
    // for(var i=0; i<3; i++){
    //     req_url = food_api_url+'page='+page+'&perPage='+perPage+'&serviceKey='+food_api_key;
    //     getfoodlist(req_url, page)
    //     .then(() => {
    //         page++;
    //         console.log("test : "+page);
    //     })
    //     // request(req_url, (error, respond, body) => {
    //     //     if(error) console.log(error);
    //     //     // console.log("TEST:"+body)
    //     //     var obj = JSON.parse(body)
    //     //     console.log(obj);
    //     //     console.log(req_url)
    //     //     offset = obj.totalCount;
    //     //     // res.send(obj)
    //     // })
    //     // page++;
    // }

    request(req_url, (error, respond, body) => {
        if(error) console.log(error);
        console.log("TEST:"+body)
        var obj = JSON.parse(body)
        console.log(obj);
        offset = obj.totalCount;
        res.send(obj)
    })
})


app.get('/api/trend', (req, res) => {
    console.log("TEST");
    // 네이버 검색어 트렌드 api 공부
    // var request_body = {
    //     "startDate": "2019-01-01",
    //     "endDate": "2019-04-30",
    //     "timeUnit": "date",
    //     "keywordGroups": [
    //         {"groupName":"타다", "keywords":["타다", "소카", "vcnc", "VCNC"]},
    //     ],
    //     // "keywordGroups": [
    //     //     {
    //     //         "groupName": "한글",
    //     //         "keywords": [
    //     //             "한글",
    //     //             "korean"
    //     //         ]
    //     //     },
    //     //     {
    //     //         "groupName": "영어",
    //     //         "keywords": [
    //     //             "영어",
    //     //             "english"
    //     //         ]
    //     //     }
    //     // ],
    //     // "device": "pc",
    //     // "ages": [
    //     //     "1",
    //     //     "2"
    //     // ],
    //     // "gender": "f"
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

var open_api_url = "http://aiopen.etri.re.kr:8000/WiseNLU";
var ai_key = process.env.AI_API_KEY;

app.get('/api/word', (req, res) => {
    // var analysis_code = 'morp';
    // // var text = "윤동주(尹東柱, 1917년 12월 30일 ~ 1945년 2월 16일)는 한국의 독립운동가, 시인, 작가이다." +
    // //         "중국 만저우 지방 지린 성 연변 용정에서 출생하여 명동학교에서 수학하였고, 숭실중학교와 연희전문학교를 졸업하였다. 숭실중학교 때 처음 시를 발표하였고, 1939년 연희전문 2학년 재학 중 소년(少年) 지에 시를 발표하며 정식으로 문단에 데뷔했다." +
    // //         "일본 유학 후 도시샤 대학 재학 중 , 1943년 항일운동을 했다는 혐의로 일본 경찰에 체포되어 후쿠오카 형무소(福岡刑務所)에 투옥, 100여 편의 시를 남기고 27세의 나이에 옥중에서 요절하였다. 사인이 일본의 생체실험이라는 견해가 있고 그의 사후 일본군에 의한 마루타, 생체실험설이 제기되었으나 불확실하다. 사후에 그의 시집 《하늘과 바람과 별과 시》가 출간되었다." +
    // //         "일제 강점기 후반의 양심적 지식인으로 인정받았으며, 그의 시는 일제와 조선총독부에 대한 비판과 자아성찰 등을 소재로 하였다. 그의 친구이자 사촌인 송몽규 역시 독립운동에 가담하려다가 체포되어 일제의 생체 실험으로 의문의 죽음을 맞는다. 1990년대 후반 이후 그의 창씨개명 '히라누마'가 알려져 논란이 일기도 했다. 본명 외에 윤동주(尹童柱), 윤주(尹柱)라는 필명도 사용하였다.";
    // var text = "이것은 테스트 문장입니다. 이 문장을 분석합니다. 웹사이트 테스트";
    // var request_json = {
    //     'access_key' : ai_key,
    //     'argument' : {
    //         'text': text,
    //         'analysis_code': analysis_code
    //     }
    // };
    // var options = {
    //     url: open_api_url,
    //     body: JSON.stringify(request_json),
    //     headers: {'Content-Type' : 'application/json; charset=UTF-8'}
    // };
    // request.post(options, function(error, response, body) {
    //     console.log('responseCode = ' + response.statusCode);
    //     console.log('responseBody = ' + body);
    //     res.send(response);
    // });
})

