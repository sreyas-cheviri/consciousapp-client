
import LinkIcon from "@mui/icons-material/Link";
import { Button } from "./Button";
// import { PushButtons } from "./PushButtons";
import AddIcon from "@mui/icons-material/Add";
// import { useNavigate } from "react-router-dom";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DarkModeToggle from "./DarkModeButton";
import axios from "axios";
import logo from "../assets/logo.png"
import DropDown from "./DropDown";

const API_URL = import.meta.env.VITE_API_URL;
const FE_URL = import.meta.env.VITE_FE_URL;

interface HeaderProps {
  setOpen: (open: boolean) => void;
  setCOpen: (open: boolean) => void;
  setShareURL: (url: string) => void;
}

export const Header = ({ setOpen, setCOpen, setShareURL }: HeaderProps) => {
  

  return (
    <header className="sticky top-0 flex flex-col shadow-black/50 bg-zinc-900 dark:shadow-zinc-400/50 dark:bg-zinc-300 backdrop-blur-md shadow-2xl md:flex-row md:w-full max-w-full min-w-full items-center md:gap-3 gap-4 md:justify-between  p-3 rounded-b-2xl z-50">

      <div className="flex gap-2 px-3 items-center">
        <button>
          <img
          onClick={() => window.location.reload()}
            src={logo}
            alt=""
            className="h-6 rounded-full border-gray-500 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
          />
        </button>
        <h1 className="shadow-none text-xl text-zinc-200 font-normal dark:text-zinc-800 transition-all duration-300">
          Conscious  
          {/* {localStorage.getItem("username")} */}
        </h1>
      </div>

      <div className="flex items-center flex-row gap-2  md:gap-2 p-1 px-1 w-fit rounded-lg">
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
              const ShareURL = `${FE_URL}share/${result.data.hash}`;
              setShareURL(ShareURL); 
            }}
            variant="secondary"
            children="Share "
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

        <div className="md:flex gap-1 items-center justify-center ">
    
          <DropDown />
        </div>
      </div>
    </header>
  );
};
