import { useEffect, useState } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";
import { PushButtons } from "./PushButtons";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <PushButtons
      variant="opaque2"
      icon={
        darkMode ? (
          <DarkMode  style={{ fontSize: "16px" }} />
        ) : (
          <LightMode style={{ fontSize: "16px" }} />
        )
      }
      size="md"
      onClick={() => setDarkMode(!darkMode)}
    />
  );
};

export default DarkModeToggle;
