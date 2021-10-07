import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { FontDownloadSharp, MarkunreadRounded } from "@material-ui/icons";
import food_img from "./public/food.png";

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
    const [map, setMap] = useState(null);
    // 이런 방식으로 map을 저장해보는 방법
    // const [container, setContainer] = useState(null);
    // const [marker, setMarker] = useState([]);
    var markers = [];

    useEffect(() => {
        db.collection('food')
        .orderBy('name', 'desc')
        .onSnapshot(data => {
            // setMessages(data.docs.map(doc => ({id: doc.id, message: doc.data() })))
            // setFoods(data.docs.map(doc => ({name: doc.name, location: doc.location, price: doc.price, type: doc.type})))
            setFoods(data.docs.map(doc => ({id: doc.id, data: doc.data() })))
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
        setMap(new kakao.maps.Map(container, option));
    }, [])
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

    const setMarker = () => {
        foods.map(item => {
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(item.data.position.y, item.data.position.x)
            })
        // marker.setMap(map);
        })
    }

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
    const types = ["전체", "한식", "중식", "일식"];
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

    const inputCurlocation = (e) => {
        setCurlocation(e.target.value);
    }

    const test = () => {
        return(
            <div>test</div>
        )
    }

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };

    return(
        <>
        <div>test</div>
        <a href="/upload"><button>만들기</button></a>
        <a href="/detail"><button>목록</button></a>
        <List>
        {types.map(item => {
            return(
                <>
                <ListItem button onClick={() => setType(item)}>
                    <ListItemText primary={item} />
                    {/* <a onClick={() => setType(item)}> {item} </a> */}
                </ListItem>
                </>
            )
        })}
        </List>
        <label>위치 입력 : </label><input type = "text" value = {curlocation} onChange={inputCurlocation} />
        <button onClick={() => setSearch(search+1)}>입력</button>
        <button onClick={() => setCenter()}>이동</button>
        <button onClick={() => setMarker()}>마커표시</button>
        
        <div id="map" style={{width:"600px", height:"400px"}}></div>
        <List sx={style} component="nav" aria-label="mailbox folders">
        {
            type=="전체" ? 
            foods?.map(item => {
                return(
                    <>
                    {/* <a href={`/detail/${item.id}`}>
                        <div>{item.data.name} {item.data.location} {item.data.price} {item.data.type}</div>
                    </a> */}
                    <ListItem button>
                        {/* <ListItemText
                            primary={item.data.name}
                            secondary={item.data.location, item.data.price, item.data.type}
                         /> */}
                        
                        <a href={`/detail/${item.id}`}>
                            <div>{item.data.name} {item.data.location} {item.data.price} {item.data.type}</div>
                        </a>
                    </ListItem>
                    <Divider />
                    </>
                )
            })
            : 
            foods?.map(item => {
                if(item.data.type == type){
                    return(
                        <>
                        <div>{item.data.name} {item.data.location} {item.data.price} {item.data.type}</div>
                        </>
                    )
                }
            })
        }
        </List>
        계획 <br/>
        1. <br/>
        2. <br/>
        <button onClick={() => test()}>테스트</button>
        </>
    )
}

export default ListPage;