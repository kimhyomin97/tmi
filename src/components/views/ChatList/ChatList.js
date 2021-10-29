import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';

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

    useEffect(() => {
        db.collection('messages')
            .where('sender', '==', String(myid))
            .onSnapshot((res) => {
                res.docs.map(item => {
                    // setChatlist(chatlist => [...chatlist, item.data().receiver]);
                    setHostlist(hostlist => [...hostlist, String(item.data().receiver)]);
                })
            })
        db.collection('messages')
            .where('receiver', '==', String(myid))
            .onSnapshot((res) => {
                res.docs.map(item => {
                    // setChatlist(chatlist => [...chatlist, item.data().sender]);
                    setGuestlist(guestlist => [...guestlist, String(item.data().sender)]);
                })
            })
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

    useEffect(() => {
        if(chatlist.length == 0){
            // guestlist가 변경될때 마다 아래 코드들이 실행되면
            // chatlist가 6번 (여러번) 호출되어서
            // 중복되는 닉네임이 6번 (여러번) 들어가기 때문에 조건문을 생성함
            // 정확히는 위에있는 useEffect가 끝나고 동기적으로 실행되도록 바꿔야 된다
            var temparr = [];
            hostlist.map(item => {
                if(!temparr.includes(item)) temparr.push(item);
            })
            guestlist.map(item => {
                if(!temparr.includes(item)) temparr.push(item);
            })
            setChatlist(temparr);
        }
    }, [guestlist])
    useEffect(() => {
        chatlist.map((item) => {
            db.collection('login')
                .where('kakaoid', '==', String(item))
                .onSnapshot((res) => {
                    var temparr = nicknamelist;
                    // 이부분 nicknamelist에 lgs김효민이 5번 중복되서 들어간다
                    // 이부분을 고쳐야 된다
                    // 원인이 뭘까?
                    console.log(res);
                    if(nicknamelist.includes({nickname: "lgs김효민"})) console.log("ERROR");
                    if(!nicknamelist.includes({nickname: res.docs[0].data().nickname, kakaoid: res.docs[0].data().kakaoid})){
                        // console.log("HELLO");
                        setNicknamelist(nicknamelist => [...nicknamelist, {nickname: res.docs[0].data().nickname, kakaoid: res.docs[0].data().kakaoid}])
                    } 
                })  
        })
    }, [chatlist])

    return(
        <>
        채팅리스트
        {/* {chatlist.map(item =>{
            return(
                <div>{item}</div>
            )
        })} */}
        {nicknamelist.map(item => {
            return(
                <a href={`/chat/${myid}+${item.kakaoid}`}><div>{item.nickname}</div></a>
            )
        })}
        {/* {nicknamelist.nickname} */}
        </>
    )

}

export default ChatList;