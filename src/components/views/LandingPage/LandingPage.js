import React, { useEffect, useState, useContext, createContext } from "react";
import "./public/LandingPage.css";
// import Slide from '../../function/Slide';
import { 한식, 중식, 일식, 피자 } from "./public/image_export";
import LoginPage from "../LoginPage/LoginPage.js";
import db from "../../firebase";
import firebase from "../../firebase";
import { TestContext } from "../../../store/Context.js";

function LandingPage() {
  const imglist = ["한식", "중식", "일식", "피자"];
  const all = (ele) => document.querySelectorAll(ele);
  const one = (ele) => document.querySelector(ele);
  const [userAccount, setUserAccount] = useState(null);
  const [kakaoid, setKakaoid] = useState(null);
  useEffect(() => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function (res) {
        setKakaoid(res.id);
      },
    });
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function ({ kakao_account }) {
        setUserAccount(kakao_account);
      },
    });
  }, []);

  const [loginModal, setLoginModal] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    // if(kakaoid != null){
    //     db.collection('login')
    //         .where('kakaoid', '==', String(kakaoid))
    //         .onSnapshot((res) => {
    //             console.log(res.empty)
    //             if(res.empty) {
    //                 nickname_check2(true);
    //             }
    //         })
    // }
  }, [kakaoid]);
  const nickname_check2 = (flag) => {
    var nickname;
    if (flag) {
      nickname = prompt("닉네임을 입력하세요");
      db.collection("login").add({
        kakaoid: String(kakaoid),
        nickname: nickname == null ? "noname" : nickname,
      });
      alert("닉네임 설정 완료");
    }
  };

  // const context = useContext(TestContext);
  // const { temp, setTestValue } = useContext(TestContext);
  // console.log(temp);

  // context value를 다른 컴포넌트에서 확인하고, 수정하는 과정이 필요하다
  const MyContext = createContext();
  const [contextValue, setContextValue] = useContext(MyContext);
  // 이부분 []를 사용하면 에러, {}를 사용해야 에러가 나오지 않는다
  // 하지만 {}를 사용하게 되면 undefined가 나옴
  // context API 사용법 검색 필요
  return (
    <>
      <div className="landingpage_wraaper">
        <div className="landingpage_item_wrapper">
          <div className="img_contaier">
            <img
              src={require("./public/" + imglist[0] + ".png")}
              className="img_item"
              alt="음식이미지"
            />
            <img
              src={require("./public/" + imglist[1] + ".png")}
              className="img_item"
            />
            <img
              src={require("./public/" + imglist[2] + ".png")}
              className="img_item"
            />
            <img
              src={require("./public/" + imglist[3] + ".png")}
              className="img_item"
            />
          </div>
          <div className="msg_box">
            {!localStorage.Kakao_token ? (
              <>
                <a onClick={() => setLoginModal(true)}>
                  <div className="msg_box_content login_box">로그인</div>
                </a>
              </>
            ) : (
              <>
                {!userAccount ? (
                  <a onClick={() => setLoginModal(true)}>
                    <div className="msg_box_content login_box">로그인</div>
                  </a>
                ) : (
                  <>
                    <a href="/list">
                      <div className="msg_box_content">Join</div>
                    </a>
                  </>
                )}
              </>
            )}
            {loginModal ? (
              <LoginPage login={login} setLogin={setLogin}></LoginPage>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default LandingPage;
