import React from "react";
import Routers from "./Routers";
import NavbarComponent from "./components/navbar/NavbarComponent";

export const GlobalContext = React.createContext();


function App() {
  return (
    <div className="App">
      <GlobalContext.Provider>
      <NavbarComponent/>
        <Routers />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
