import { useEffect, useState } from 'react';
// import socketio from 'socket.io-client';
import db from "../../firebase";
import firebase from 'firebase';
import { FormControl, Button, Input, InputLabel} from '@material-ui/core';
import { TextRotationDownSharp } from '@material-ui/icons';
import ChatModal from './ChatModal';

// const socket = socketio("localhost:5000");

function ChatPage() {
    // const [currestSocket, setCurrentSocket] = useState();

    // useEffect(() => {
    //     setCurrentSocket(socketio("localhost:5000"));
    // }, []);
    // const [username, setUsername] = useState("");
    // useEffect(() => {
    //     setUsername(prompt('이름을 넣으세요'))
    // }, [])

    // // firebase에서 데이터 조회하기
    // const[messages, setMessages] = useState([]);
    // useEffect(() => {
    //     db.collection('messages')
    //     .orderBy('timestamp', 'desc')
    //     .onSnapshot(data => {
    //         setMessages(data.docs.map(doc => ({id: doc.id, message: doc.data() })))
    //     })
    // }, [])

    // // 메세지 전송
    // const [input, setInput] = useState("");
    // const sendMessage = (e) => {
    //     e.preventDefault();
    //     db.collection('messages').add({
    //         message: input,
    //         username: username,
    //         timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //     })
    //     // 메세지 화면에 세팅
    //     setMessages([...messages, {username: username, message: input}]);
    //     setInput("");
    // }

    // db test
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        db.collection('todos')
        .orderBy('timestamp', 'desc')
        .onSnapshot(data => {
            setTodos(data.docs.map(doc => ({id:doc.id, todo:doc.data().todo})))
        })
    }, [input])
    const addTodo = (e) => {
        e.preventDefault();
        db.collection('todos').add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setTodos([...todos, input]);
        setInput('');
    }

    return (
        // <ChatInput socket = {currestSocket} />
        <>
        {/* <div>this is chat page</div>
        <div className="App">
            <h2>환영합니다. {username}</h2>
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
                    messages.map(message => (
                        <ChatModal message={message}/>
                    ))
                }
            </ul>
        </div> */}
        <div>
            <h1>Hello World</h1>
            <form>
                <FormControl>
                    <InputLabel>Write a Todo</InputLabel>
                    <Input value={input} onChange={e => setInput(e.target.value)} />
                </FormControl>
                <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={addTodo}>Add Todo</Button>
            </form>
            <ul>
                {todos.map(todo => (
                    <ChatModal todo={todo} />
                ))}
            </ul>
        </div>
        </>
    )
};

export default ChatPage;