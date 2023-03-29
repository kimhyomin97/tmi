import { useEffect, useState } from "react";
import db from "../../../firebase";
import firebase from "../../../firebase";
import chat_icon from "./public/chat_icon.png";
import "./public/ChatList.css";
import Map from "../MapPage/Map";

function ChatList() {
  const [myid, setMyid] = useState();
  useEffect(() => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function (res) {
        setMyid(String(res.id));
      },
    });
  }, []);
  const [chatlist, setChatlist] = useState([]);
  const [nicknamelist, setNicknamelist] = useState([]);
  const [hostlist, setHostlist] = useState([]);
  const [guestlist, setGuestlist] = useState([]);

  const fetchMsg = () => {
    // 사용자 리스트를 중복제거한 뒤 chatlist배열에 추가한다
    hostlist.map((item) => {
      if (!chatlist.includes(String(item))) {
        setChatlist((chatlist) => [...chatlist, String(item)]);
      }
    });
    guestlist.map((item) => {
      if (!chatlist.includes(String(item))) {
        setChatlist((chatlist) => [...chatlist, String(item)]);
      }
    });
  };
  useEffect(() => {
    // 메시지를 주고받은 사용자의 리스트를 받아온다
    db.collection("messages")
      .where("sender", "==", String(myid))
      .onSnapshot((res) => {
        res.docs.map((item) => {
          setHostlist((hostlist) => [
            ...hostlist,
            String(item.data().receiver),
          ]);
        });
      });
    db.collection("messages")
      .where("receiver", "==", String(myid))
      .onSnapshot((res) => {
        res.docs.map((item) => {
          setGuestlist((guestlist) => [
            ...guestlist,
            String(item.data().sender),
          ]);
        });
      });
  }, [myid]);

  useEffect(() => {
    // chatlist에 kakao uid에 매칭되는 nickname을 가져온다
    var len = chatlist.length - 1;
    db.collection("login")
      .where("kakaoid", "==", String(chatlist[len]))
      .onSnapshot((res) => {
        res.docs.map((item) => {
          setNicknamelist((nicknamelist) => [...nicknamelist, item.data()]);
        });
      });
  }, [chatlist]);

  // const {kakao} = window;
  // useEffect(() => {
  //     var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  //     var option = { //지도를 생성할 때 필요한 기본 옵션
  //         center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //         level: 3 //지도의 레벨(확대, 축소 정도)
  //     };
  //     // option.center = new kakao.maps.LatLng(37.5663795479871, 127.045325760782); // 성동구 마장동으로 위치 변경
  //     var map = new kakao.maps.Map(container, option); //지도 생성 및 객체 리턴

  //     // var geocoder = new kakao.maps.services.Geocoder();

  //     // var callback = function(result, status){
  //     //     if(status === kakao.maps.services.Status.OK){
  //     //         // console.log(result);
  //     //     }
  //     // };

  //     // geocoder.addressSearch('성동구 마장동', callback);
  //     // 성동구 마장동
  //     // x: "127.045325760782"
  //     // y: "37.5663795479871"
  // }, [])

  return (
    <>
      {/* <div>map test</div>
        <Map
            // style={{width:"1200px", height:"800px"}}
            center={{MA:33.450701, LA:126.570667}} // 지도 중앙위치 설정
            map={window}
        >
        </Map> */}
      {fetchMsg()}
      <br />
      {nicknamelist.length != 0 ? (
        nicknamelist.map((item) => {
          return (
            <>
              <a
                className="chat_wrapper"
                href={`/chat/${myid}+${item.kakaoid}`}
              >
                <img className="chat_icon" src={chat_icon} />
                <div className="chat_text">{item.nickname}</div>
              </a>
              <hr />
            </>
          );
        })
      ) : (
        <>
          <div>there is no chatlist</div>
        </>
      )}
    </>
  );
}

export default ChatList;
