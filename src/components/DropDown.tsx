import { useState, useEffect, useRef } from "react";
import { PushButtons } from "./PushButtons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { GitHub, Person, Star, Twitter } from "@mui/icons-material";
import DarkModeButton from "./DarkModeButton";
import { Button } from "./Button";
import axios from "axios";

function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [themeText, setThemeText] = useState(
    localStorage.getItem("theme") === "dark" ? "Dark" : "Light"
  );
  const [stars, setStars] = useState<number | null>(null);

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
    const fetchStars = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/sreyas-cheviri/consciousapp"
        );
        setStars(response.data.stargazers_count);
      } catch (error) {
        console.error("Error fetching stars:", error);
        setStars(null);
      }
    };

    fetchStars();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
      setThemeText(
        localStorage.getItem("theme") === "dark" ? "Dark Mode" : "Light Mode"
      );
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={dropdownRef} className="relative ">
      <PushButtons
        variant="opaque2"
        icon={<MoreVertIcon style={{ fontSize: "16px" }} />}
        size="md"
        onClick={toggleDropDown}
      />

      <div
        className={`absolute md:bottom-auto bottom-10 md:top-12 md:right-0 right-4 md:mt-2 w-40 
     flex flex-col items-start  
     
    transition-all duration-200 transform top-14
    ${
      isOpen
        ? "opacity-100  translate-y-0 visible"
        : " opacity-0 -translate-y-2 invisible"
    }`}
      >
        <ul className="w-full flex    rounded-lg shadow-lg  flex-col bg-zinc-700 items-start  dark:bg-white dark:text-black text-zinc-200 ">
          <li className="px-1 py-1 border-b-[.01rem]  border-zinc-500 dark:border-zinc-400 w-full">
            <Button
              variant="drop"
              startIcon={<Person style={{ fontSize: "medium" }} />}
              size="sm"
            >
              <p className="font-normal">
                {localStorage.getItem("username") ?? "You need to Login / SignUp"}
              </p>
            </Button>
          </li>

          <li
            onClick={toggleDropDown}
            className="px-1 py-1  dark:border-zinc-400 w-full cursor-pointer"
          >
            <a
              href="https://github.com/sreyas-cheviri/superconscious"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-start gap-2 text-nowrap"
            >
              <Button
                variant="drop"
                endIcon={
                  <Star style={{ color: "#e3b341", fontSize: "medium" }} />
                }
                startIcon={<GitHub style={{ fontSize: "medium" }} />}
                size="sm"
                onClick={() => {
                  toggleDropDown();
                }}
              >
                {`GitHub ${stars !== null ? stars : "0"}`}
              </Button>
            </a>
          </li>
          <li
            onClick={toggleDropDown}
            className="px-1 py-1  dark:border-zinc-400 w-full cursor-pointer"
          >
            <a
              href="https://x.com/sreyascheviri"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-start gap-2 text-nowrap"
            >
              <Button
                variant="drop" size={"sm"} 
                startIcon={<Twitter style={{ fontSize: "medium" }} />}              
              >
                    X
              </Button>
            </a>
          </li>

          <li className=" dark:border-zinc-400 px-1 py-1 w-full">
            <DarkModeButton themeText={themeText} />
          </li>

          <li className="px-1 py-1 w-full">
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
