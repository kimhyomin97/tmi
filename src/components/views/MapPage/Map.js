import React, { useEffect, useState } from "react";
// import {Helmet} from "react-helmet";
// import './public/MapPage.css';

const { kakao } = window;

function Map(){
    useEffect(() => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var option = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴

    }, [])
    

    // 카카오 지도 라이브러리
    // clusterer : 마커를 클러스터링 할 수 있다
    // services : 장소 검색과 주소-좌표 변환을 할 수 있는 services 라이브러리
    // drawing : 지도 위에 마커와 그래픽스 객체를 쉽게 그릴 수 있게 그리기 모드를 지원하는 drawing 라이브러리


    return(
        <>
        <div>This is Map</div>
        <div id="map" style={{width:"800px", height:"600px"}}></div>
        </>
    )
}

export default Map;