import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';
import "./public/ListPage.css";
import { List, ListItem, ListItemText, ListItemIcon, Divider, ListItemSecondaryAction } from "@material-ui/core";
import { FontDownloadSharp, MarkunreadRounded } from "@material-ui/icons";
import {한식, 패스트푸드, 중식, 치킨, 일식, 피자, 분식} from './public/image_export';
import { MarkEmailReadSharp } from "@mui/icons-material";
import { TextField, Button, ButtonGroup} from "@mui/material";
const { kakao } = window;

function ListPage(){
    const [curlocation, setCurlocation] = useState();
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState(0);
    const [map, setMaps] = useState(null);
    const [markers, setMarkers] = useState([]);
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
    const [type, setType] = useState("전체");
    const types = ["전체", "한식", "중식", "일식", "치킨", "피자", "패스트푸드", "분식"];

    const typeHandler = (element) =>{
        setType(element);
        setMarker(null);
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