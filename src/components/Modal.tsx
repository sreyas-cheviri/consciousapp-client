import { CircleX, Loader2 } from "lucide-react";
import { Button } from "./Button";
import { Chips } from "./Chips";
import { Input } from "./Input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
// import { Notes } from "@mui/icons-material";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onContentAdded?: (newContent: {
    _id: string;
    type: string;
    link: string;
    title: string;
    content: string;
    createdAt: Date;
  }) => void;
  setToastLoading: (loading: boolean) => void;
};

const API_URL = import.meta.env.VITE_API_URL;

enum ContentType {
  Url = "Url",
  Note = "Note",
  Doc = "Doc",
  Image = "Image",
}

export function Modal({ open, onClose, onContentAdded, setToastLoading }: ModalProps) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const LinkRef = useRef<HTMLInputElement | null>(null);
  const NoteRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedChip, setSelectedChip] = useState<string | null>("Url");
  const [error, setError] = useState<string | null>(null); // Error state
  const [type, setType] = useState(ContentType.Url);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (open) {
      setSelectedChip("Url");
      setType(ContentType.Url);
      setError(null);
    }
  }, [open]);

  const handleChipClick = (chip: string) => {
    setSelectedChip(chip);
    setType(ContentType[chip as keyof typeof ContentType]);
  };

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    const link = LinkRef.current?.value;
    const content = NoteRef.current?.value?.trim();

    if (!title && type === ContentType.Note) {
      setError("Please enter a title");
      return;
    }

    if (type === ContentType.Url && !link) {
      setError("Please enter a URL");
      return;
    }

    if (type === ContentType.Note && !content) {
      setError("Please enter some notes");
      return;
    }

    setLoading(true);
    setToastLoading(true);
    setError(null);
    setTimeout(() => {
      onClose()
    }, 1000);
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/content`,
        { title, link, type, content },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      if (onContentAdded) {
        onContentAdded(response.data);
      }
      onClose();
  
    } catch (err) {
      console.error("Error adding content:", err);
      setError("Failed to add content. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToastLoading(false);
      }, 1000);
    }
  }

  return (
    open && (
      <div
        className="w-screen h-screen bg-black/80 fixed top-0 left-0 z-40 flex justify-center items-center"
        onClick={onClose} 
      >
        <div
          className="bg-zinc-100  text-black rounded-2xl max-w-[90%] h-fit  z-50 md:w-[44rem]  w-full "
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="bg-zinc-400/60 p-5 w-full  min-h-96 rounded-2xl">
            <div className="flex items-center justify-between w-full text-gray-700">
              <div className="flex-grow flex justify-center">
                <p className="font-bold text-lg">Add your content</p>
              </div>
              <CircleX
                onClick={onClose}
                className="cursor-pointer hover:text-zinc-500"
              />
            </div>

            <div className="flex justify-center text-xs text-gray-600 items-center ">
              <p className="flex justify-center items-center w-96 text-center">
                Choose an option to get started: Notes, Doc, Image, or URL.
                Select the type of content you want to add!
              </p>
            </div>

            <div className="flex flex-col h-full gap-2">
              <div className="flex gap-1 mt-10 m-2">
                <div className="flex gap-2 mt-2 bg-black/15 p-1 rounded-full">
                  {["Url", "Note", "Doc"].map((chip, index) => (
                    <Chips
                      key={index}
                      text={chip}
                      isSelected={selectedChip === chip}
                      onClick={() => {
                        setType(ContentType[chip as keyof typeof ContentType]);
                        handleChipClick(chip);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
              <Input
                    placeholder="Title"
                  reference={titleRef}
                  variant="secondary"
                  required
                />
                {type === ContentType.Url ? (
                  <Input
                  placeholder="https://consciousapp.vercel.app"
                  reference={LinkRef}
                  variant="secondary"
                  onKeyDown={(e) => e.key === "Enter" &&
                    (e.preventDefault(), addContent())}
                    />
                  ) : (
                  <textarea
                  placeholder="Paste your Notes.........."
                    ref={NoteRef}
                    className="p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 border-gray-300 max-h-screen min-h-36 bg-gray-50 border-2"
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      (e.preventDefault(), addContent())
                    }
                    />
                  )}
                  {error && <p className="text-red-600 text-sm font-semibold p-3">{error}</p>}{" "}
              </div>
              <div
                className={`mb-6 flex items-end justify-end ${
                  loading ? "opacity-70 " : ""
                }`}
              >
                <Button
                  onClick={addContent}
                  variant="new"
                  size="md"
                  loading={loading}
                >
                  {loading ? (
                    <div className="flex gap-2 items-center justify-between">
                      <div className="flex gap-1">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Adding...
                      </div>
                      <div>
                        <p className="text-xs italic">
                          Content is being extracted and embedded. This may take
                          few seconds.
                        </p>
                      </div>
                    </div>
                  ) : (
                    "Add to Memory"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
