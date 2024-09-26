import React, { useEffect, useState } from "react";
// import {Helmet} from "react-helmet";
// import './public/MapPage.css';

const { kakao } = window;

function Map(props){
    console.log(props);
    
    // const [map, setMap] = useState(new kakao.maps.Map(container, option));
    const mapDrawer = () => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var option = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(props.center.Ma, props.center.La), //지도의 중심좌표.
            level: props.level //지도의 레벨(확대, 축소 정도)
        };
        var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
    }
    useEffect(() => {
        mapDrawer();
        // var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        // var option = { //지도를 생성할 때 필요한 기본 옵션
        //     center: new kakao.maps.LatLng(props.center.Ma, props.center.La), //지도의 중심좌표.
        //     level: props.level //지도의 레벨(확대, 축소 정도)
        // };
        // // option.center = new kakao.maps.LatLng(37.5663795479871, 127.045325760782); // 성동구 마장동으로 위치 변경
        // // var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
        // // setMap(new kakao.maps.Map(container, option));
        // var geocoder = new kakao.maps.services.Geocoder();

        // var callback = function(result, status){
        //     if(status === kakao.maps.services.Status.OK){
        //         // console.log(result);
        //     }
        // };
        
        // geocoder.addressSearch('성동구 마장동', callback);
        // // 성동구 마장동
        // // x: "127.045325760782"
        // // y: "37.5663795479871"
    }, [props])
    
    // 카카오 지도 라이브러리
    // clusterer : 마커를 클러스터링 할 수 있다
    // services : 장소 검색과 주소-좌표 변환을 할 수 있는 services 라이브러리
    // drawing : 지도 위에 마커와 그래픽스 객체를 쉽게 그릴 수 있게 그리기 모드를 지원하는 drawing 라이브러리

    return(
        <>
        <div>This is Map</div>
        <div id="map" className="kakao_map"></div>
        </>
    )
}

export default Map;