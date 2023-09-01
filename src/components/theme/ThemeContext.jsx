// ThemeContext.js
import React, { createContext, useContext, useState } from "react";
import PrimeReact from "primereact/api";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("lara-dark-indigo");

  const changeTheme = (newTheme) => {
    PrimeReact.changeTheme(currentTheme, newTheme, "theme-link", () => {
      setCurrentTheme(newTheme);
    });
  };

  const contextValue = {
    currentTheme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
