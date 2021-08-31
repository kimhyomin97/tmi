import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import './public/StudyPage.css';

function StudyPage(){
    const [text, setText] = useState("nope");

    const onChange = (e) => {
        setText(e.target.value);
    }

    const [message, setMessage] = useState("");

    function callback(str){
        setText(str);
    }

    useEffect(() => {
        fetch('/home')
            .then(response => response.text())
            .then(message => {
                setMessage(message);
            });
    }, [])

    return(
        <>
        <div>Study Page</div>
        <input onChange={onChange} value={text}></input>
        <div>
            <b>값 : {text}</b>
        </div>
        <div>
            from spring : {message}
        </div>
        </>
    )
}
export default StudyPage;