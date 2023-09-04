import L from "leaflet";
import iconSvg from "./icon.svg"

export const VenueLocationIcon = L.icon({
  iconUrl: iconSvg,
  iconRetinaUrl: iconSvg,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-icon",
});
