import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';
import "./public/ListPage.css";
import { List, ListItem, ListItemText, ListItemIcon, Divider, ListItemSecondaryAction } from "@material-ui/core";
import { FontDownloadSharp, MarkunreadRounded } from "@material-ui/icons";
// import { bibimbap } from "./public";
// import bibimbap from "./public/bibimbap.png"
import {한식, 패스트푸드, 중식, 치킨, 일식, 피자, 분식} from './public/image_export';
import { MarkEmailReadSharp } from "@mui/icons-material";
import { TextField, Button, ButtonGroup} from "@mui/material";
// import LunchDiningIcon from '@mui/icons-material/LunchDining';
// import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const { kakao } = window;

function ListPage(){
    const [curlocation, setCurlocation] = useState();
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState(0);
    const [map, setMaps] = useState(null);
    // 이런 방식으로 map을 저장해보는 방법
    // const [container, setContainer] = useState(null);
    const [markers, setMarkers] = useState([]);
    // var markers = [];
    const [isVisible, setIsVisible] = useState(false);
    var temps = [];

    useEffect(() => {
        db.collection('food')
        .orderBy('name', 'desc')
        .onSnapshot(data => {
            // setMessages(data2VDFY.docs.map(doc => ({id: doc.id, message: doc.data() })))
            // setFoods(data.docs.map(doc => ({name: doc.name, location: doc.location, price: doc.price, type: doc.type})))
            setFoods(data.docs.map(doc => ({id: doc.id, data: doc.data() })));
        })
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        // setContainer(document.getElementById('map'));
        var option = { //지도를 생성할 때 필요한 기본 옵션
            // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            center: new kakao.maps.LatLng(36.6116946201537, 127.291002698042),
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        // option.center = new kakao.maps.LatLng(37.5663795479871, 127.045325760782); // 성동구 마장동으로 위치 변경
        // var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
        setMaps(new kakao.maps.Map(container, option));        
    }, [])
    // 여기까지 진행
    // 밥먹고와서 카카오 로그아웃 살펴보면 될듯
    
    useEffect(() => {
        foods.map(item => {
            // var iwContent = '<div style="padding:5px;">Hello World!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var iwContent = '<a href=/detail/'+item.id+'><div style="padding:5px;">'+item.data.name+'</div></a>', iwRemoveable = true;
            // var iwContent = <a href={`/detail/${item.id}`}><div style="padding:5px;">'+item.data.name+'</div></a>;
            var iwRemoveable = true;
            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });
            var marker = new kakao.maps.Marker({
                // map: map,
                position: new kakao.maps.LatLng(item.data.position.y, item.data.position.x)
            })
            // marker.setMap(map);
            // isVisible && marker.setMap(map);
            // console.log(marker);
            setMarkers(markers => [...markers, {marker: marker, type:item.data.type}]);
            temps.push(marker);
            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            })
        })
    }, [foods])
    const setCenter = () => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var option = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        var geocoder = new kakao.maps.services.Geocoder();
        var callback = function(result, status){
            if(status === kakao.maps.services.Status.OK){
                console.log(result);
                // option.center = new kakao.maps.LatLng(result[0].y, result[0].x);
                var move_location = new kakao.maps.LatLng(result[0].y, result[0].x);
                map.setCenter(move_location);
            }
        }
        geocoder.addressSearch(curlocation, callback);
    }
    const [user_account, setUser_account] = useState(null);
    useEffect(() => {
        window.Kakao.API.request({
        url: '/v2/user/me',
        success: function({ kakao_account }){
            setUser_account(kakao_account);
        }
        })
    }, []);
    // const setMarker = () => {
    //     foods.map(item => {
    //         if(item.data.type == type || type == "전체"){
    //             // var iwContent = '<div style="padding:5px;">Hello World!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    //             var iwContent = '<a href=/detail/'+item.id+'><div style="padding:5px;">'+item.data.name+'</div></a>', iwRemoveable = true;
    //             // var iwContent = <a href={`/detail/${item.id}`}><div style="padding:5px;">'+item.data.name+'</div></a>;
    //             var iwRemoveable = true;
    //             var infowindow = new kakao.maps.InfoWindow({
    //                 content : iwContent,
    //                 removable : iwRemoveable
    //             });
    //             var marker = new kakao.maps.Marker({
    //                 // map: map,
    //                 position: new kakao.maps.LatLng(item.data.position.y, item.data.position.x)
    //             })
    //             marker.setMap(map);
    //             // isVisible && marker.setMap(map);
    //             setMarkers([...markers, marker]);
    //             kakao.maps.event.addListener(marker, 'click', function() {
    //                 infowindow.open(map, marker);
    //             })
    //         }
    //     })

    //     // console.log(markers);
    //     // markers.map(item => {
    //     //     // console.log(item);
    //     //     item.setMap(map);
    //     // })
    //     // console.log(temps);
    //     // temps.map(item => {
    //     //     console.log(item);
    //     // })
        
    //     // 이부분 마커를 state에 저장해놓고, 출력하고 지우는 기능부터 하면 된다
    // }
    
    function setMarker(element){
        markers?.map((item, i) => {
            if(item.type == type || type == "전체")
            markers[i].marker.setMap(element);
        })
        // foods.map(item=>{
        //     var iwContent = '<a href=/detail/'+item.id+'><div style="padding:5px;">'+item.data.name+'</div></a>', iwRemoveable = true;
        //     // var iwContent = <a href={`/detail/${item.id}`}><div style="padding:5px;">'+item.data.name+'</div></a>;
        //     var iwRemoveable = true;
        //     var infowindow = new kakao.maps.InfoWindow({
        //         content : iwContent,
        //         removable : iwRemoveable
        //     });
        //     var marker = new kakao.maps.Marker({
        //         // map: map,
        //         position: new kakao.maps.LatLng(item.data.position.y, item.data.position.x)
        //     })
        //     // marker.setMap(map);
        //     marker.setMap(element);
        //     // isVisible && marker.setMap(map);
        //     setMarkers([...markers, marker]);
        //     kakao.maps.event.addListener(marker, 'click', function() {
        //         infowindow.open(map, marker);
        //     })
        // })
    }

    // function setMarker(myMap){
    //     foods.map(item => {
    //         if(item.data.type == type){
    //             var iwContent = '<a href=/detail/'+item.id+'><div style="padding:5px;">'+item.data.name+'</div></a>', iwRemoveable = true;
    //             var iwRemoveable = true;
    //             var infowindow = new kakao.maps.InfoWindow({
    //                 content : iwContent,
    //                 removable : iwRemoveable
    //             });
    //             var marker = new kakao.maps.Marker({
    //                 position: new kakao.maps.LatLng(item.data.position.y, item.data.position.x)
    //             })
    //             marker.setMap(myMap);
    //             setMarkers([...markers, marker]);
    //             kakao.maps.event.addListener(marker, 'click', function() {
    //                 infowindow.open(map, marker);
    //             })
    //         }
    //     })
    // }

    // const test = () => {
    //     setIsVisible(true);
    //     // markers.map(item => {
    //     //     item.setMap(map);
    //     //     // console.log(item);
    //     //     // console.log(map);
    //     // })
    // }
    // const test2 = () => {
    //     setIsVisible(false);
    //     console.log(isVisible);
    // }

    useEffect(() => {
        // var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        // var option = { //지도를 생성할 때 필요한 기본 옵션
        //     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        //     level: 4 //지도의 레벨(확대, 축소 정도)
        // };
        // // option.center = new kakao.maps.LatLng(37.5663795479871, 127.045325760782); // 성동구 마장동으로 위치 변경
        // // // var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
        // // // // setMap(new kakao.maps.Map(container, option));
        
        // var geocoder = new kakao.maps.services.Geocoder();

        // var callback = function(result, status){
        //     if(status === kakao.maps.services.Status.OK){
        //         // console.log(result[0].x);
        //         option.center = new kakao.maps.LatLng(result[0].y, result[0].x);
        //         new kakao.maps.Map(container, option);
        //         setMap(kakao.maps.Map(container, option));
        //     }
        // };
        // geocoder.addressSearch(curlocation, callback);

        // foods.map(item => {
        //     // console.log(item);
        //     var callback_mk = function(result, status){
        //         if(status === kakao.maps.services.Status.OK){
        //             var markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
        //             var marker = new kakao.maps.Marker({
        //                 position: markerPosition
        //             });
        //             marker.setMap(map);
        //         }
        //     };
        //     geocoder.addressSearch(item.data.location, callback_mk);
        // })
        // // 마커 보이기, 숨기기 버튼 구현하면 된다

        // foods.map(item => {
        //     // console.log(item.data.position.y, item.data.position.x);
        //     // console.log(item.data.position.x);
        //     var marker = new kakao.maps.Marker({
        //         map: map,
        //         position: new kakao.maps.LatLng(item.data.position.y, item.data.position.x)
        //     })
        //     // marker.setMap(map);
        // })

        // 성동구 마장동
        // x: "127.045325760782"
        // y: "37.5663795479871"
    }, [search])

    const [type, setType] = useState("전체");
    const types = ["전체", "한식", "중식", "일식", "치킨", "피자", "패스트푸드", "분식"];
    // console.log(foods);

    const viewMarker = () => {
        // var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        // var option = { //지도를 생성할 때 필요한 기본 옵션
        //     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        //     level: 4 //지도의 레벨(확대, 축소 정도)
        // };
        // option.center = new kakao.maps.LatLng(37.5663795479871, 127.045325760782); // 성동구 마장동으로 위치 변경
        // var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
        
        // var geocoder = new kakao.maps.services.Geocoder();
        // foods.map(item => {
        //     // console.log(item);
        //     var callback_mk = function(result, status){
        //         if(status === kakao.maps.services.Status.OK){
        //             var markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
        //             var marker = new kakao.maps.Marker({
        //                 position: markerPosition
        //             });
        //             marker.setMap(map);
        //         }
        //     };
        //     geocoder.addressSearch(item.data.location, callback_mk);
        // })
    }

    const typeHandler = (element) =>{
        setType(element);
        setMarker(null);
        // setMarkers(null);
        // markers.map((item, i) => {
        //     if(item.type == element){
        //         markers[i].marker.setMap(element);
        //     }
        // })
    }

    const inputCurlocation = (e) => {
        setCurlocation(e.target.value);
    }

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };
    // 아이콘 : https://www.flaticon.com/premium-icon/pizza_2454219?term=pizza&related_id=2454219
    // 피자, 분식 다운받아야 된다
    return(
        <>
        <ButtonGroup class="typebt_wrap" size="large" aria-label="large button group">
            {types.map(item => {
                return(
                    <Button variant="contained" style={{margin: "0 8px 8px 0"}} onClick={() => typeHandler(item)}>
                        {item}
                    </Button>
                )
            })}
        </ButtonGroup>
        <br/>
        {/* <label>위치 입력 : </label><input type = "text" value = {curlocation} onChange={inputCurlocation} /> */}
        <TextField 
            class="search_text"
            variant="standard"
            // label="위치 입력"
            placeholder="위치 입력"
            value={curlocation}
            onChange={inputCurlocation}
            />
        {/* <button onClick={() => setSearch(search+1)}>입력</button> */}
        {/* <button onClick={() => setCenter()}>이동</button> */}
        <Button style={{margin: "0 0 8px 8px"}} variant="contained" onClick={()=>setCenter()}>이동</Button>
        {/* <button onClick={() => setMarker()}>마커표시</button> */}
        {/* <Button style={{margin: "0 10px 0 0"}} className ={"search_bt"} variant="contained" onClick={()=>setMarker()}>마커표시</Button> */}
        <Button style={{margin: "0 0 8px 8px"}} className ={"search_bt"} variant="contained" onClick={()=>setMarker(map)}>마커표시</Button>
        <Button style={{margin: "0 0 8px 8px"}} className ={"search_bt"} variant="contained" onClick={()=>setMarker(null)}>마커지우기</Button>

        {/* <button onClick={() => test()}>테스트</button>
        <button onClick={() => test2()}>테스트2</button> */}
<<<<<<< HEAD
        <a href="/upload">
            <Button style={{margin: "0 0 8px 8px"}} className ={"search_bt"} variant="contained">
                글 작성하기
            </Button>
        </a>
=======
        {
            user_account ?
                <a href="/upload">
                    <Button style={{margin: "0 10px 0 0"}} className ={"search_bt"} variant="contained">
                        글 작성하기
                    </Button>
                </a>
                :
                <></>
        }
>>>>>>> c42e32e9ff5822b04c1ae250564dbafb0247c77e
        <div id="map" className="kakao_map"></div>
        <List sx={style} component="nav" aria-label="mailbox folders">
        {
            type=="전체" ? 
            foods?.map(item => {
                return(
                    <>
                    <a href={`/detail/${item.id}`}>
                        <ListItem>
                            <img src={require("./public/"+item.data.type+".png").default} class="food_img"/>
                            {/* <img src={한식} class="food_img"/> */}
                            <ListItemText>
                                <div className="list_item_text">{item.data.name} {item.data.location} {item.data.price} {item.data.type}</div>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                    </a>
                    </>
                )
            })
            : 
            foods?.map(item => {
                if(item.data.type == type){
                    return(
                        <>
                        <a href={`/detail/${item.id}`}>
                            <ListItem>
                                <img src={require("./public/"+item.data.type+".png").default} class="food_img"/>
                                {/* <img src={한식} class="food_img"/> */}
                                <ListItemText>
                                    <div className="list_item_text">{item.data.name} {item.data.location} {item.data.price} {item.data.type}</div>
                                </ListItemText>
                            </ListItem>
                        </a>
                        <Divider />
                        </>
                    )
                }
            })
        }
        </List>
        </>
    )
}

export default ListPage;