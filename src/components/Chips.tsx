import CircleIcon from "@mui/icons-material/Circle";

export interface ChipsProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export const Chips = ({ text, isSelected, onClick }: ChipsProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-zinc-900 w-fit p-1 px-2 rounded-full text-zinc-400 dark:text-zinc-200 flex gap-1 ease-in-out 
        ${
          isSelected
            ? "text-orange-600 border-orange-600"
            : "hover:bg-black"
        }  
        items-center`}
    >
      <div className="flex gap-1 items-center">
        {isSelected && (
          <div className="flex items-center text-orange-600 transition-all duration-500">
            <CircleIcon style={{ fontSize: 10 }} />
          </div>
        )}
        <div className="text-xs transition-all duration-100">{text}</div>
      </div>
    </button>
  );
};
