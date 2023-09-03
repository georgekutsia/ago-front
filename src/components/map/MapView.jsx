import React from 'react';
import {MapContainer, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Markers from './Marker';

const MapView = () => {

    return <div>
        <MapContainer center = {{ lat: 43.2627, lng: -2.9253 }} zoom ={13}>
                <TileLayer     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         <Markers/>
</MapContainer>
    </div>
}

export default MapView