import React, { useState } from "react";
import { Marker } from "react-leaflet";
import {VenueLocationIcon} from "./icon/VenueLocation"

const Markers = () => {
    const [latitude,  setLatitude] = useState("" || 43.2627);
    const [lenght,  setLenght] = useState("" || -2.9253);
    
    return (
        <Marker position ={{lat: latitude,lng: lenght}} icon={VenueLocationIcon}/>
    )
    
}

export default Markers