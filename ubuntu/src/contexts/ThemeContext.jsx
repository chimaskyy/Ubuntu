import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("adminDarkMode");
      return saved === "true";
    } catch (error) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("adminDarkMode", isDarkMode);

      // Only apply dark mode class to admin-specific container
      const adminContainer = document.getElementById("admin-container");
      if (adminContainer) {
        if (isDarkMode) {
          adminContainer.classList.add("dark");
        } else {
          adminContainer.classList.remove("dark");
        }
      }
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
