import { useEffect, useState } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Button } from "./Button";

// Define the props type
interface DarkModeToggleProps {
  themeText: string;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ themeText }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

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
    <Button
      variant="drop"
      startIcon={darkMode ? (
        <DarkMode style={{ fontSize: "16px" }} />
      ) : (
        <LightMode style={{ fontSize: "16px" }} />
      )}
      size="sm"
      onClick={() => setDarkMode(!darkMode)}
    >
      {themeText} {/* Correct way to use the prop */}
    </Button>
  );
};

export default DarkModeToggle;
