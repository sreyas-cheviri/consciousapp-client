import { SearchIcon } from "lucide-react"; 

const SearchBox = () => {
  return (
    <div className="bg-zinc-800 md:mt-10 mt-10 flex shadow-xl shadow-black/30 w-[355px] rounded-3xl md:w-[650px] border-gray-500/5 justify-between border p-1 text-gray-300 relative">
      <textarea
        className="placeholder:opacity-40 bg-zinc-800 overflow-auto  h-20  px-4 py-2 bg-transparent w-full focus:outline-none rounded-3xl md:w-full resize-none"
        placeholder="Search your brain in natural language..."
      ></textarea>
      <button className="absolute right-2 top-10 bg-zinc-700/20 border-gray-500/50 px-2 flex py-2 rounded-3xl h-fit hover:bg-zinc-600/20">
        <SearchIcon style={{ color: "gray" }} />
      </button>
    </div>
  );
};

export default SearchBox;
