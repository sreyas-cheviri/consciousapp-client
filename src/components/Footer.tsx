import { PanelLeftOpen, ArrowUp } from "lucide-react";
import { PushButtons } from "./PushButtons";
import { LightMode } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
interface FooterProps {
  setpanel: (value: boolean) => void;
}

export const Footer = ({ setpanel }: FooterProps) => {
  return (
    <div className="flex    w-screen fixed md:m-2 -bottom-1 p-2   px-10 md:p-10  md:bg-transparent bg-zinc-800 text-zinc-900 md:z-0 z-40 justify-between  ">
      <div
        className="flex md:gap-4 gap-8 m-1 justify-between items-center
        "
      >
        <PushButtons
          variant="transparent"
          icon={<PanelLeftOpen />}
          size="sm"
          onClick={() => {
            setpanel(true);
          }}
        />
        <PushButtons
          variant="transparent"
          icon={<ArrowUp />}
          size="sm"
          onClick={handleScrollToTop}
        />
      </div>

      <div className="md:hidden  flex gap-5 bg-zinc-700 p-1  rounded-full">
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
  );
};
