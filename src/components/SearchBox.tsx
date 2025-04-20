import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Chips } from "./Chips";
import axios from "axios";
import { PushButtons } from "./PushButtons";

const API_URL = import.meta.env.VITE_API_URL;

interface SearchBoxProps {
  onChipSelect: (chip: string | null) => void;
  setLoading: (loading: boolean) => void;
  setContent: (
    content: {
      _id: string;
      type: string;
      link: string;
      title: string;
      content: string;
      createdAt: Date;
      imageUrl?: string;
    }[]
  ) => void;
  setAnswer: (amswer: string) => void;
  searchText: string; // Add this
  setSearchText: (text: string) => void; // Add this
}

const SearchBox = ({
  onChipSelect,
  setLoading,
  setContent,
  setAnswer,
  searchText,      // Add this
  setSearchText,   // Add this
}: SearchBoxProps) => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  
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
          query: searchText.trim(), 
        },
        {
          headers: {
            Authorization: token, 
          },
        }
      );

      if (res.data.message && !res.data.relevantContent?.length) {
        setContent([]);
        setAnswer(res.data.message);
        return;
      }

      setContent(res.data.relevantContent || []);
      setAnswer(res.data.answer || "");
      setLoading(false);
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="bg-zinc-700 mt-5 mb-10 dark:bg-white w-full flex flex-col dark:text-zinc-900 dark:shadow-zinc-300 shadow-xl shadow-black/30 rounded-2xl md:w-[650px] border-gray-500/5 justify-between border p-1 text-gray-300 relative">
      <textarea
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyPress}
        className="placeholder:opacity-60 bg-zinc-700 font-normal dark:bg-white dark:placeholder-zinc-900 overflow-auto h-16 px-4 py-2 bg-transparent w-full focus:outline-none rounded-2xl md:w-full resize-none"
        placeholder="Ask your brain..."
      />

<div className="flex items-center justify-between">

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

      <div className="p-2">
        <PushButtons
          icon={<SearchIcon style={{ padding: "6px" }} />}
          onClick={handleSearch}
          variant={"opaque2"}
          size={"sm"}
          ></PushButtons>
      </div>
          </div>
    </div>
  );
};

export default SearchBox;
