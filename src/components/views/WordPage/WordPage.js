import { useState } from "react"
import './public/WordPage.css';

function WordPage(){
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(!showModal);
    }
    
    return(
        <>
        <body>
            {showModal ?
                <>
                <div className="modal_bg">
                    <div className="modal_wrap">
                        modal_open
                    <div onClick={() => {openModal()}}>close</div>
                    </div>
                </div>
                </>
                :
                <div className="modal_close">modal_close</div>
            }
            <div onClick={()=>{openModal()}}>단어 공부하기1</div>
            <a onClick={()=>{openModal()}}>단어 공부하기2</a><br/>
            <button className = "word_button" onClick={()=>{openModal()}}>단어 공부하기3</button>
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