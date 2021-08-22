import './public/LandingPage.css';

function LandingPage(){
    


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