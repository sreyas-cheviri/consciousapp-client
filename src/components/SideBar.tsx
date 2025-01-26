import { Add } from "@mui/icons-material";
import { Button } from "./Button";
import { PanelLeftClose } from "lucide-react";
import { PushButtons } from "./PushButtons";

interface SideBarProps {
  openpanel: boolean;
  closepanel: () => void;
}

export const Sidebar = ({ openpanel, closepanel }: SideBarProps) => {
  return (
    <div>
      {openpanel && (
        <div className="w-screen h-screen bg-black/80 fixed top-0 left-0  z-50">

        <div className="fixed z-50 h-screen w-64 md:w-1/4 lg:w-1/6 bg-zinc-800 border-r border-gray-300/20 flex flex-col">
          <div className="flex flex-col justify-center  p-4 space-y-6">
            {/* Add Button */}
            <Button
              variant="secondary"
              startIcon={<Add />}
              size="lg"
              text={"Add New Brain"}
              />

            {/* Brain Section */}
            <div className="w-full bg-zinc-600 p-3 text-white rounded-md">
              <p>Brain 1</p>
            </div>

            {/* In-progress Feature */}
            <p className="text-sm text-white italic bg-red-900 rounded p-2 text-center">
              This feature is still in progress, sorry for the inconvenience.
            </p>
          </div>

          
          <div className="absolute top-80 right-3 text-white">
            <PushButtons icon={<PanelLeftClose />} size="sm" variant="opaque" onClick={closepanel}/>
          </div>
        </div>
              </div>
      )}
    </div>
  );
};
