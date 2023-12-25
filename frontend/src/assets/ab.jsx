import * as React from 'react';
import {useEffect,useState} from 'react';
import Map,{Marker,Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./app.css"
import { format } from 'timeago.js';
import axios from "axios"

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setp] = useState(null);
  const [ newPlace, setNewPlace] = useState(null)
  
  
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/pins");
        console.log(res)
        setPins(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id)=>{
    console.log(id)
    setp(id)
   console.log(currentPlaceId)
  }
  
  const handleAddPlaceClick = (e)=>{
  
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    
    setNewPlace({lat,lng})
    console.log(newPlace);
  }
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiNXQ2ZHJ5cnQiLCJhIjoiY2xxOTc0MHZkMTA0dzJ2czk4cmV4bGx2bSJ9.WC90Zo_1k5psQbusbjUB7Q"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      onDblClick={handleAddPlaceClick}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/5t6dryrt/clqabrwu7007e01pj7fk64ziv"
    >
    {pins.length > 0 ? (
        pins.map((p, index) => (
          <div key={index}>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
              <LocationOnIcon 
              onClick={()=>handleMarkerClick(p._id)} 
              style={{ fontSize: window.visualViewport.zoom * 5, color: 'red' }} />
            </Marker>
            <Popup longitude={p.long} latitude={p.lat}
            anchor="bottom"
            
            >
            <div className='card'>
           
              <label>place</label>
              <h4 className='Place'>{p.title}</h4>
              <label>review</label>
              <p className='desc'> {p.desc}</p>
              <label>rating</label>
              <div className='stars'>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              </div>
              <label>information</label>
              <span className='username'>Create by <b>{p.username}</b></span>
              <span className='date'> {format(p.createdAt)}</span>
            </div>
          </Popup>   
   
          </div>
        ))
      ) : (
        <p>Loading pins...</p>
      )}

   
          {newPlace &&(
            <Popup 
            longitude={newPlace.lng}
             latitude={newPlace.lat}
            anchor="bottom"
            
           >
           hello
          </Popup>
          )}
      
   
    

    
   
    </Map>
  );
}
export default App
