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
    // const [chatlist, setChatlist] = useState();
    const [nicknamelist, setNicknamelist] = useState([]);
    const [hostlist, setHostlist] = useState([]);
    const [guestlist, setGuestlist] = useState([]);
    const [getmsg, setGetmsg] = useState(0);

    // const loadMessage = () => {
    //     db.collection('messages')
    //         .where('sender', '==', String(myid))
    //         .onSnapshot((res) => {
    //             res.docs.map(item => {
    //                 setChatlist(chatlist => [...chatlist, item.data().receiver]);
    //                 // setHostlist(hostlist => [...hostlist, String(item.data().receiver)]);
    //                 // tempHost.push(String(item.data().receiver));
    //             })
    //         })
    //     db.collection('messages')
    //         .where('receiver', '==', String(myid))
    //         .onSnapshot((res) => {
    //             res.docs.map(item => {
    //                 setChatlist(chatlist => [...chatlist, item.data().sender]);
    //                 // setGuestlist(guestlist => [...guestlist, String(item.data().sender)]);
    //                 tempGuest.push(String(item.data().sender));
    //             })
    //         })
    // }
    // function fetchMessage(){
    //     return new Promise(function(resolve, reject){
    //         resolve(loadMessage);
    //     })
    // }
    const fetchMsg = () => {
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
        // async function test(){
        //     var resulttest = await fetchMessage();
        //     // console.log(resulttest);
        // }
        // test();
        db.collection('messages')
            .where('sender', '==', String(myid))
            .onSnapshot((res) => {
                res.docs.map(item => {
                    // if(!chatlist.includes(item.data().receiver)) setChatlist(chatlist => [...chatlist, item.data().receiver]);
                    // setChatlist(chatlist => [...chatlist, item.data().receiver]);
                    setHostlist(hostlist => [...hostlist, String(item.data().receiver)]);
                })
            })
        db.collection('messages')
            .where('receiver', '==', String(myid))
            .onSnapshot((res) => {
                res.docs.map(item => {
                    // if(!chatlist.includes(item.data().sender)) setChatlist(chatlist => [...chatlist, item.data().sender]);
                    // setChatlist(item.data().sender);
                    // setChatlist(chatlist => [...chatlist, item.data().sender]);
                    setGuestlist(guestlist => [...guestlist, String(item.data().sender)]);
                })
            })
    }, [myid])

    useEffect(() => {
        var len = chatlist.length - 1;
        db.collection('login')
            .where('kakaoid', '==', String(chatlist[len]))
            .onSnapshot((res) => {
                // console.log(res);
                res.docs.map(item => {
                    // console.log(item.data());
                    setNicknamelist(nicknamelist => [...nicknamelist, item.data()]);
                })
                // console.log(res.docs[0]?.data());
                // setNicknamelist(nicknamelist => [...nicknamelist, res.docs[0]?.data()]);
                // setNicknamelist(nicknamelist => [...nicknamelist, {nickname: res.docs[0]?.data().nnickname, kakaoid: res.docs[0]?.data().kakaoid}]);
                // setNicknamelist(res.docs[0]?.data());
            })
    }, [chatlist])
    useEffect(() => {
        // var tempHost = [];
        // var tempGuest = [];
        // db.collection('messages')
        //     .where('sender', '==', String(myid))
        //     .onSnapshot((res) => {
        //         res.docs.map(item => {
        //             // setChatlist(chatlist => [...chatlist, item.data().receiver]);
        //             setHostlist(hostlist => [...hostlist, String(item.data().receiver)]);
        //             // tempHost.push(String(item.data().receiver));
        //         })
        //     })
        // db.collection('messages')
        //     .where('receiver', '==', String(myid))
        //     .onSnapshot((res) => {
        //         res.docs.map(item => {
        //             // setChatlist(chatlist => [...chatlist, item.data().sender]);
        //             setGuestlist(guestlist => [...guestlist, String(item.data().sender)]);
        //             // tempGuest.push(String(item.data().sender));
        //         })
        //     })
    }, [myid])

    // useEffect(() => {
    //     db.collection('login')
    //         .where('kakaoid', '==', String(myid))
    //         .onSnapshot((res) => {
    //             if(res.empty) console.log("EMPTY");
    //             // 이부분 로그인으로 옮긴 다음
    //             // 로그인했을 때 닉네임이 없으면 닉네임을 만들도록 프롬포트 띄우고
    //             // 닉네임이 있으면 그냥 로그인 시키는 로직을 만들어 준 뒤
    //             // 카카오아이디에 해당하는 닉네임을 채팅리스트에 출력한다음
    //             // 닉네임 누르면 해당 카카오아이디와 했던 채팅내역들을 출력해주도록 하자

    //             // 관건은 로그인 했을 때 닉넹님을 설정하도록 하는 창이 잘 떠야된다
    //         })
    // }, [myid])

    // chatlist를 중복제거한다
        // db의 login에서 chatlist에 해당하는 닉네임을 갖고온다
            // 닉네임을 화면에 뿌리고, 그걸 누르면 채팅페이지로 넘어가게 한다
                // 채팅페이지로 넘어가게 하는법 == chat/hostid+guestid 링크로 이동시킨다
                    // 즉, 내가 호스트인지, 게스트인지 구분을 해야된다...
                        // 화면을 이분할해서 왼쪽은 내가 게스트인 채팅방 오른쪽은 내가 호스트인 채팅방 이런식으로 나누자
                            // 내가 게스트인쪽은 내 id가 뒤에가면 되니깐...
    
    return(
        <>
        {fetchMsg()}
        <br/>
        {/* {chatlist.map(item =>{
            return(
                <div>{item}</div>
            )
        })} */}
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
                    // <div>{item.nickname}</div>
                )
            })
            :
            <>
            {console.log("HELLO")}
            <div>there is no chatlist</div>
            </>
        }
        </>
    )
}

export default ChatList;