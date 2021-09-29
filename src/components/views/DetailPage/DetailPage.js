import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';

const { kakao } = window;

function DetailPage(props){
    // console.log(props.match.params.foodid);
    const [food, setFood] = useState();
    useEffect(() => {
        db.collection('food')
        .orderBy('name', 'desc')
        .onSnapshot(data => {
            // setMessages(data.docs.map(doc => ({id: doc.id, message: doc.data() })))
            // setFoods(data.docs.map(doc => ({name: doc.name, location: doc.location, price: doc.price, type: doc.type})))
            // setFoods(data.docs.map(doc => ({id: doc.id, data: doc.data() })))
            data.docs.map(item => {
                // console.log(item);
                if(item.id == props.match.params.foodid){
                    // console.log(item.data());
                    setFood({id: item.id, data: item.data() });
                }
            })
        })
    }, [])

    useEffect(() => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var option = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        option.center = new kakao.maps.LatLng(37.5663795479871, 127.045325760782); // 성동구 마장동으로 위치 변경
        var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴

        var geocoder = new kakao.maps.services.Geocoder();

        var callback = function(result, status){
            if(status === kakao.maps.services.Status.OK){
                console.log(result);
            }
        };
        
        geocoder.addressSearch('성동구 마장동', callback);
        // 성동구 마장동
        // x: "127.045325760782"
        // y: "37.5663795479871"
    }, [])

    // console.log(food);
    // console.log(food.data);
    
    return (
        <>
        <div>{food?.data.name}</div>
        <div>{food?.data.type}</div>
        <div>{food?.data.price}</div>
        <div>{food?.data.location}</div>
        <div>신청하기 버튼</div>
        <br/>
        <div>DetailPage</div>
        <div>데이터베이스에 등록된 음식들 가져와서 뿌려준다</div>
        <div>음식 종류별로 카테고리 만들어서 클릭하면 해당 음식들만 쭉 나오게 하면 좋을듯</div>
        <div>지도에 뿌려주는 방법은 조금 나중에 생각해보자</div>
        <div id="map" style={{width:"600px", height:"400px"}}></div>
        </>
    )
}

export default DetailPage;