import React, { useState } from "react";
import Routers from "./Routers";

import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { NavbarComponent } from "./components";
import FooterComponent from "./components/footer/FooterComponent";
import { LoggedContext } from "./shared/contexts/JwtContext";

function App() {
  const [userData,  setUserData] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [jwtData,  setJwtData] = useState(localStorage.getItem("token") || false)

  return (
    <LoggedContext.Provider value={{userData, setUserData, jwtData, setJwtData}}>
    <div className="App">
        <NavbarComponent />
        <Routers />
        <FooterComponent/>
    </div>
    </LoggedContext.Provider>
  );
}

export default App;
