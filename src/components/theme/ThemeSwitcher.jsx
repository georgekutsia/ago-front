import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme } = useTheme();

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    changeTheme(newTheme);
  };

  return (
    <div>
      <label htmlFor="themeSelect">Select Theme: </label>
      <select
        id="themeSelect"
        value={currentTheme}
        onChange={handleThemeChange}
      >
        <option value="lara-dark-indigo">Lara Dark Indigo</option>
        <option value="bootstrap4-light-blue">Bootstrap Light Blue</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
