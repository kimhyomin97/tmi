import Map from './Map';
// import MapMarker from './MapMarker';
import './public/MapPage.css';

function MapPage(){
    const temp = [1, 2, 3, 4, 5];
    return(
        <>
        <div className="mappage_wrap">
            <div>This is MapPage</div>
            <Map
                center={{
                    Ma: 33.450701,
                    La: 126.570667,
                }}
                style={{
                    width: "600px",
                    height: "400px",
                }}
                level={3}
            ></Map>
        {temp.map(item => {
            return(
                <div>{item}</div>
            )
        })}
        <div>temp</div>
        {/* <MapMarker></MapMarker> */}
        </div>
        </>
    )
}

export default MapPage;