import { PanelLeftOpen, ArrowUp } from "lucide-react";
import { PushButtons } from "./PushButtons";
// import DropDown from "./DropDown";
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
    <footer className="fixed bottom-0 left-0  z-0 right-0 flex justify-center w-full">
      <div className="container mx-auto px-4 sm:px-6 md:px-0">
        <div className="flex dark:bg-zinc-200 md:dark:bg-transparent rounded-t-2xl 
          w-full md:m-2 p-2 md:p-10 md:bg-transparent bg-zinc-800 text-zinc-900">
          <div className="flex justify-between w-full md:px-0 p-1 md:justify-start md:gap-4">
            <PushButtons
              variant="opaque2"
              icon={<PanelLeftOpen style={{ padding: "3px" }} />}
              size="sm"
              onClick={() => {
                setpanel(true);
              }}
            />
            <PushButtons
              variant="opaque2"
              icon={<ArrowUp style={{ padding: "3px" }} />}
              size="sm"
              onClick={handleScrollToTop}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
