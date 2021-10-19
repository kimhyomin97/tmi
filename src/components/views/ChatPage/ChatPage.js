import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';

function ChatPage(props){
    const [myid, setMyid] = useState();
    // const [myname, setMyname] = useState();
    const [hostid, setHostid] = useState();

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        window.Kakao.API.request({
            url: '/v2/user/me',
            // success: function({ kakao_account }){
            // // const { age_range, profile } = kakao_account;
            // setUser_account(kakao_account);
            // }
            success: function(res){
                // console.log(res);
                // console.log(res.id);
                // console.log(res.kakao_account.profile.nickname);
                // setKakaoid(res.id);
                // setUsername(res.kakao_account.profile.nickname);
                setMyid(res.id);
                // setMyname(res.kakao_account.profile.nickname);
            }
        })
        setHostid(props.match.params.hostid);
        const loadData = async () => {
            // setHostid(props.match.params.hostid); 
            
        }
        // db.collection('messages')
        // .orderBy('timestamp', 'desc')
        // .onSnapshot(data => {
        //     setMessages(data.docs.map(doc => ({id: doc.id, message: doc.data() })))
        //     console.log(data);
        // })
    }, []);
    useEffect(() => {
        if(hostid != undefined){
        db.collection('messages')
            .where('hostid', '==', hostid)
            .get()
            .then((querySnapshot) => {
                // console.log(querySnapshot);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch((error) =>{
                console.log("Error getting documents: ", error);
            });
        }
    }, [hostid]);
    // hostid에 맞게 채팅 검색해서 갖고오는거 완료
    // ui에 맞게 채팅 띄워주는거 구현하면 된다
    // async, await 비동기 방법 생각해보면 좋을듯

// console.log(props.match.params.hostid);
// 1954835786 
    return(
        <>
        {myid}
        <br/>
        {hostid}
        {/* 두개의 id값으로 채팅 주고받으면 된다 */}
        <div>test</div>
        <div>hi</div>
        </>
    )
}

export default ChatPage;