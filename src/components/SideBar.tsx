import { Add } from "@mui/icons-material";
import { Button } from "./Button";
import { PushButtons } from "./PushButtons";
import {  PanelRightOpen } from "lucide-react";


interface SideBarProps {
  openpanel: boolean;
  closepanel: () => void;
}

export const Sidebar = ({ openpanel, closepanel }: SideBarProps) => {
  return (
    <div>
      <div
        className={`fixed inset-0 bg-black/80  z-50 transition-opacity duration-300  ${
          openpanel
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closepanel}
      ></div>

      {/* // this syntaax is bad cause the side bar is always present in the DOM and it is just hidden and shown when needed. */}
      {/* better to   uses {open && <div>...</div>} for cleaner conditional rendering.
✔ Modal disappears from the DOM when open is false → No extra CSS tricks needed.
✔ Still closes when clicking outside or pressing the close button.
The issue with  this approach is that when isOpen is false, the element is completely removed from the DOM, making transitions impossible. */}

      <div
        className={`fixed left-0 top-0 h-screen bg-zinc-900 dark:bg-zinc-300 border-r border-gray-300/20 z-50 flex flex-col w-64 md:w-1/4 lg:w-1/6 transition-transform duration-300 ${
          openpanel ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center p-4 space-y-3">
          <Button
            variant="secondary"
            startIcon={<Add />}
            size="lg"
            children={"Create New Brain"}
          />

          <div className="w-full bg-zinc-600 p-3 text-white rounded-md">
            <p>Brain 1</p>
          </div>
          <div className="w-full bg-zinc-600 p-3 text-white rounded-md">
            <p>Brain 2</p>
          </div>

          <p className="text-sm text-white italic bg-red-900 rounded p-2 text-center">
            This feature is still in progress.
          </p>
        </div>

        <div className="absolute bottom-8 right-3 text-white">
          <PushButtons 
                   variant="transparent" 
                   icon={<PanelRightOpen className="w-5 h-5"/>} 
                   onClick={closepanel} 
                   size="sm"
                 />
        </div>
      </div>
    </div>
  );
};
