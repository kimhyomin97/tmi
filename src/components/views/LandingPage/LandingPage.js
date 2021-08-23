import { useEffect } from 'react';
import './public/LandingPage.css';
import Slide from '../../function/Slide';

function LandingPage(){
    // const all = ele => document.querySelectorAll(ele);
    // const one = ele => document.querySelector(ele);

    // const slide = () =>{
    //     const wrap = one('.slide_wrap');
    //     const target = wrap.children[0];
    //     const len = target.children.length;
    //     target.style.cssText = `width:calc(100% * ${len});display:flex;transition:1s`;
        
    //     Array.from(target.children)
    //     .forEach(ele => ele.style.cssText = `width:calc(100% / ${len});`)
    //     let pos = 0;
    //     setInterval(() => {
    //         pos = (pos + 1) % len;
    //         target.style.marginLeft = `${-pos * 100}%`;
    //     }, 1500)
    // }

    // window.onload = function() {slide()};

    return(
        <>
        <div className="landingpage_wrap">
            <a href="/homepage">MOVE</a><br/>
            {/* This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/>
            This is Lading Page <br/> */}
            <Slide/>
            <div className="slide_wrap">
                <ul className="slide_box">
                    <li className="slide_content">slide1</li>
                    <li className="slide_content">slide2</li>
                    <li className="slide_content">slide3</li>
                    <li className="slide_content">slide4</li>
                </ul>
                {/* <div calssName="slide_content">slide1</div>
                <div calssName="slide_content">slide2</div>
                <div calssName="slide_content">slide3</div>
                <div calssName="slide_content">slide4</div> */}
            </div>
        </div>
        </>
    )
}
export default LandingPage;