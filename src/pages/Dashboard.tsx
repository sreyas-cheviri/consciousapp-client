import Card from "../components/Card";
import { Modal } from "../components/Modal";
import { useState } from "react";
import { Sidebar } from "../components/SideBar";
import SearchBox from "../components/SearchBox";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useContent } from "../hooks/useContent";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export function Dashboard() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const content = useContent();
  const cardsData = content.map(({_id, type, link, title, content }) => ({
    id: _id,
    type,
    link,
    title,
    content,
  }));
  
 function deletecard (contentId: string){
  axios
  .delete(`${API_URL}/api/v1/content/${contentId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),

    },
  }).then(() => {
    window.location.reload(); // Refresh the page after deletion
  })
  .catch((error) => {
    console.error("Error deleting content:", error);
  });


};
  const handleChipSelect = (chip: string | null) => {
    setFilter(chip);
  };

  const filteredCards = filter
    ? cardsData.filter((card) => card.type === filter)
    : cardsData;

  return (
    <div>
      <Sidebar openpanel={panel} closepanel={() => setPanel(false)} />
      <div className="flex justify-center items-center ">
        <div className="flex flex-col justify-center  items-center mt-4">
          <Header setOpen={setOpen} />
          <Footer setpanel={setPanel} />
          <SearchBox onChipSelect={handleChipSelect} />

          <div className="flex gap-2 md:justify-center mb-10 max-w-6xl md:min-w-[1154px] border-gray-500/10 border mx-auto justify-center flex-wrap mt-8 p-6 rounded-lg bg-zinc-600/3">
            {filteredCards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                type={card.type}
                content={card.content}
                url={card.link}
                setdelete={()=> deletecard(card.id)}
              />
            ))}
          </div>

          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
