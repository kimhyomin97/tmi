import {forwardRef, useEffect, useState } from "react";
import db from "../../firebase";
import firebase from 'firebase';
import { FormControl, Button, Input, InputLabel, Card, CardContent, Typography} from '@material-ui/core';


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
            // .where('hostid', '==', hostid)
            .where('hostid', 'in', [hostid, myid])
            .get()
            .then((querySnapshot) => {
                // console.log(querySnapshot);
                // querySnapshot.forEach((doc) => {
                //     console.log(doc.id, " => ", doc.data());
                // });
                setMessages(querySnapshot.docs.map(doc => ({id: doc.data().myid, message: doc.data().message })))
            })
            .catch((error) =>{
                console.log("Error getting documents: ", error);
            });
        }
    }, [myid]);
    // hostid에 맞게 채팅 검색해서 갖고오는거 완료
    // ui에 맞게 채팅 띄워주는거 구현하면 된다
    // async, await 비동기 방법 생각해보면 좋을듯

// console.log(props.match.params.hostid);
// 1954835786 : 메인아이디

// 1956417402 : lgs 테스트 아이디

// 1956411418 : 대학아이디

    // const Message = forwardRef(({ message, username }, ref) => {
    //     const isUser = username === message.username;

    //     return (
    //         // <div ref={ref} className={`message ${isUser && 'msg_user'}`}>
    //         <div ref={ref} className="TEST">
    //             <Card className = {isUser ? "msg_user_card" : "msg_guest_card"}>
    //                 <CardContent>
    //                     <Typography color="white" variant="h5" component="h2" >
    //                         {!isUser && `${message.username || 'Unknown User'}: `} {message.message}
    //                     </Typography>
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     )
    // })
    // 메세지 전송
    const [input, setInput] = useState("");
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('messages').add({
            id: hostid+myid,
            message: input,
            hostid: hostid,
            myid: myid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        // 메세지 화면에 세팅
        setMessages([...messages, {id: myid, message: input}]);
        setInput("");
    }
    
    const Message = forwardRef(({username, message }, ref) => {
        // const isUser = username === message.username;
        const isUser = username === hostid;

        return (
            // <div ref={ref} className={`message ${isUser && 'msg_user'}`}>
            <div ref={ref} className="TEST">
                <Card className = {"msg_user_card"}>
                    <CardContent>
                        <Typography color="white" variant="h5" component="h2" >
                            {!isUser && `${message.username || '작성자'}: `} {message}
                            {/* {message.message} */}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    })

    // 채팅이 실시간 적용이 안된다...
    return(
        <>
        {myid}
        <br/>
        {hostid}
        <br/>
        
        <form className="app_from">
            <FormControl>
                <InputLabel> 메세지를 입력하세요.</InputLabel>
                <Input value={input} onChange={e => {setInput(e.target.value)}} />
                <Button disabled = {!input} variant="contained" color="primary" type="submit" onClick={sendMessage} >
                    전송
                </Button>
            </FormControl>
        </form>
        <ul>
            {
                messages.map(({id, message}) => (
                    <Message key={id} username={myid} message={message} />
                ))
            }
        </ul>
        {/* 두개의 id값으로 채팅 주고받으면 된다 */}
        <div>test</div>
        <div>hi</div>
        </>
    )
}

export default ChatPage;