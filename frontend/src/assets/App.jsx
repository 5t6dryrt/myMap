import * as React from 'react';
import {useEffect,useState} from 'react';


import Map,{Marker,Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./app.css"
import { format } from 'timeago.js';
import axios from "axios"
import ControlPanel from './components/control-panel';
import GeocoderControl from './components/geocoder-conrol';


function App() {
 
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setp] = useState(null);
  const [ newPlace, setNewPlace] = useState(null)
  const [ title, setTitle] = useState(null)
  const [ desc, setDesc] = useState(null)
  const [ rating, setRating] = useState(null)
  
  
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
  
  const handleSubmit = async (e) =>{
    console.log(title)
    console.log(desc);
    e.preventDefault();
      const newPin = {
      username:"test",
      title:title,
      desc:desc,
      rating:rating,
      lat:newPlace.lat,
      long:newPlace.lng
    }
    try{
      console.log(newPin);
      const res  = await axios.post("http://localhost:3000/api/pins",newPin)
      setPins([...pins,res.data])
      setNewPlace(null)
    }catch(err){
      console.log(err);
    }
  }
  return (
    <Map
      mapboxAccessToken=progress.env.REACT_MAPBOX_TOKEN
      initialViewState={{
        longitude: 100.5018,
        latitude: 13.7563,
        zoom: 14
      }}
      onDblClick={handleAddPlaceClick}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/5t6dryrt/clqabrwu7007e01pj7fk64ziv"
    >
    <GeocoderControl mapboxAccessToken={progress.env.REACT_MAPBOX_TOKEN} position="top-left" />
    {pins.length > 0 ? (
        pins.map((p, index) => (
          <div key={index}>
            <Marker longitude={p.long} latitude={p.lat} 
            
            anchor="bottom"> 
              <LocationOnIcon 
              onMouseEnter={() => handleMarkerClick(p._id) }
              onMouseLeave={() => handleMarkerClick(null)}
              style={{ fontSize: window.visualViewport.zoom * 5, color: 'red' }} />
              
            </Marker>
            {currentPlaceId == p._id && (
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
              {Array(p.rating).fill(<StarRateIcon className='star'/>)}
              
              </div>
              <label>information</label>
              <span className='username'>Create by <b>{p.username}</b></span>
              <span className='date'> {format(p.createdAt)}</span>
            </div>
          </Popup> 
            )}
              
   
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
           onClose={() =>setNewPlace(null)}
           >
           
           <form onSubmit={handleSubmit}>
            <label>place</label>
              <input
                    placeholder="Enter a title" onChange={(e)=> setTitle(e.target.value)}/>
              <label>review</label>
              <textarea
                    placeholder="Say us something about this place."
                    onChange={(e)=> setDesc(e.target.value)}></textarea>
                    
              <label>rating</label>
              <select onChange={(e)=> setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
              <button className='submitButton'name='submit' type='submit'>Add Pin</button>
              
            
           </form>
          </Popup>
          )}
      
   
    

    
        <ControlPanel/>
    </Map>
  );
}
export default App
