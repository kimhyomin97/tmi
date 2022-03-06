// var request = require('request');
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