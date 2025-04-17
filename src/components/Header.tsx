import LinkIcon from "@mui/icons-material/Link";
import { Button } from "./Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import DropDown from "./DropDown";
import { PushButtons } from "./PushButtons";
import { PanelLeftOpen } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const FE_URL = import.meta.env.VITE_FE_URL;

interface HeaderProps {
  setOpen: (open: boolean) => void;
  setCOpen: (open: boolean) => void;
  setShareURL: (url: string) => void;
  setpanel: (url: boolean) => void;
  isSharedView?: boolean;
}

export const Header = ({ setOpen, setCOpen, setShareURL, setpanel, isSharedView = false }: HeaderProps) => {
  return (
    <>
      <div className="fixed left-2 md:left-4 bottom-8 z-40">
        <PushButtons 
          variant="transparent" 
          icon={<PanelLeftOpen className="w-5 h-5"/>} 
          onClick={() => setpanel(true)} 
          size="sm"
        />
      </div>

      <header className="sticky top-0 w-full bg-zinc-900 z-50 dark:bg-zinc-300 backdrop-blur-md shadow-2xl shadow-black/50 dark:shadow-zinc-400/50 rounded-b-2xl ">
        <div className="flex  flex-col md:flex-row gap-3 items-center justify-between px-4 py-3">
          <div className="flex  items-center gap-2">
            <button onClick={() => window.location.reload()}>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-6 w-6 rounded-full border-gray-500 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
              />
            </button>
            <h1 className="text-xl text-zinc-200 font-recoleta dark:text-zinc-800 transition-all duration-300">
              Conscious
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {!isSharedView && (
              <>
                <Button
                  onClick={async () => {
                    setCOpen(true);
                    const result = await axios.post(
                      `${API_URL}/api/v1/share`,
                      { share: true },
                      {
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      }
                    );
                    setShareURL(`${FE_URL}share/${result.data.hash}`);
                  }}
                  variant="secondary"
                  size="md"
                  startIcon={<LinkIcon style={{ fontSize: 20 }} />}
                >
                  Share
                </Button>
                
                <Button
                  onClick={() => setOpen(true)}
                  variant="secondary"
                  size="md"
                  startIcon={<AddIcon style={{ fontSize: 20 }} />}
                >
                  Add Memory
                </Button>
                <DropDown />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
