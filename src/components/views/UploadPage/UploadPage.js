import { useEffect, useState } from "react";
// import db from "../../firebase";
import db from "../../firebase";
import firebase from 'firebase';
import { ContactsOutlined } from "@material-ui/icons";
import "./public/UploadPage.css";
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { fontSize } from "@mui/system";
// import firebase from '../../firebase';

const {kakao} = window;

function UploadPage(){
    const [name, setName] = useState("");
    const [foodtype, setFoodtype] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [position, setPosition] = useState({La : 127.29100269804199, Ma : 36.61169462015369});
    const [search, setSearch] = useState(0);
    const [destination, setDestination] = useState();
    const [count, setCount] = useState();
    const [send, setSend] = useState(0);
    const [kakaoid, setKakaoid] = useState();
    const [username, setUsername] = useState();

    const inputName = (e) => {
        setName(e.target.value);
    }
    const inputPrice = (e) => {
        setPrice(e.target.value);
    }
    const inputLocation = (e) => {
        setLocation(e.target.value);
    }
    
    const [test, setTest] = useState(0);
    
    useEffect(() => {
        // 필요한거 : 지명 검색하면 해당위치로 지도 이동
        // 마크 띄워주고 이 위치가 맞는지 확인
        // 해당위치가 맞다면 해당위치 좌표 저장 -> 디비에 저장

        
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var option = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(36.61169462015369, 127.29100269804199), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        // option.center = new kakao.maps.LatLng(37.5663795479871, 127.045325760782); // 성동구 마장동으로 위치 변경
        var geocoder = new kakao.maps.services.Geocoder();
        // console.log(option.center);
        // console.log(geocoder);
        var callback = function(result, status){
            if(status === kakao.maps.services.Status.OK){
                // console.log(result[0].x);
                // console.log(result[0].y);
                // option.center = new kakao.maps.LatLng(result[0].y, result[0].x); // 성동구 마장동으로 위치 변경
                // var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
                // setPosition({y: result[0].y,x: result[0].x});
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                marker.setDraggable(true);
                kakao.maps.event.addListener(marker, 'dragend', function() {
                    setPosition({y: marker.getPosition().Ma, x: marker.getPosition().La})
                });
                // console.log(marker.getPosition());

                // var infowindow = new kakao.maps.InfoWindow({
                //     content: '<div style="width:150px;text-align:center;padding:6px 0;">여기</div>'
                // });
                // infowindow.open(map, marker);
                map.setCenter(coords);
                
                // 세종로 2511
                // La : 127.29100269804199
                // Ma : 36.61169462015369
                // console.log(coords);
            }
        };
        geocoder.addressSearch(location, callback);
        var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴

        // var coords = new kakao.maps.LatLng(position.y, position.x);
        // map.setCenter(coords);
        
        // geocoder.addressSearch('성동구 마장동', function(result, status) {

        //     // 정상적으로 검색이 완료됐으면 
        //      if (status === kakao.maps.services.Status.OK) {
        
        //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
        //         // 결과값으로 받은 위치를 마커로 표시합니다
        //         var marker = new kakao.maps.Marker({
        //             map: map,
        //             position: coords
        //         });
        
        //         // 인포윈도우로 장소에 대한 설명을 표시합니다
        //         var infowindow = new kakao.maps.InfoWindow({
        //             content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
        //         });
        //         infowindow.open(map, marker);
        
        //         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        //         map.setCenter(coords);
        //     } 
        // });

        // 성동구 마장동
        // x: "127.045325760782"
        // y: "37.5663795479871"
        // var places = new kakao.maps.services.Places();
    }, [search])
    
    useEffect(() => {
        // 이부분에서 파이어베이스 데이터베이스에 등록하는 코드 작성
        
        // e.preventDefault();
        // db.collection('messages').add({
        //     message: "test",
        //     username: "testtest",
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
        // })

        // db.collection('food').add({
        //     // name: "name",
        //     // type: "foodtype",
        //     // price: "price",
        //     // location: "location",
        //     name: name,
        //     type: foodtype,
        //     price: price,
        //     location: location,
        //     // position: position,
        //     // message: input,
        //     // username: username,
        //     // timestamp: firebase.firestore.FieldValue.serverTimestamp()
        // })

        // 메세지 화면에 세팅
        // setMessages([...messages, {username: username, message: input}]);
        // setInput("");

        // console.log(name);
        // console.log(foodtype);
        // console.log(price);
        // console.log(location);
        // console.log(position);
    }, [send])
    const sendInfo = (e) => {
        e.preventDefault();
        db.collection('food').add({
            name: name,
            type: foodtype,
            price: price,
            location: location,
            position: position,
            username: username,
            kakaoid: kakaoid,
            // message: input,
            // username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log(name);
        console.log(foodtype);
        console.log(price);
        console.log(location);
        alert("전송완료");
    }
    const [user_account, setUser_account] = useState({});
    useEffect(() => {
        window.Kakao.API.request({
            url: '/v2/user/me',
            // success: function({ kakao_account }){
            // // const { age_range, profile } = kakao_account;
            // setUser_account(kakao_account);
            // }
            success: function(res){
                // console.log(res);
                // console.log(res.id);
                // console.log(res.kakao_account.profile.nickname);
                setKakaoid(res.id);
                setUsername(res.kakao_account.profile.nickname);
            }
        })
    // }, [login]);
    }, []);

    // console.log(localStorage);
    const markertest = (e) => {
        // console.log(e);
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var option = { //지도를 생성할 때 필요한 기본 옵션
            // center: new kakao.maps.LatLng(36.61169462015369, 127.29100269804199), //지도의 중심좌표.
            center: new kakao.maps.LatLng(position.Ma, position.La), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
        // var coords = new kakao.maps.LatLng(36.6116, 127.2910);
        // var coords = new kakao.maps.LatLng(marker.getPosition().Ma, marker.getPosition().La);
        var coords = new kakao.maps.LatLng(position.Ma, position.La);
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });
        marker.setDraggable(true);
        setPosition({La: marker.getPosition().La, Ma: marker.getPosition().Ma});
        console.log(marker.getPosition());
        // 이부분 문제 : 테스트 버튼을 누를때마다 지도가 생성된다
        // 즉, container, option, map, coords, marker 등 한곳에 정의하는 것이 필요하다
        // 컴포넌트로 나눠서 해결하면 좋을듯
    }

    return (
        <>
        <div className="upload_wrapper">
            <div className="upload_wrapper_item">
                <div id="map" className="upload_kakao_map"></div>
            </div>
            <div className="upload_wrapper_item">
                <table>
                    <tr>
                        <td><label>음식 이름 : </label></td>
                        <td><input type = "text" value={name} onChange={inputName} /></td>
                    </tr>
                    <div>변경 : {name}</div>
                    {/* <FormControl component="fieldset" className="upload_checkbox">
                        <FormLabel component="legend" style={{color:'black'}}>Gender</FormLabel>
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl> */}
                    <tr>
                        <td><div>종류 </div></td>
                        <td>
                            <input type="radio" value="한식" name = "foodtype" onClick={() => setFoodtype("한식")}/>한식
                            <input type="radio" value="중식" name = "foodtype" onClick={() => setFoodtype("중식")}/>중식
                            <input type="radio" value="일식" name = "foodtype" onClick={() => setFoodtype("일식")}/>일식
                            <input type="radio" value="일식" name = "foodtype" onClick={() => setFoodtype("치킨")}/>치킨
                            <input type="radio" value="일식" name = "foodtype" onClick={() => setFoodtype("피자")}/>피자
                            <input type="radio" value="일식" name = "foodtype" onClick={() => setFoodtype("패스트푸드")}/>패스트푸드
                            <input type="radio" value="일식" name = "foodtype" onClick={() => setFoodtype("분식")}/>분식
                        </td>
                    </tr>
                    <div>변경 : {foodtype}</div>
                    <label>가격 : </label><input type = "text" value={price} onChange={inputPrice} />
                    <div>변경 : {price}</div>
                    <label>위치 : </label><input type = "text" value={location} onChange={inputLocation} />
                    <div>변경 : {location}</div>
                    <label>세부위치 : </label><input type = "text" />
                    {/* 세부위치는 DetailPage에서 노출되지 않도록 한다 */}
                    <button onClick={() => setSearch(search+1)}>검색</button>
                    <div>## 이부분은 지도에서 마커찍어가지고 해당 좌표값 가져오도록 수정해야된다</div>
                    <div>수령장소 : </div> ## 이부분도 마찬가지로 마커찍어야되지만 위치와 수령장소 하나로 통일가능할듯
                    <div>인원??</div> ## 숫자만 입력할 수 있도록 제한해야되나?
                    <div>.</div>
                    <div>뭐있을까 고민해봐야겠다</div>
                    <div>여기서 입력하면 데이터베이스에 등록</div>
                    {/* <button onClick={() => setSend(send+1)}>입력</button> */}
                    <button onClick={sendInfo}>전송</button>
                    {/* <button onClick={() => setTest(test+1)}>테스트</button> */}
                    {/* <button onClick={markertest}>테스트</button> */}
                    맵 뿌려놓고 마크찍으면 해당 좌표 리턴해주는 로직 만들면 될듯
                    <div>좌표 : {position.x}</div>
                    <div>좌표 : {position.y}</div>
                </table>
            </div>
        </div>
        </>
    )
}

export default UploadPage;