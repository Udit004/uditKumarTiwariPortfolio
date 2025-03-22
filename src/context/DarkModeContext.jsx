import React, { createContext, useState, useEffect } from "react";

// Create Dark Mode Context
export const DarkModeContext = createContext();

// Provider Component
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    console.log("Dark mode state initialized:", localStorage.getItem("theme") === "dark");
    return localStorage.getItem("theme") === "dark"; // Corrected return statement
  });

  useEffect(() => {
    if (darkMode) {
      console.log("Dark mode enabled");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      console.log("Current document classes:", document.documentElement.classList);
      console.log("Dark mode disabled");


      console.log("Dark mode disabled");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// export default DarkModeTest;
