import { useState } from 'react';
import './public/StudyPage.css';

function StudyPage(){
    const [text, setText] = useState("nope");
    return(
        <>
        <div>Study Page</div>
        <input type="text"></input>

        </>
    )
}
export default StudyPage;