import { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";

export interface ChipsProps {
  text: string;
  onClick?: () => void;
}

export const Chips = ({ text, onClick }: ChipsProps) => {
  const [showIcon, setShowIcon] = useState(false);

  const handleClick = () => {
    setShowIcon((prev) => !prev);
    if (onClick) onClick(); // Call parent onClick handler if provided
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-zinc-900 w-fit p-1 px-2 rounded-full border text-zinc-400  flex gap-1 ease-in-out 
        ${
          showIcon
            ? "text-orange-600 border-orange-600 "
            : " hover:border-orange-600 border-zinc-600 border "
        } 
        items-center`}
    >
      <div className="flex gap-1 items-center">
        {showIcon && (
          <div className="flex items-center text-orange-600   transition-all duration-500">
            <CircleIcon style={{ fontSize: 10 }} />
          </div>
        )}
        <div className="text-xs transition-all duration-100">{text}</div>
      </div>
    </button>
  );
};
