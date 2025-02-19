import Card from "../components/Card";
import { Modal } from "../components/Modal";
import { useState } from "react";
import { Sidebar } from "../components/SideBar";
import SearchBox from "../components/SearchBox";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useContent } from "../hooks/useContent";

export function Dashboard() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const content = useContent();
  const cardsData = content.map(({ type, link, title, content }) => ({
    type,
    link,
    title,
    content,
  }));
  

  const handleChipSelect = (chip: string | null) => {
    setFilter(chip);
  };

  const filteredCards = filter
    ? cardsData.filter((card) => card.type === filter.toLowerCase())
    : cardsData;

  return (
    <div>
      <Sidebar openpanel={panel} closepanel={() => setPanel(false)} />
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center mt-4">
          <Header setOpen={setOpen} />
          <Footer setpanel={setPanel} />
          <SearchBox onChipSelect={handleChipSelect} />

          <div className="flex gap-2 md:justify-center max-w-6xl md:min-w-[1154px] border-gray-500/10 border mx-auto justify-center flex-wrap mt-8 p-6 rounded-lg bg-zinc-600/3">
            {filteredCards.map((card) => (
              <Card
                key={card.title}
                title={card.title}
                type={card.type}
                content={card.content}
                url={card.link}
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
