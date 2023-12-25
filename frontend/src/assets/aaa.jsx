import * as React from 'react';
import {useEffect,useState} from 'react';
import Map,{Marker,FullscreenControl,Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./app.css"
import axios from "axios"

function App() {
  const [pins, setPins] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  
  
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiNXQ2ZHJ5cnQiLCJhIjoiY2xxOTc0MHZkMTA0dzJ2czk4cmV4bGx2bSJ9.WC90Zo_1k5psQbusbjUB7Q"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/5t6dryrt/clqabrwu7007e01pj7fk64ziv"
      
    >

    <FullscreenControl />
    {pins.map((p, index) => (
  <Marker key={index} longitude={p.long} latitude={p.lat} anchor="bottom">
    <LocationOnIcon
      style={{ fontSize: window.visualViewport.zoom * 5, color: 'red' }}
      onClick={() => setShowPopup(true)}
    />
  </Marker>
))}
    <Marker longitude={-100} latitude={40} anchor="bottom" >
      <LocationOnIcon style={{fontSize: visualViewport.zoom*5 ,color:"red"}}/>
    </Marker>
    {showPopup && (
      <Popup longitude={-100} latitude={40}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        <div className='card'>
          <label>place</label>
          <h4 className='Place'>thao</h4>
          <label>review</label>
          <p className='desc'> dog eat</p>
          <label>rating</label>
          <div className='stars'>
          <StarRateIcon className='star'/>
          <StarRateIcon className='star'/>
          <StarRateIcon className='star'/>
          <StarRateIcon className='star'/>
          <StarRateIcon className='star'/>
          </div>
          <label>information</label>
          <span className='username'>Create by <b>skdsad</b></span>
          <span className='date'> hour ago</span>
        </div>
      </Popup>)}
    </Map>
  );
}
export default App
