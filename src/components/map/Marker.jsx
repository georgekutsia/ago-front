import React from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./icon/VenueLocation";

const Markers = ({ latitude, length }) => {
  return <Marker position={{ lat: latitude, lng: length }} icon={VenueLocationIcon} />;
};

export default Markers;
