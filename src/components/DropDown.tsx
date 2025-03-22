import { useState, useEffect, useRef } from "react";
import { PushButtons } from "./PushButtons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { GitHub, Star } from "@mui/icons-material";
import DarkModeButton from "./DarkModeButton";
import { Button } from "./Button";

function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [themeText, setThemeText] = useState(localStorage.getItem("theme") === "dark" ? "Dark" : "Light");

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 100);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeText(localStorage.getItem("theme") === "dark" ? "Dark" : "Light");
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <PushButtons
        variant="opaque2"
        icon={<MoreVertIcon style={{ fontSize: "16px" }} />}
        size="md"
        onClick={toggleDropDown}
      />

      
      <div
        className={`absolute md:bottom-auto bottom-10 md:top-12 md:right-0 right-4 md:mt-2 w-40 
          bg-zinc-700 flex justify-start items-center border-zinc-500 border 
          dark:border-zinc-400 dark:bg-zinc-300 dark:text-black text-zinc-200 
          rounded shadow-md transition-all duration-300 transform 
          ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
      >
        <ul className="w-full">
          <li
            onClick={toggleDropDown}
            className="px-1 py-1 border-b-2 border-zinc-500 dark:border-zinc-400 flex gap-2 items-center cursor-pointer"
          >
            <a
              href="https://github.com/sreyas-cheviri/superconscious"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2"
            >
              <Button
                variant="drop"
                endIcon={<Star style={{ color: "#e3b341", fontSize: "medium" }} />}
                startIcon={<GitHub style={{ fontSize: "medium" }} />}
                size="sm"
                onClick={() => {
                  Logout();
                  toggleDropDown();
                }}
              >
                Github
              </Button>
            </a>
          </li>
          <li className="border-b-2 border-zinc-500 dark:border-zinc-400 px-1 py-1 flex gap-2 items-center">
            <DarkModeButton themeText={themeText} />
          </li>
          <li className="px-1 py-1 flex gap-2 items-center">
            <Button
              variant="drop"
              startIcon={<LogoutIcon style={{ fontSize: "16px" }} />}
              size="sm"
              onClick={() => {
                Logout();
                toggleDropDown();
              }}
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DropDown;
