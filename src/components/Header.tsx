
import LogoutIcon from "@mui/icons-material/Logout";
import LinkIcon from "@mui/icons-material/Link";
import { Button } from "./Button";
import { PushButtons } from "./PushButtons";

import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeButton";

interface HeaderProps {
  setOpen: (open: boolean) => void;
}
export const Header =({ setOpen }: HeaderProps) =>{
  const navigate = useNavigate();
  function Logout(){
    localStorage.removeItem("token");
    navigate("/")

  }
    return(
<div className="flex flex-col shadow-black/70 dark:shadow-zinc-400/50 dark:bg-zinc-400  shadow-2xl md:flex-row md:w-full max-w-full min-w-full  items-center md:gap-3 gap-4  md:justify-between m-4 p-2 rounded-2xl  bg-zinc-600/1   ">
            <div className=" flex gap-4 items-center">
              <button>
                <img
                  src="../src/assets/logo.png"
                  alt=""
                  className="h-8 rounded-full   border-gray-500 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"

                />
              </button>
              {/* <span ><Button variant={"new"} children={"Beta"} size={"vsm"} ></Button></span> */}
              <h1 className="shadow-none  text-2xl text-zinc-500 font-serif  dark:text-zinc-800 hover:text-zinc-500/90 transition-all duration-300">
              Welcome, {localStorage.getItem("username")}

              </h1>
            </div>

            <div className=" flex md:flex-row flex-col gap-1 md:gap-2 p-1 px-1  w-fit rounded-lg  ">
              <div className="flex gap-2">

              <Button
                variant="secondary"
                children="Share Brain"
                size="md"
                startIcon={<LinkIcon style={{ fontSize: 20 }} />}
                />
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                variant="secondary"
                children="Add Memory"
                size="md"
                startIcon={<AddIcon style={{ fontSize: 20 }} />}
                />
                </div>
              <div className="md:flex gap-1 items-center justify-center  hidden">
                {/* <PushButtons
                  variant="opaque2"
                  icon={<LightMode style={{ fontSize: "16px" }} />}
                  size="md"
                /> */}
                   <DarkModeToggle/>
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
}