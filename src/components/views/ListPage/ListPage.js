import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';
import "./public/ListPage.css";
import { List, ListItem, ListItemText, ListItemIcon, Divider, ListItemSecondaryAction } from "@material-ui/core";
// import { FontDownloadSharp, MarkunreadRounded } from "@material-ui/icons";
import {한식, 패스트푸드, 중식, 치킨, 일식, 피자, 분식} from './public/image_export';
// import { MarkEmailReadSharp } from "@mui/icons-material";
import { TextField, Button, ButtonGroup} from "@mui/material";
import Map from "../MapPage/Map";
import axios from "axios";
const { kakao } = window;

function ListPage(){
    const [curlocation, setCurlocation] = useState();
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState(0);
    const [map, setMaps] = useState(null);
    const [markers, setMarkers] = useState([]); // 게시글 리스트 (마커)
    const [foodlist, setFoodlist] = useState([]); // 음식점 리스트
    const [isVisible, setIsVisible] = useState(false);
    var temps = [];

    useEffect(() => {
        db.collection('food')
        .orderBy('name', 'desc')
        .onSnapshot(data => {
            setFoods(data.docs.map(doc => ({id: doc.id, data: doc.data() })));
        })
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var option = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(36.6116946201537, 127.291002698042),
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        setMaps(new kakao.maps.Map(container, option));
        axios
            .get('http://localhost:5000/getfood')
            .then((response) => {
                console.log(response.data);
                response?.data.map(item => {
                    item[Object.keys(item)]?.row.map(element => {
                        var geocoder = new kakao.maps.services.Geocoder(), wthX = element.X, wthY = element.Y;
                        if(wthX!=""){
                            // 서버에서 리턴되는 데이터들 중
                            // 좌표값이 빈칸인 데이터들이 있다
                            // 해당 데이터의 좌표를 변환하려고 하면 Bad Request (query가 잘못된 값일때 발생) 가 발생한다
                            geocoder?.transCoord(wthX, wthY, transCoordCB, {
                                input_coord: kakao.maps.services.Coords.WTM,
                                output_coord: kakao.maps.services.Coords.WGS84
                            });
                            function transCoordCB(result, status){
                                if(status ===kakao.maps.services.Status.OK){
                                    var marker = new kakao.maps.Marker({
                                        position: new kakao.maps.LatLng(result[0].y, result[0].x),
                                    })
                                    // 이부분에서 마커에 대한 정보를 더 채우면 완성될듯
                                    setFoodlist(foodlist => [...foodlist, {marker: marker}]);
                                }
                            }
                        }
                    })
                })
                // response?.data[Object.keys(response.data)].row.map(item => {
                //     console.log(item);
                // })
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
    }, [])

    useEffect(() => {
        foods.map(item => {
            var iwContent = '<a href=/detail/'+item.id+'><div style="padding:5px;">'+item.data.name+'</div></a>', iwRemoveable = true;
            var iwRemoveable = true;
            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(item.data.position.y, item.data.position.x)
            })
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
    
    function setMarker(element){
        markers?.map((item, i) => {
            if(item.type == type || type == "전체")
            markers[i].marker.setMap(element);
        })
    }
    function setMarker2(element){
        foodlist?.map((item, i) => {
            foodlist[i].marker.setMap(element);
        })
    }
    const [type, setType] = useState("전체");
    const types = ["전체", "한식", "중식", "일식", "치킨", "피자", "패스트푸드", "분식"];

    const typeHandler = (element) =>{
        setType(element);
        setMarker(null);
        setMarker2(null); // foodlist 지우기
    }

    const inputCurlocation = (e) => {
        setCurlocation(e.target.value);
    }

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };
    return(
        <>

        {/* <Map
            // style={{width:"1200px", height:"800px"}}
            center={{MA:33.450701, LA:126.570667}} // 지도 중앙위치 설정
            
        ></Map> */}


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
        <TextField 
            class="search_text"
            variant="standard"
            // label="위치 입력"
            placeholder="위치 입력"
            value={curlocation}
            onChange={inputCurlocation}
            />
        <Button style={{margin: "0 0 8px 8px"}} variant="contained" onClick={()=>setCenter()}>이동</Button>
        <Button style={{margin: "0 0 8px 8px"}} className ={"search_bt"} variant="contained" onClick={()=>setMarker(map)}>마커표시</Button>
        <Button style={{margin: "0 0 8px 8px"}} className ={"search_bt"} variant="contained" onClick={()=>setMarker2(map)}>마커표시2</Button>
        <Button style={{margin: "0 0 8px 8px"}} className ={"search_bt"} variant="contained" onClick={()=>setMarker(null)}>마커지우기</Button>

        {
            user_account ?
                <a href="/upload">
                    <Button style={{margin: "0 0 8px 8px"}} className ={"search_bt"} variant="contained">
                        글 작성하기
                    </Button>
                </a>
                :
                <></>
        }
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
                                <div className="list_item_text">{item.data.name} {item.data.price}원 ({item.data.location})</div>
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
                                    <div className="list_item_text">{item.data.name} {item.data.price}원 ({item.data.location})</div>
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