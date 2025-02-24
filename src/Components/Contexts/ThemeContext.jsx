import React, { createContext, useState, useContext } from "react";
import { theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light"); 

  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const currentAlgorithm = themeMode === "dark" ? darkAlgorithm : defaultAlgorithm;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, currentAlgorithm }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};