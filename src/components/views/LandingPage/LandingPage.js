import { useEffect, useState } from 'react';
import './public/LandingPage.css';
import Slide from '../../function/Slide';
import {한식, 중식, 일식, 피자} from './public/image_export';
import LoginPage from '../LoginPage/LoginPage.js';

function LandingPage(){
    const imglist = ['한식', '중식', '일식', '피자'];
    // const imglist = ['피자', '피자', '피자', '피자'];
    const all = ele => document.querySelectorAll(ele);
    const one = ele => document.querySelector(ele);
    const [userAccount, setUserAccount] = useState(null);
    useEffect(() => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: function({ kakao_account }){
            // const { age_range, profile } = kakao_account;
            setUserAccount(kakao_account);
          }
        })
    // }, [login]);
    }, []);

    const [loginModal, setLoginModal] = useState(false);
    const [login, setLogin] = useState(false);
    // const slide = () =>{
    //     const wrap = one('.slide_wrap');
    //     const target = wrap.children[0];
    //     const len = target.children.length;
    //     target.style.cssText = `width:calc(100% * ${len});display:flex;transition:1s`;
        
    //     Array.from(target.children) 
    //     .forEach(ele => ele.style.cssText = `width:calc(100% / ${len});`)
    //     let pos = 0;
    //     setInterval(() => {
    //         pos = (pos + 1) % len;
    //         target.style.marginLeft = `${-pos * 100}%`;
    //     }, 5000)
    // }

    // window.onload = function() {slide()};

    // return(
    //     <>
    //     <div className="landingpage_wrap">
    //         <a href="/homepage">MOVE</a><br/>
    //         <Slide/>
            // <div className="slide_wrap">
            //     <ul className="slide_box">
            //         <li className="slide_content">slide1</li>
            //         <li className="slide_content">slide2</li>
            //         <li className="slide_content">slide3</li>
            //         <li className="slide_content">slide4</li>
            //     </ul>
            //     {/* <div calssName="slide_content">slide1</div>
            //     <div calssName="slide_content">slide2</div>
            //     <div calssName="slide_content">slide3</div>
            //     <div calssName="slide_content">slide4</div> */}
            // </div>
    //     </div>
    //     </>
    // )
    // 그리드를 나누고 각 구역에 음식 사진을 배치한 뒤
    // 그 위에 글귀를 적는다
    // join-delivery
    // 최소주문금액, 배달팁 ... 나누면 어쩌고...
    // 맛도 나누고  배달팁도 나누고
    // 그 밑에 네모버튼 = 음식목록 보러가기
    // 내 주소 설정하는 창 있으면 좋을듯
    return(
        <>
        {/* <div className="slide_wrap">
            <ul className="slide_box">
                <img src={require("./public/"+imglist[0]+".png").default} className="slide_content"/>
                <img src={require("./public/"+imglist[1]+".png").default} className="slide_content"/>
                <img src={require("./public/"+imglist[2]+".png").default} className="slide_content"/>
                <img src={require("./public/"+imglist[3]+".png").default} className="slide_content"/>
            </ul>
        </div> */}
        <div className="landingpage_wraaper">
            <div className="landingpage_item_wrapper">
                <div className="img_contaier">
                    <img src={require("./public/"+imglist[0]+".png").default} className="img_item"/>
                    <img src={require("./public/"+imglist[1]+".png").default} className="img_item"/>
                    <img src={require("./public/"+imglist[2]+".png").default} className="img_item"/>
                    <img src={require("./public/"+imglist[3]+".png").default} className="img_item"/>
                </div>
                <div className="msg_box">
                    {
                        !localStorage.Kakao_token ?
                        <>
                        {/* <div className="login_box">로그인</div><br/> */}
                        <a onClick={() => setLoginModal(true)}>
                            <div className="msg_box_content login_box">로그인</div>
                        </a>
                        </>
                        :
                        <>
                        {
                        !userAccount ?
                            <a onClick={() => setLoginModal(true)}>
                                <div className="msg_box_content login_box">로그인</div>
                            </a>
                            :
                            <a href="/list">
                                <div className="msg_box_content">Join</div>
                            </a>
                        }
                        </>
                    }
                    {loginModal ?
                        <LoginPage
                            login={login}
                            setLogin={setLogin}
                        ></LoginPage>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
        </>
    )
}
export default LandingPage;