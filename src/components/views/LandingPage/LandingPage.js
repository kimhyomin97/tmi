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
                <div calssName="slide_content">slide1</div>
                <div calssName="slide_content">slide2</div>
                <div calssName="slide_content">slide3</div>
                <div calssName="slide_content">slide4</div>
            </div>
        </div>
        </>
    )
}
export default LandingPage;