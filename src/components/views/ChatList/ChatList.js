import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';
import chat_icon from './public/chat_icon.png';
import './public/ChatList.css';

function ChatList(){
    const [myid, setMyid] = useState();

    useEffect(() => {
        window.Kakao.API.request({
            url: '/v2/user/me',
            success: function(res){
                setMyid(String(res.id));
            }
        })
    }, []);
    const [chatlist, setChatlist] = useState([]);
    const [nicknamelist, setNicknamelist] = useState([]);
    const [hostlist, setHostlist] = useState([]);
    const [guestlist, setGuestlist] = useState([]);
    
    const fetchMsg = () => {
        // 사용자 리스트를 중복제거한 뒤 chatlist배열에 추가한다
        hostlist.map(item => {
            if(!chatlist.includes(String(item))){
                setChatlist(chatlist => [...chatlist, String(item)]);
            }
        })
        guestlist.map(item => {
            if(!chatlist.includes(String(item))){
                setChatlist(chatlist => [...chatlist, String(item)]);
            }  
        })
    }
    useEffect(() => {
        // 메시지를 주고받은 사용자의 리스트를 받아온다
        db.collection('messages')
            .where('sender', '==', String(myid))
            .onSnapshot((res) => {
                res.docs.map(item => {
                    setHostlist(hostlist => [...hostlist, String(item.data().receiver)]);
                })
            })
        db.collection('messages')
            .where('receiver', '==', String(myid))
            .onSnapshot((res) => {
                res.docs.map(item => {
                    setGuestlist(guestlist => [...guestlist, String(item.data().sender)]);
                })
            })
    }, [myid])

    useEffect(() => {
        // chatlist에 kakao uid에 매칭되는 nickname을 가져온다
        var len = chatlist.length - 1;
        db.collection('login')
            .where('kakaoid', '==', String(chatlist[len]))
            .onSnapshot((res) => {
                res.docs.map(item => {
                    setNicknamelist(nicknamelist => [...nicknamelist, item.data()]);
                })
            })
    }, [chatlist])
    
    return(
        <>
        {fetchMsg()}
        <br/>
        {nicknamelist.length != 0 ?
            nicknamelist.map(item => {
                return(
                    <>
                    <a className ="chat_wrapper" href={`/chat/${myid}+${item.kakaoid}`}>
                        <img className="chat_icon" src={chat_icon}/>
                        <div className="chat_text">{item.nickname}</div>
                    </a>
                    <hr/>
                    </>
                )
            })
            :
            <>
            <div>there is no chatlist</div>
            </>
        }
        </>
    )
}

export default ChatList;