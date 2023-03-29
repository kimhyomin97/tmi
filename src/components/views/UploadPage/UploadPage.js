import { useEffect, useState } from "react";
// import db from "../../firebase";
import db from "../../../firebase";
import firebase from "../../../firebase";
// import { ContactsOutlined } from "@material-ui/icons";
import "./public/UploadPage.css";
// import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
// import { fontSize } from "@mui/system";
import { Button } from "@material-ui/core";
// import firebase from '../../firebase';

const { kakao } = window;

function UploadPage({ history }) {
  const [name, setName] = useState("");
  const [foodtype, setFoodtype] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState({
    La: 127.29100269804199,
    Ma: 36.61169462015369,
  });
  const [search, setSearch] = useState(0);
  const [destination, setDestination] = useState();
  const [count, setCount] = useState();
  const [send, setSend] = useState(0);
  const [kakaoid, setKakaoid] = useState();
  const [username, setUsername] = useState();

  const inputName = (e) => {
    setName(e.target.value);
  };
  const inputPrice = (e) => {
    setPrice(e.target.value);
  };
  const inputLocation = (e) => {
    setLocation(e.target.value);
  };

  const [myid, setMyid] = useState();
  useEffect(() => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function (res) {
        setMyid(res.id);
      },
    });
  }, []);

  const [test, setTest] = useState(0);

  useEffect(() => {
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var option = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(36.61169462015369, 127.29100269804199), //지도의 중심좌표.
      level: 4, //지도의 레벨(확대, 축소 정도)
    };
    var geocoder = new kakao.maps.services.Geocoder();
    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        marker.setDraggable(true);
        kakao.maps.event.addListener(marker, "dragend", function () {
          setPosition({
            y: marker.getPosition().Ma,
            x: marker.getPosition().La,
          });
        });
        map.setCenter(coords);

        // 세종로 2511
        // La : 127.29100269804199
        // Ma : 36.61169462015369
        // console.log(coords);
      }
    };
    geocoder.addressSearch(location, callback);
    var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
  }, [search]);

  const sendInfo = (e) => {
    e.preventDefault();
    db.collection("food").add({
      name: name,
      type: foodtype,
      price: price,
      location: location,
      position: position,
      username: username,
      kakaoid: kakaoid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      hostid: myid,
    });
    console.log(name);
    console.log(foodtype);
    console.log(price);
    console.log(location);
    alert("전송완료");
    history.push("/list");
  };
  const [user_account, setUser_account] = useState({});
  useEffect(() => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function (res) {
        setKakaoid(res.id);
        setUsername(res.kakao_account.profile.nickname);
      },
    });
  }, []);

  const markertest = (e) => {
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var option = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(position.Ma, position.La), //지도의 중심좌표.
      level: 4, //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
    var coords = new kakao.maps.LatLng(position.Ma, position.La);
    var marker = new kakao.maps.Marker({
      map: map,
      position: coords,
    });
    marker.setDraggable(true);
    setPosition({ La: marker.getPosition().La, Ma: marker.getPosition().Ma });
    console.log(marker.getPosition());
  };

  return (
    <>
      <div className="upload_wrapper">
        <div className="upload_wrapper_item">
          <div id="map" className="upload_kakao_map"></div>
        </div>
        <div className="upload_wrapper_item">
          <br />
          <table>
            <tr>
              <td>
                <label>이름 </label>
              </td>
              <td>
                <input type="text" value={name} onChange={inputName} />
              </td>
            </tr>
            <tr className="upload_type">
              <td>
                <div>종류 </div>
              </td>
              <td>
                <input
                  type="radio"
                  value="한식"
                  name="foodtype"
                  onClick={() => setFoodtype("한식")}
                />
                한식
                <input
                  type="radio"
                  value="중식"
                  name="foodtype"
                  onClick={() => setFoodtype("중식")}
                />
                중식
                <input
                  type="radio"
                  value="일식"
                  name="foodtype"
                  onClick={() => setFoodtype("일식")}
                />
                일식
                <br />
                <input
                  type="radio"
                  value="치킨"
                  name="foodtype"
                  onClick={() => setFoodtype("치킨")}
                />
                치킨
                <input
                  type="radio"
                  value="피자"
                  name="foodtype"
                  onClick={() => setFoodtype("피자")}
                />
                피자
                <br />
                <input
                  type="radio"
                  value="패스트푸드"
                  name="foodtype"
                  onClick={() => setFoodtype("패스트푸드")}
                />
                패스트푸드
                <input
                  type="radio"
                  value="분식"
                  name="foodtype"
                  onClick={() => setFoodtype("분식")}
                />
                분식
              </td>
            </tr>
            <tr>
              <td>
                <label>가격</label>
              </td>
              <td>
                <input type="text" value={price} onChange={inputPrice} />
              </td>
            </tr>
            <tr>
              <td>
                <label>위치 </label>
              </td>
              <td>
                <input type="text" value={location} onChange={inputLocation} />
              </td>
              <td>
                <Button
                  variant="contained"
                  style={{ margin: "0 2px 2px 20px" }}
                  onClick={() => setSearch(search + 1)}
                >
                  검색
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <label>세부위치 </label>
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <br />
            <tr>
              <td></td>
              <td>
                <Button
                  variant="contained"
                  style={{ margin: "0 2px 2px 20px" }}
                  onClick={sendInfo}
                >
                  전송
                </Button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      &nbsp;마커를 움직여서 세부위치를 설정하세요
      <br />
      <br />
    </>
  );
}

export default UploadPage;
