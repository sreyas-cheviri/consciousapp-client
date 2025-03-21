import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Chips } from "./Chips";

interface SearchBoxProps {
  onChipSelect: (chip: string | null) => void;
}

const SearchBox = ({ onChipSelect }: SearchBoxProps) => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipClick = (chip: string) => {
    const newSelectedChip = selectedChip === chip ? null : chip;
    setSelectedChip(newSelectedChip);
    
    onChipSelect(newSelectedChip);  // Notify parent component
  };

  return (
    <div className="bg-zinc-700 dark:bg-zinc-400 w-full  mt-10 flex flex-col  dark:text-zinc-900 dark:shadow-zinc-300 shadow-xl shadow-black/30  rounded-2xl md:w-[650px] border-gray-500/5 justify-between border p-1 text-gray-300 relative">
      <textarea
        className="placeholder:opacity-60 bg-zinc-700 font-semibold dark:bg-zinc-400 dark:placeholder-zinc-900  overflow-auto h-16 px-4 py-2 bg-transparent w-full focus:outline-none rounded-2xl md:w-full resize-none"
        placeholder="Ask your brain..."
      ></textarea>

      <div className="flex gap-1 p-2">
        {["Url", "Note", "Doc", "Image" , "Date"].map((chip) => (
          <Chips
            key={chip}
            text={chip}
            isSelected={selectedChip === chip}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>

      <button className="absolute right-2 top-16   bg-zinc-300/10 dark:bg-zinc-200/30 border-gray-500/50 px-2 flex py-2 rounded-3xl h-fit ">
        <SearchIcon style={{ color: "black" }} />
      </button>
    </div>
  );
};

export default SearchBox;
