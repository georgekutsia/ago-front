import React, { useState } from 'react';
import {MapContainer, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Markers from './Marker';

const MapView = () => {
    const [latitude,  setLatitude] = useState("" || 43.2627);
    const [lenght,  setLenght] = useState("" || -2.9253);

    return <div>
        <MapContainer center = {{ lat: latitude, lng: lenght }} zoom ={13}>
                <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         <Markers setLatitude={latitude} setLenght={lenght} />
</MapContainer>
    </div>
}

export default MapView