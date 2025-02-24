import React, { createContext, useState, useContext, useEffect } from "react";
import { theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light"; 
  });

  const toggleTheme = () => {
    setThemeMode((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); 
      return newTheme;
    });
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