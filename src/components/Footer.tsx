import { PanelLeftOpen, ArrowUp } from "lucide-react";
import { PushButtons } from "./PushButtons";
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
    return(
        <div className="flex w-screen fixed m-10 md:p-10 p-10 px-4  text-zinc-900 z-40 justify-between -bottom-10 ">
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
    )
}