import { PanelLeftOpen, ArrowUp } from "lucide-react";
import { PushButtons } from "./PushButtons";
import DropDown from "./DropDown";
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
    <footer className="flex dark:bg-zinc-200 md:dark:bg-transparent  z-0 w-screen fixed md:m-2 bottom-0 p-2   px-10 md:p-10   md:bg-transparent bg-zinc-800 text-zinc-900  justify-between  ">
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

      <div className="md:hidden  z-[9999]  flex gap-5 bg-zinc-700 dark:bg-zinc-400 p-1  m rounded-full">
       <DropDown/>
           
          
           
      </div>
    </footer>
  );
};
