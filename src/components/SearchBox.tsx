import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Chips } from "./Chips";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface SearchBoxProps {
  onChipSelect: (chip: string | null) => void;
  setLoading: (loading: boolean) => void;
  setContent: (content: {
    _id: string;
    type: string;
    link: string;
    title: string;
    content: string;
    createdAt: Date;
    imageUrl?: string; 
  }[]) => void;
  setAnswer : (amswer : string) => void;
}

const SearchBox = ({ onChipSelect, setLoading, setContent, setAnswer }: SearchBoxProps) => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
    
      if (!token) {
        console.error("No authentication token found");
        setAnswer("You need to be logged in to search.");
        setLoading(false);
        return;
      }
      
      // Fix the request format to match backend expectations

      const res = await axios.post(

        `${API_URL}/api/v1/search`,
        {
          query: searchText.trim() // Send query in request body
        },
        {
          headers: {
            Authorization: token // Add token directly in headers
          }
        }
      );

      // Handle response based on backend structure
      if (res.data.message && !res.data.relevantContent?.length) {
        setContent([]);
        setAnswer(res.data.message);
        return;
      }

      setContent(res.data.relevantContent || []);
      setAnswer(res.data.answer || "");
      setLoading(false)
    } catch (error) {
      console.error("Search error:", error);
      setContent([]);
      setAnswer("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (chip: string) => {
    const newSelectedChip = selectedChip === chip ? null : chip;
    setSelectedChip(newSelectedChip);
    onChipSelect(newSelectedChip);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="bg-zinc-700 mt-5 mb-10 dark:bg-zinc-400/50 w-full flex flex-col dark:text-zinc-900 dark:shadow-zinc-300 shadow-xl shadow-black/30 rounded-2xl md:w-[650px] border-gray-500/5 justify-between border p-1 text-gray-300 relative">
      <textarea
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={handleKeyPress}
        className="placeholder:opacity-60 bg-zinc-700 font-normal dark:bg-zinc-400/5 dark:placeholder-zinc-900 overflow-auto h-16 px-4 py-2 bg-transparent w-full focus:outline-none rounded-2xl md:w-full resize-none"
        placeholder="Ask your brain..."
      />

      <div className="flex gap-1 p-2">
        {["Url", "Note", "Doc", "Date"].map((chip) => (
          <Chips
            key={chip}
            text={chip}
            isSelected={selectedChip === chip}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>

      <button
        onClick={handleSearch}
        className="absolute right-2 top-16 bg-zinc-300/10 dark:bg-zinc-200/30 border-gray-500/50 px-2 flex py-2 rounded-3xl h-fit"
      >
        <SearchIcon style={{ color: "black" }} />
      </button>
    </div>
  );
};

export default SearchBox;
