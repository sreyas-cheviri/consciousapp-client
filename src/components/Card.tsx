import React from "react";
import { NoteIcon } from "../icons/NoteIcon";
import { Delete } from "../icons/Delete";
import { ShareIcon } from "../icons/ShareIcon";
import { Tweet } from "react-tweet";
import { Expand } from "../icons/Expand";
import { DockIcon, Globe, ImageIcon } from "lucide-react";


interface CardProps {
  title: string;
  type?: string;
  content?: string;
  url?: string;
  setdelete?: () => void;
  setNotes?: () => void;
  index?: number;
  time : string;
}

// const colours = ["pink", "blue", "green", "yellow"];
// const randomColour = colours[Math.floor(Math.random() * colours.length)];

const Card: React.FC<CardProps> = ({
  title,
  type = "",
  content = "",
  url = "",
  time = "",
  setdelete,
  setNotes,
  
}) => {
  const getDomain = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace("www.", ""); // Remove 'www.' if present
    } catch {
      return null;
    }
  };

  const getFaviconUrl = (url: string) => {
    const domain = getDomain(url);
    return domain
      ? `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
      : undefined;
  };

  const randomColour = React.useMemo(() => {
    const colours = ["blue", "green", "yellow", "purple"];
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
          <p className="text-gray-700 pointer-events-none whitespace-pre-wrap line-clamp-6">
            {content}
          </p>
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
              position: "relative",
              zIndex: 1,
              marginTop: -30,
              marginBottom: -30,
              padding: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <Tweet id={tweetId} />
          </div>
        ) : (
          <div className="w-full h-full rounded-lg ">
            <iframe
              src={url}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        );
      } else {
        return (
          <div
            className="w-full  rounded-lg "
            style={{ overflow: "hidden" }}
          >
            <iframe
              src={url}
              className="min-w-full  rounded-lg"
              style={{
                minHeight: "200px",
                overflow: "hidden",
                pointerEvents: "none",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
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
      <div className="flex-col bg-zinc-300  dark:bg-zinc-200 p-[1.5px] border z-10 border-zinc-400/40 rounded-xl flex justify-between dark:shadow-none h-60 shadow-lg shadow-gray-500/10">
        <div className="min-w-72 max-w-72 border bg-white rounded-xl no-scrollbar min-h-32 max-h-60 overflow-y-auto">
          {type == "Url" ? (
            <div className=" rounded-t-lg text-sm min-h-36  horizontal-scroll  overflow-hidden">
              {renderContent()}
            </div>
          ) : (
            <div
              className={`bg-${randomColour}-100 rounded-t-lg text-sm min-h-36 overflow-hidden`}
            >
              {renderContent()}
            </div>
          )}
        </div>
        <div className="rounded-b-xl">
          <div className="flex justify-between p-2 min-w-72 max-w-72 rounded-lg">
            <div className="flex gap-2 ">
              <div className="rounded-full p-1 text-gray-700 bg-zinc-400/50">
                {
                
                
                type === "Doc" ? (
                  <DockIcon className=" w-4 h-4 " />
                ) : 
                type === "Image" ? (
                  <ImageIcon className=" w-4 h-4 " />
                ) : 
                type === "Note" ? (
                  <NoteIcon />
                ) : getFaviconUrl(url) ? (
                  <img
                    src={getFaviconUrl(url)}
                    alt="Website Logo"
                    className="w-4 h-4 rounded-full"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <Globe size={14} />
                )}
              </div>

              <h2 className="text-md font-semibold text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap max-w-60">
                {title}
              </h2>
            </div>
          </div>
          <div className="flex items-end gap-1 justify-between rounded-xl p-1 m-1 ">
            <div className="gap-1 flex items-center justify-center">
            {type == "Url" ? (
              <button className=" bg-zinc-400/50 rounded-lg p-1 text-gray-700 border-gray-400/50 hover:shadow hover:bg-gray-200 hover:inset-shadow-indigo-500 transition duration-100">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ShareIcon />
                </a>
              </button>
            ) : (
              <button
                onClick={setNotes}
                className=" bg-zinc-400/50 rounded-lg p-1 text-gray-700 border-gray-400/50 hover:shadow hover:bg-gray-200 hover:inset-shadow-indigo-500 transition duration-100"
              >
                {/* onClick={setNotes} */}
                <Expand />
              </button>
            )}
            <button
              onClick={setdelete}
              className=" bg-zinc-400/50 rounded-lg p-1 text-gray-700 border-gray-400/50 hover:shadow hover:bg-gray-200 hover:inset-shadow-indigo-500 duration-100"
            >
              <Delete />
            </button>

            </div >
            <p className="text-gray-500 flex text-xs">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
