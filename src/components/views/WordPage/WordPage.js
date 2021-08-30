import axios from "axios";
import { useEffect, useState } from "react"
import './public/WordPage.css';
import WordQuiz from "./WordQuiz";

function WordPage(){
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState([]);
    const openModal = () => {
        setShowModal(!showModal);
    }
    useEffect(() => {
        axios.get('https://infuser.odcloud.kr/oas/docs?namespace=15053640/v1')
        .then(res => {
            console.log(res.data);
        })
    })
    useEffect(() => {
        axios.get('http://localhost:5000/api/word')
        .then(res => {
            console.log(res);
            setText(res.data.body);
            // setText(res);
        })
    }, [])
    
    return(
        <>
        <body>
            {showModal ?
                <>
                <div className="modal_bg">
                    <div className="modal_wrap">
                        modal_open
                    <div className="modal_close_wrap" onClick={() => {openModal()}}>
                        <span className="modal_close_icon"></span>
                        <span className="modal_close_icon"></span>
                        {/* close */}
                    </div>
                    <div>단어 내용</div>
                    <WordQuiz></WordQuiz>
                    </div>
                </div>
                </>
                :
                <div className="modal_close">
                </div>
            }
            <div onClick={()=>{openModal()}}>단어 공부하기1</div>
            <a onClick={()=>{openModal()}}>단어 공부하기2</a><br/>
            <button className = "word_button" onClick={()=>{openModal()}}>단어 공부하기3</button>
            <div>{text}</div>
            <div>temp</div><br/>
            <div>temp</div><br/>
            <div>temp</div><br/>
            <div>temp</div><br/>
            <div>temp</div><br/>
            <div>temp</div><br/>
            <div>temp</div><br/>
            <div>temp</div><br/>
            <div>temp</div><br/>
            <div>temp</div><br/>
            <div>temp</div>
            <div>temp</div>
            <div>temp</div>
            <div>temp</div>
            <div>temp</div>
            <div>temp</div>
            <div>temp</div>
            <div>temp</div>
            <div>temp</div>
            <div>temp</div>
            <div>temp</div>
        </body>
        </>
    )
};
export default WordPage;