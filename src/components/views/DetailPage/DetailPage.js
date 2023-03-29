import { useEffect, useState } from "react";
import db from "../../../firebase";
import firebase from "../../../firebase";
// import ChatPage from "../ChatPage/ChatPage";
import "./public/DetailPage.css";
import { Typography, Button } from "@material-ui/core";

const { kakao } = window;

function DetailPage(props) {
  const [myid, setMyid] = useState();
  useEffect(() => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function (res) {
        setMyid(res.id);
      },
    });
  }, []);
  const [food, setFood] = useState();
  useEffect(() => {
    db.collection("food")
      .orderBy("name", "desc")
      .onSnapshot((data) => {
        data.docs.map((item) => {
          if (item.id == props.match.params.foodid) {
            setFood({ id: item.id, data: item.data() });
          }
        });
      });
  }, []);
  const [user_account, setUser_account] = useState(null);
  useEffect(() => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function ({ kakao_account }) {
        setUser_account(kakao_account);
      },
    });
  }, []);
  useEffect(() => {
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var option = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 4, //지도의 레벨(확대, 축소 정도)
    };
    // option.center = new kakao.maps.LatLng(food?.data.position.y, food?.data.position.x); // 성동구 마장동으로 위치 변경
    var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴
    var geocoder = new kakao.maps.services.Geocoder();
    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var move_location = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(move_location);
        var markerPosition = new kakao.maps.LatLng(
          food?.data.position.y,
          food?.data.position.x
        );
        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      }
    };
    geocoder.addressSearch(food?.data.location, callback);
    // 성동구 마장동
    // x: "127.045325760782"
    // y: "37.5663795479871"
  }, [food]);

  const delete_item = () => {
    db.collection("food")
      .doc(props.match.params.foodid)
      .delete()
      .then(() => {
        alert("삭제 완료");
        props.history.push("/list");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const idinfo = food?.data.kakaoid + "+" + myid;
  return (
    <>
      <div className="detail_wrapper">
        <div className="detail_wrapper_item">
          <div id="map" className="detail_kakao_map"></div>
        </div>
        <div className="detail_wrapper_item">
          <Typography
            variant="h3"
            component="h2"
            style={{ marginLeft: "10px" }}
          >
            {food?.data.name}
          </Typography>
          <div className="detail_wrapper_table">
            <table>
              <tr>
                <td>종류 </td>
                <td>{food?.data.type}</td>
              </tr>
              <tr>
                <td>가격 </td>
                <td>{food?.data.price} 원</td>
              </tr>
              <tr>
                <td>위치 </td>
                <td>{food?.data.location}</td>
              </tr>
            </table>
          </div>
          {user_account ? (
            <a href={`/chat/${idinfo}`}>
              <Button variant="contained" style={{ margin: "0 2px 2px 20px" }}>
                채팅하기
              </Button>
            </a>
          ) : (
            <></>
          )}
          {myid == food?.data?.hostid ? (
            <div>
              <Button
                variant="contained"
                style={{ margin: "10px 2px 2px 20px" }}
                onClick={delete_item}
              >
                삭제하기
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailPage;
