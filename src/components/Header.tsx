import LogoutIcon from "@mui/icons-material/Logout";
import LinkIcon from "@mui/icons-material/Link";
import { Button } from "./Button";
import { PushButtons } from "./PushButtons";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeButton";
import axios from "axios";
import logo from "../assets/logo.png"

const API_URL = import.meta.env.VITE_API_URL;
const FE_URL = import.meta.env.VITE_FE_URL;

interface HeaderProps {
  setOpen: (open: boolean) => void;
  setCOpen: (open: boolean) => void;
  setShareURL: (url: string) => void;
}

export const Header = ({ setOpen, setCOpen, setShareURL }: HeaderProps) => {
  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setTimeout(() => {
      navigate("/Signup");
    }, 100);
  }

  return (
    <div className="flex flex-col shadow-black/50 bg-zinc-900/70 dark:shadow-zinc-400/50 dark:bg-zinc-400 shadow-2xl md:flex-row md:w-full max-w-full min-w-full items-center md:gap-3 gap-4 md:justify-between m-4 p-2 rounded-2xl bg-zinc-600/1">
      <div className="flex gap-2 px-3 items-center">
        <button>
          <img
            src={logo}
            alt=""
            className="h-8 rounded-full border-gray-500 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
          />
        </button>
        <h1 className="shadow-none text-2xl text-zinc-500 font-serif dark:text-zinc-800 hover:text-zinc-500/90 transition-all duration-300">
          Conscious  {localStorage.getItem("username")}
        </h1>
      </div>

      <div className="flex md:flex-row flex-col gap-1 md:gap-2 p-1 px-1 w-fit rounded-lg">
        <div className="flex gap-2">
          <Button
            onClick={async () => {
              setCOpen(true);
              const result = await axios.post(
                `${API_URL}/api/v1/brain/share`,
                { share: true }, 
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const ShareURL = `${FE_URL}api/v1/brain/${result.data.hash}`;
              setShareURL(ShareURL); 
            }}
            variant="secondary"
            children="Share Brain"
            size="md"
            startIcon={<LinkIcon style={{ fontSize: 20 }} />}
          />
          <Button
            onClick={() => setOpen(true)}
            variant="secondary"
            children="Add Memory"
            size="md"
            startIcon={<AddIcon style={{ fontSize: 20 }} />}
          />
        </div>

        <div className="md:flex gap-1 items-center justify-center hidden">
          <DarkModeToggle />
          <PushButtons
            variant="opaque2"
            icon={<LogoutIcon style={{ fontSize: "16px" }} />}
            size="md"
            onClick={Logout}
          />
        </div>
      </div>
    </div>
  );
};
