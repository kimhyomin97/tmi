import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';
import { List, ListItem, ListItemText } from "@material-ui/core";
import { FontDownloadSharp } from "@material-ui/icons";

const { kakao } = window;

function ListPage(){
    const [curlocation, setCurlocation] = useState();
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState(0);

    useEffect(() => {
        db.collection('food')
        .orderBy('name', 'desc')
        .onSnapshot(data => {
            // setMessages(data.docs.map(doc => ({id: doc.id, message: doc.data() })))
            // setFoods(data.docs.map(doc => ({name: doc.name, location: doc.location, price: doc.price, type: doc.type})))
            setFoods(data.docs.map(doc => ({id: doc.id, data: doc.data() })))
        })
    }, [])

    useEffect(() => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var option = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        option.center = new kakao.maps.LatLng(37.5663795479871, 127.045325760782); // 성동구 마장동으로 위치 변경
        var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
        
        var geocoder = new kakao.maps.services.Geocoder();

        var callback = function(result, status){
            if(status === kakao.maps.services.Status.OK){
                // console.log(result[0].x);
                option.center = new kakao.maps.LatLng(result[0].y, result[0].x);
                map = new kakao.maps.Map(container, option);
            }
        };
        geocoder.addressSearch(curlocation, callback);

        foods.map(item => {
            // console.log(item);
            var callback_mk = function(result, status){
                if(status === kakao.maps.services.Status.OK){
                    var markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
                    var marker = new kakao.maps.Marker({
                        position: markerPosition
                    });
                    marker.setMap(map);
                }
            };
            geocoder.addressSearch(item.data.location, callback_mk);
        })
        // 마커 보이기, 숨기기 버튼 구현하면 된다

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
        <div id="map" style={{width:"600px", height:"400px"}}></div>

        {
            type=="전체" ? 
            foods?.map(item => {
                return(
                    <>
                    <a href={`/detail/${item.id}`}>
                        <div>{item.data.name} {item.data.location} {item.data.price} {item.data.type}</div>
                    </a>
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
        계획 <br/>
        1. <br/>
        2. <br/>
        </>
    )
}

export default ListPage;