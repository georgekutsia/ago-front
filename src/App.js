import React, { useEffect, useState } from "react";
import Routers from "./Routers";

import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { NavbarComponent } from "./components";
import FooterComponent from "./components/footer/FooterComponent";
import { LoggedContext } from "./shared/contexts/JwtContext";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [jwtData, setJwtData] = useState(
    localStorage.getItem("token") || false
  );
  const [currentLocation, setCurrentLocation] = useState({});
  const [hidden, setHidden] = useState(false);
  const [colorChange, setColorChange] = useState(true);

  useEffect(() => {
    // getLocation();
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrentLocation(location.data);
  };

  return (
    <LoggedContext.Provider
      value={{ userData, setUserData, jwtData, setJwtData, setHidden, currentLocation, setCurrentLocation, getLocation,colorChange, setColorChange}}>
      <div className="App">
         <NavbarComponent></NavbarComponent>
        <Routers />
        {hidden && <FooterComponent></FooterComponent>}
      </div>
    </LoggedContext.Provider>
  );
}

export default App;
