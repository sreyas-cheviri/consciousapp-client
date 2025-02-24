import React from "react";
import { NoteIcon } from "../icons/NoteIcon";
import { Delete } from "../icons/Delete";
import { ShareIcon } from "../icons/ShareIcon";
import { Globe } from "lucide-react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Expand } from "../icons/Expand";

interface CardProps {
  title: string;
  type?: string;
  content?: string;
  url?: string;
  setdelete?: () => void;
  index?: number; // New index prop for delay
}

// const colours = ["pink", "blue", "green", "yellow"];
// const randomColour = colours[Math.floor(Math.random() * colours.length)];

const Card: React.FC<CardProps> = ({
  title,
  type = "",
  content = "",
  url = "",
  setdelete,
  
}) => {
  const randomColour = React.useMemo(() => {
    const colours = ["pink", "blue", "green", "yellow", "purple"];
    return colours[Math.floor(Math.random() * colours.length)];
  }, []);
  const isValidYoutubeUrl = (url: string) => {
    return url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/);
  };

  const isValidTwitterUrl = (url: string) => {
    return url.match(/^(https?:\/\/)?(twitter\.com|x\.com)/);
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId =
      url.split("v=")[1]?.split("&")[0] ||
      url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const getTwitterTweetId = (url: string) => {
    const matches = url.match(/\/status\/(\d+)/);
    return matches ? matches[1] : "nothing";
  };

  const renderContent = () => {
    if (type === "Note") {
      return (
        <div className="p-2">
          <p className="text-gray-700">{content}</p>
        </div>
      );
    } else if (type === "Url") {
      if (isValidYoutubeUrl(url)) {
        const embedUrl = getYoutubeEmbedUrl(url);
        return (
          <div>
            <iframe
              src={embedUrl || ""}
              className="w-full h-full rounded-lg"
              allowFullScreen
              style={{ pointerEvents: "none" }}
            />
          </div>
        );
      } else if (isValidTwitterUrl(url)) {
        const tweetId = getTwitterTweetId(url);
        return tweetId ? (
          <div
            style={{
              margin: -10,
              padding: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <TwitterTweetEmbed
              tweetId={tweetId}
              placeholder={
                <div className="flex justify-center text-gray-600 items-center font-semibold m-10 p-2">
                  Loading...
                </div>
              }
              options={{
                align: "center",
                theme: "dark",
                conversation: "none",
                cards: "hidden",
                width: 500,
                dnt: true,
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-lg">
            <iframe
              src={url}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        );
      } else {
        return (
          <div className="w-full h-full rounded-lg">
            <iframe
              src={url}
              className="w-full h-full rounded-lg"
              style={{
                minHeight: "300px",
                border: "none",
                overflow: "hidden",
                pointerEvents: "none",
                msOverflowStyle: "none",
              }}
            />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div>
      <div className="flex-col bg-zinc-300 dark:bg-zinc-200 p-[1.5px] border z-50 border-zinc-400/50 rounded-xl flex justify-between dark:shadow-none h-60 shadow-lg shadow-gray-500/10">
        <div className="min-w-72 max-w-72 border bg-white rounded-xl no-scrollbar min-h-32 max-h-60 overflow-y-auto">
          {type == "Url" ? (
            <div className=" rounded-t-lg text-sm min-h-36 horizontal-scroll overflow-hidden">
              {renderContent()}
            </div>
          ) : (
            <div className={`bg-${randomColour}-100 rounded-t-lg text-sm min-h-36 horizontal-scroll overflow-hidden`}>
            {renderContent()}
          </div>
          )}
        </div>
        <div className="rounded-b-xl">
          <div className="flex justify-between p-2 min-w-72 max-w-72 rounded-lg">
            <div className="flex gap-2 ">
              <div className="rounded-full p-1  text-gray-700 bg-zinc-400/50">
                {type === "Note" ? <NoteIcon /> : <Globe size={14} />}
              </div>
              <h2 className="text-sm font-semibold text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap max-w-60">
                {title}
              </h2>
            </div>
          </div>
          <div className="flex items-start gap-1 justify-start rounded-xl p-1 m-1 ">
            {type == "Url" ? (
              <button className=" bg-zinc-400/50 rounded-lg p-1 text-gray-700 border-gray-400/50 hover:shadow hover:bg-gray-200 hover:inset-shadow-indigo-500 transition duration-100">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ShareIcon  />
                </a>
              </button>
            ) : (
              <button className=" bg-zinc-400/50 rounded-lg p-1 text-gray-700 border-gray-400/50 hover:shadow hover:bg-gray-200 hover:inset-shadow-indigo-500 transition duration-100">
                <Expand />
              </button>
            )}
            <button
              onClick={setdelete}
              className=" bg-zinc-400/50 rounded-lg p-1 text-gray-700 border-gray-400/50 hover:shadow hover:bg-gray-200 hover:inset-shadow-indigo-500 duration-100"
            >
              <Delete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;