import React from 'react';
import {MapContainer} from "react-leaflet"
import "leaflet/dist/leaflet.css"

const MapView = () => {
    return <MapContainer center = {{ lat: 43.2627, lng: -2.9253 }} zoom ={13}>

    </MapContainer>
}

export default MapView