import React from "react";
import { Marker } from "react-leaflet";
import {VenueLocationIcon} from "./icon/VenueLocation"

const Markers = () => {
    
    return (
        <Marker position ={{lat:"43.263816",lng: "-2.938928"}} icon={VenueLocationIcon}/>
    )
    
}

export default Markers