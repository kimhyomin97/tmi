import { Modal, Box } from '@mui/material';
import "./public/LoginPage.css";
// import axios from 'axios';
import { useEffect, useState } from 'react';
// import { CssBaseline } from '@material-ui/core';
import db from "../../firebase";
import firebase from '../../firebase';

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

function LoginPage(props, {history}){
    const [modalOpen, setModalOpen] = useState(true);
    const handleClose = () => setModalOpen(false);
    useEffect(() => {
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
                    // history.push("/list");
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
    
    const login_bt = () => {
        window.Kakao.Auth.login({
            success: res => {
                localStorage.setItem("Kakao_token", res.access_token);
                
                if(res.access_token){
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        success: function(res){
                            var nickname;
                            var kakaoid = String(res.id);
                            db.collection('login')
                                .where('kakaoid', '==', String(res.id))
                                .onSnapshot((res) => {
                                    if(res.empty) {
                                        nickname = prompt("닉네임을 입력하세요");
                                        db.collection('login').add({
                                            kakaoid: kakaoid,
                                            nickname: nickname==null ? "이름없음" : nickname
                                        })
                                    }
                                })
                        }
                    })
                    alert("로그인 성공");
                    props.setLogin(true);
                    // history.push("/");
                    window.location.replace("/");
                }
            },
            fail: err =>{
                console.error(err);
            },
        });
    }
    return(
        <>
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <Box sx={style}>
                <div className="kakao_login_bt_wrap">
                    <button type="button" id="kakao_login_bt" onClick={login_bt}></button>
                </div>
            </Box>
        </Modal>
        </>
    )
}
export default LoginPage;