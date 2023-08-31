import React from "react";
import Routers from "./Routers";

import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { NavbarComponent } from "./components";
import FooterComponent from "./components/footer/FooterComponent";

function App() {
  return (
    <div className="App">
        <NavbarComponent />
        <Routers />
        <FooterComponent/>
    </div>
  );
}

export default App;
