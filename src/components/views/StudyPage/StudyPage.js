import { useState } from 'react';
import './public/StudyPage.css';

function StudyPage(){
    const [text, setText] = useState("nope");

    const onChange = (e) => {
        setText(e.target.value);
    }

    return(
        <>
        <div>Study Page</div>
        <input onChange={onChange} value={text}></input>
        <div>
            <b>값 : {text}</b>
        </div>

        </>
    )
}
export default StudyPage;