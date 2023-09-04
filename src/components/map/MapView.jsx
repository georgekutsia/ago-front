import React, { useContext, useState } from 'react';
import {MapContainer, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Markers from './Marker';
import { LoggedContext } from '../../shared/contexts/JwtContext';

const MapView = () => {
  const { userData, setUserData, currentLocation } = useContext(LoggedContext);
  const [latitude,  setLatitude] = useState(currentLocation?.latitude || 43.2627);
  const [length,  setLenght] = useState(currentLocation?.longitude || -2.9253);

    return <div>
        <MapContainer center = {{ lat: latitude, lng: length }} zoom ={13}>
                <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         <Markers latitude={latitude} length={length} />
</MapContainer>
    </div>
}

export default MapView