var request = require('request');
// module.exports = async (api_url, res) => {
//     // console.log(api_url);
//     // let page=1;
//     // let perPage=100;
//     // let offset;
//     // const req_url = food_api_url+'page='+page+'&perPage='+perPage+'&serviceKey='+food_api_key;
//     // const temp = 'https://api.odcloud.kr/api/15035732/v1/uddi:ba47232a-68fb-4252-93e8-fef2699919cc_201909091317?serviceKey=ElUynGINShD0q5bgi2uxZDOj29Yt8N3mD%2BQIsF90q5yGg213a3R5NTn1%2BMoHoukc4tHaqtgAQckrQnV%2Fdnf0%2Bw%3D%3D';
//     request(api_url, (error, respond, body) => {
//         // if(error) console.log(error);
//         var obj = JSON.parse(body)
//         console.log(obj);
//         offset = obj.totalCount;
//         res.send(obj)
//     })
//     .then(() => {
//         page++;
//         console.log(page+" and "+offset);
//     })
// };
// http://openapi.seoul.go.kr:8088/(인증키)/xml/LOCALDATA_072404_SP/1/5/
// LOCALDATA_072404_SD
// LOCALDATA_072404_SP
// const base_url = 'http://openapi.seoul.go.kr:8088/'+process.env.FOOD_API_KEY_SEOUL+'/json/LOCALDATA_072404_';
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
module.exports = (res) => {
    var foodlist = [];
    region_list.map(region_code => {
        // console.log(region_code);
        // request를 여러번 반복해서 보내면 에러발생
        // request를 여러번 보내는게아니라, res.send()를 여러번 반복하면 에러 발생
        // 아무래도 웹페이지상에 json코드들을 띄워주는데, 여러개가 발생해서 그런듯
        request(base_url+region_code+'/1/5', (error, respond, body) => {
            if(error) console.log(error);
            var obj = JSON.parse(body)
            // console.log(obj);
            const temp = obj[Object.keys(obj)[0]].row[0];
            // console.log(obj[Object.keys(obj)[0]].row);
            // console.log(temp);
            foodlist.push(obj);
            // console.log(obj[Object.keys(obj)[0]].row.length);
            // console.log(obj[Object.keys(obj)[0]].row);
            // obj[Object.keys(obj)[0]].row.map(item => {
            //     console.log(item.SITEWHLADDR);
            // })
            // console.log("TEST : "+temp_arr);
            // res.send(obj)
        })
    })
    // if(temp_arr.length != 0) console.log(temp_arr);
    // else console.log("EMPTY");
    return "TEST";
}
