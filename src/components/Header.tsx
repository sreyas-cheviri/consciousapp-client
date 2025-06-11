import LinkIcon from "@mui/icons-material/Link";
import { Button } from "./Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import DropDown from "./DropDown";
import { PushButtons } from "./PushButtons";
import { PanelLeftOpen } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { setModalOpen, setShareModalOpen, setPanelOpen, setShareUrl } from "../store/features/uiSlice";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const FE_URL = import.meta.env.VITE_FE_URL;

interface HeaderProps {
  isSharedView?: boolean;
}

export const Header = ({ isSharedView = false }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleShare = async () => {
    dispatch(setShareModalOpen(true));
    const result = await axios.post(
      `${API_URL}/api/v1/share`,
      { share: true },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    dispatch(setShareUrl(`${FE_URL}share/${result.data.hash}`));
  };
  const gotohome = ()=>{

    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 100);
  }

  return (
    <>
      <div className="fixed left-2 md:left-4 bottom-8 z-40">
      {!isSharedView && (
        <PushButtons 
          variant="transparent" 
          icon={<PanelLeftOpen className="w-5 h-5"/>} 
          onClick={() => dispatch(setPanelOpen(true))} 
          size="sm"
        /> )}
      </div>

      <header className="sticky top-0 w-full bg-zinc-900 z-40 dark:bg-zinc-300 backdrop-blur-md shadow-2xl shadow-black/50 dark:shadow-zinc-400/50 rounded-b-2xl ">
        <div className="flex  flex-col md:flex-row gap-3 items-center justify-between px-4 py-3">
          <div className="flex items-start gap-2 ">
            <button onClick={() => gotohome()}>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-6 w-6 rounded-full active:p-0.5 border-gray-500 transition-all duration-500 ease-in-out hover:rotate-[360deg]"
              />
            </button>
            <h1 className="text-xl text-zinc-100  font-recoleta dark:text-zinc-900 transition-all duration-300">
              Conscious
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {!isSharedView && (
              <>
                <Button
                  onClick={handleShare}
                  variant="secondary"
                  size="md"
                  startIcon={<LinkIcon style={{ fontSize: 20 }} 
                  className="-rotate-45 "/>}
                >
                  
                </Button>
                
                <Button
                  onClick={() => dispatch(setModalOpen(true))}
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
