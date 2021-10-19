import { Modal, Box } from '@mui/material';
import "./public/LoginPage.css";
import Login from "./Login";
import axios from 'axios';
import { useEffect } from 'react';
import { render } from '@testing-library/react';

const { kakao } = window;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const move_login = () => {
    // console.log("HELLO");
    console.log(kakao.inInitialized());
    // <Login></Login>
    kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/'
    });
    if(!kakao.Auth.getAccessToken()){
        console.log("Not logged in.");
        return;
    }
    kakao.Auth.logout(function() {
        console.log(kakao.auth.getAccessToken());
    })
    // try {
    //     return new Promise((resolve, reject) => {
    //         if (!kakao) {
    //         reject('인스턴스 없음');
    //         }
    //         kakao.Auth.login({
    //         success: res => {
    //             localStorage.setItem('token', res.token);
    //             this.setState({
    //             isLogin: true,
    //             });
    //             this.props.history.push('/signup');
    //         },
    //         fail: err => {
    //             console.error(err);
    //         },
    //         });
    //     });
    //     } catch (err) {
    //     console.error(err);
    // }
}

function LoginPage({history}){
    useEffect(() => {
        // window.Kakao.init("%REACT_APP_KAKAOMAP_API%");
        // kakao.inInitialized();

        // kakao sdk import
        const kakao_script = document.createElement("script");
        kakao_script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        document.head.appendChild(kakao_script);

        // kakao sdk script load complete
        kakao_script.onload = () => {
            window.Kakao.init(process.env.REACT_APP_KAKAOMAP_API);
            window.Kakao.Auth.createLoginButton({
                container: "#kakao_login_bt",
                success: (auth) => {
                    alert('로그인 성공');
                    history.push("/list");
                    kakao.API.request({
                        url: "/",
                        fail: (err) => {
                            console.log(err);
                        },
                    });
                },
                fail: (err) => {
                    console.log(err);
                },
            });
        };
    }, []);

    return(
        <>
        {/* <button type="button" id="kakao_login_bt">버튼</button> */}
        <Modal
            open={true}
        >
            <Box sx={style}>
                {/* <div className="modal_bt" onClick={move_login}>로그인</div> */}
                <div className="kakao_login_bt_wrap">
                    <button type="button" id="kakao_login_bt"></button>
                </div>
            </Box>
        </Modal>
        </>
    )
    // 이부분 카카오 로그인 하는법부터 하면 된다
    // 
}
export default LoginPage;