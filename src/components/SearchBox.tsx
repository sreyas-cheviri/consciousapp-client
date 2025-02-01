import { SearchIcon } from "lucide-react";
import { Chips } from "./Chips";

const SearchBox = () => {
  return (
    <div className="bg-zinc-700 md:mt-10 mt-10 flex flex-col shadow-xl shadow-black/30 w-[355px] rounded-3xl md:w-[650px] border-gray-500/5 justify-between border p-1 text-gray-300 relative">
      <textarea
        className="placeholder:opacity-60 bg-zinc-700 overflow-auto  h-16  px-4 py-2 bg-transparent w-full focus:outline-none rounded-3xl md:w-full resize-none"
        placeholder="Filter your brain with natural language..."
      ></textarea>
      <div className="flex gap-1 p-2">
        {["Url", "Note", "Doc", "Image"].map((chip, index) => (
          <Chips key={index} text={chip} />
        ))}
      </div>
      <button className="absolute right-2 top-16 bg-zinc-700/20 border-gray-500/50 px-2 flex py-2 rounded-3xl h-fit hover:bg-zinc-400/20">
        <SearchIcon style={{ color: "gray" }} />
      </button>
    </div>
  );
};

export default SearchBox;
