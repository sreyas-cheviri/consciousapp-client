import { useState, useEffect, useRef } from "react";
import { PushButtons } from "./PushButtons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { GitHub, Star } from "@mui/icons-material";
import DarkModeButton from "./DarkModeButton";

function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref to detect outside click
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

      {isOpen && (
        <div className="absolute md:bottom-auto bottom-10 md:top-12 md:right-0 right-4 md:mt-2 w-40 bg-zinc-700 flex justify-start items-center border-zinc-500 border dark:border-zinc-400 dark:bg-zinc-300 dark:text-black text-zinc-200 rounded shadow-md">
          <ul className="w-full">
            <li
              onClick={toggleDropDown}
              className="px-4 py-2 border-b-2 border-zinc-500 dark:border-zinc-400 flex gap-2 items-center cursor-pointer"
            >
              <a
                href="https://github.com/sreyas-cheviri/superconscious"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2"
              >
                <GitHub /> Github <Star style={{ color: "#e3b341",fontSize: "medium" }} />
              </a>
            </li>
            <li className="px-4 py-2 border-b-2 border-zinc-500 dark:border-zinc-400 flex gap-2 items-center ">
              <DarkModeButton  />{themeText}
            </li>
            <li className="px-4 py-2 flex gap-2 items-center ">
              <PushButtons
                variant="opaque2"
                icon={<LogoutIcon style={{ fontSize: "16px" }} />}
                size="sm"
                onClick={() => {
                  Logout();
                  toggleDropDown();
                }}
              />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDown;
