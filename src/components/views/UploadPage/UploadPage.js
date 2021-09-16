import { useState } from "react";

function UploadPage(){
    const [name, setName] = useState("");
    const [foodtype, setFoodtype] = useState();
    const [price, setPrice] = useState();
    const [location, setLocation] = useState();
    const [destination, setDestination] = useState();
    const [count, setCount] = useState();

    const inputName = (e) => {
        setName(e.target.value);
    }
    const inputPrice = (e) => {
        setPrice(e.target.value);
    }

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
        </>
    )
}

export default UploadPage;