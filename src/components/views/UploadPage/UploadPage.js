import { useEffect, useState } from "react";

const {kakao} = window;

function UploadPage(){
    useEffect(() => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var option = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        option.center = new kakao.maps.LatLng(37.5663795479871, 127.045325760782); // 성동구 마장동으로 위치 변경
        var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴

        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch('성동구 마장동', callback);
        console.log(geocoder);

        var callback = function(result, status){
            if(status === kakao.maps.services.Status.OK){
                console.log(result);
            }
        };
        
        // 성동구 마장동
        // x: "127.045325760782"
        // y: "37.5663795479871"
        var places = new kakao.maps.services.Places();

        var callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // console.log(result);
                console.log(result)
            }
        };

        places.keywordSearch('판교 치킨', callback);
    }, [])

    


    const [name, setName] = useState("");
    const [foodtype, setFoodtype] = useState();
    const [price, setPrice] = useState();
    const [location, setLocation] = useState();
    const [destination, setDestination] = useState();
    const [count, setCount] = useState();
    const [send, setSend] = useState(0);

    const inputName = (e) => {
        setName(e.target.value);
    }
    const inputPrice = (e) => {
        setPrice(e.target.value);
    }
    useEffect(() => {
        // 이부분에서 파이어베이스 데이터베이스에 등록하는 코드 작성
    }, [send])

    return (
        <>
        <div>UploadPage</div>
        <label>음식 이름 : </label><input type = "text" value={name} onChange={inputName} />
        <div>변경 : {name}</div>
        <div>종류 : (한식, 양식, 중식, 일식) 선택형</div>
        <input type="radio" value="한식" name = "foodtype" onClick={() => setFoodtype("한식")}/>한식
        <input type="radio" value="중식" name = "foodtype" onClick={() => setFoodtype("중식")}/>중식
        <input type="radio" value="일식" name = "foodtype" onClick={() => setFoodtype("일식")}/>일식
        <div>변경 : {foodtype}</div>
        <label>가격 : </label><input type = "text" value={price} onChange={inputPrice} />
        <div>변경 : {price}</div>
        <div>위치 : </div> ## 이부분은 지도에서 마커찍어가지고 해당 좌표값 가져오도록 수정해야된다
        <div>수령장소 : </div> ## 이부분도 마찬가지로 마커찍어야되지만 위치와 수령장소 하나로 통일가능할듯
        <div>인원??</div> ## 숫자만 입력할 수 있도록 제한해야되나?
        <div>.</div>
        <div>뭐있을까 고민해봐야겠다</div>
        <div>여기서 입력하면 데이터베이스에 등록</div>
        <button onClick={() => setSend(send+1)}>입력</button>
        <div id="map" style={{width:"400px", height:"400px"}}></div>
        맵 뿌려놓고 마크찍으면 해당 좌표 리턴해주는 로직 만들면 될듯
        </>
    )
}

export default UploadPage;