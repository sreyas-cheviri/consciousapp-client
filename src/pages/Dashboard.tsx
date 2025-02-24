import Card from "../components/Card";
import { Modal } from "../components/Modal";
import { useState, useCallback } from "react";
import { Sidebar } from "../components/SideBar";
import SearchBox from "../components/SearchBox";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import axios from "axios";
import CommonMondal from "../components/CommonMondal";
import { LinkIcon, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export function Dashboard() {
  const [open, setOpen] = useState(false);
  const [share, setShare] = useState(false);
  const [Copen, setCOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [shareUrl, setShareURL] = useState<string>("");
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Instead of using the useContent hook, manage content state directly in the component
  const [content, setContent] = useState<{ _id: string; type: string; link: string; title: string; content: string }[]>([]);
  
  // Function to fetch content
  const fetchContent = useCallback(() => {
    axios
      .get(`${API_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }, []);
  
  // Initial content fetch (same as useEffect in your useContent hook)
  useState(() => {
    fetchContent();
  });

  const cardsData = content.map(({ _id, type, link, title, content }) => ({
    id: _id,
    type,
    link,
    title,
    content,
  }));

  const handleDeleteClick = (id: string) => {
    setSelectedCardId(id);
    setCOpen(true);
  };

  const copyLink = async () => {
    setLoading(true);
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
    setTimeout(() => {
      setLoading(false); // Ensures user sees loading state briefly
    }, 1000);
  };
  
  const deleteCard = () => {
    if (!selectedCardId) return;

    setLoading(true);

    axios
      .delete(`${API_URL}/api/v1/content/${selectedCardId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        // Instead of reloading the page, update the state
        setContent(prevContent => 
          prevContent.filter(item => item._id !== selectedCardId)
        );
      })
      .catch((error) => {
        console.error("Error deleting content:", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setCOpen(false);
          setSelectedCardId(null);
        }, 500);
      });
  };

  const handleChipSelect = (chip: string | null) => {
    setFilter(chip);
  };

  const filteredCards = filter
    ? cardsData.filter((card) => card.type === filter)
    : cardsData;
    
  // Function to add new content to state
  const handleContentAdded = (newContent: { _id: string; type: string; link: string; title: string; content: string; }) => {
    setContent(prevContent => [...prevContent, newContent]);
  };

  return (
    <div>
      <Sidebar openpanel={panel} closepanel={() => setPanel(false)} />
      <div className="flex justify-center items-center ">
        <div className="flex flex-col justify-center  items-center mt-4">
          <Header
            setOpen={setOpen}
            setCOpen={setShare}
            setShareURL={setShareURL}
          />
          <Footer setpanel={setPanel} />
          <SearchBox onChipSelect={handleChipSelect} />

          <div
            className={`flex gap-2 flex-wrap md:justify-center mb-10 max-w-6xl md:min-w-[1154px] border-gray-500/10 border mx-auto justify-center  mt-8 p-6 rounded-lg bg-zinc-600/3 transition-all duration-300 ${
              open ? "blur-sm" : ""
            } ${Copen ? "blur-sm" : ""} ${share ? "blur-sm" : ""}`}
          >
            {filteredCards
              .slice()
              .reverse()
              .map((card, index) => (
                <Card
                  key={card.id}
                  title={card.title}
                  type={card.type}
                  content={card.content}
                  url={card.link}
                  setdelete={() => handleDeleteClick(card.id)}
                  index={index}
                />
              ))}
          </div>
          <CommonMondal
            Copen={Copen}
            onClose={() => {
              setCOpen(false);
            }}
            Message={"Are you sure you want to delete the content?"}
            ButtonMessage={
              loading ? (
                <div className="flex gap-2 items-center justify-center">
                  <Loader2 className=" h-5  w-5 animate-spin" /> Deleting...
                </div>
              ) : (
                "Yes"
              )
            }
            WrongButtonMessage={"No"}
            onConfirm={deleteCard}
            loading={loading}
          />
          <CommonMondal
            onClose={() => {
              setShare(false);
            }}
            startIcon={<LinkIcon className="p-1 mr-2" />}
            Message={"Copy the link to share your brain"}
            Message2={shareUrl}
            ButtonMessage={loading ? "Copied" : "COPY"}
            onConfirm={copyLink}
            loading={loading}
            Copen={share}
          />

          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            onContentAdded={handleContentAdded} // Pass the handler to update content state
          />
        </div>
      </div>
    </div>
  );
}