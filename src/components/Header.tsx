
import LogoutIcon from "@mui/icons-material/Logout";
import LinkIcon from "@mui/icons-material/Link";
import { Button } from "./Button";
import { PushButtons } from "./PushButtons";
import { DarkMode, Light, LightMode } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
interface HeaderProps {
  setOpen: (open: boolean) => void;
}

export const Header =({ setOpen }: HeaderProps) =>{
    return(
<div className="flex flex-col shadow-black/70 shadow-2xl md:flex-row md:w-full  items-center md:gap-3 gap-4  md:justify-between m-4 p-2 rounded-2xl  bg-zinc-600/1   ">
            <div className=" flex gap-4 items-center">
              <button>
                <img
                  src="../src/assets/logo.png"
                  alt=""
                  className="h-8 rounded-full  hover:-rotate-180 transform  ease-in-out  transition-all duration-300 "
                />
              </button>
              <h1 className="shadow-none  text-2xl text-zinc-500 font-serif  hover:text-zinc-500/90 transition-all duration-300">
                Welcome, Sreyas
              </h1>
            </div>

            <div className=" flex gap-1 md:gap-2 p-1 px-2  w-fit rounded-lg  ">
              <Button
                variant="secondary"
                text="Share Brain"
                size="md"
                startIcon={<LinkIcon style={{ fontSize: 20 }} />}
              />
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                variant="secondary"
                text="Add Memory"
                size="md"
                startIcon={<AddIcon style={{ fontSize: 20 }} />}
              />
              <div className="flex gap-2 items-center justify-center">
                <PushButtons
                  variant="opaque2"
                  icon={<LightMode style={{ fontSize: "16px" }} />}
                  size="md"
                />
                <PushButtons
                  variant="opaque2"
                  icon={<LogoutIcon style={{ fontSize: "16px" }} />}
                  size="md"
                />
              </div>
            </div>
          </div>
    );
}