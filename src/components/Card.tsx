import React from "react";
import { NoteIcon } from "../icons/NoteIcon";
import { Delete } from "../icons/Delete";
import { ShareIcon } from "../icons/ShareIcon";
import { Tweet } from "react-tweet";
import { Expand } from "../icons/Expand";
import { File, Globe, ImageIcon } from "lucide-react";

interface CardProps {
  title: string;
  type?: string;
  content?: string;
  url?: string;
  imageUrl?: string | null;
  setdelete?: () => void;
  setNotes?: () => void;
  index?: number;
  time: string;
}

const Card: React.FC<CardProps> = ({
  title,
  type = "",
  content = "",
  url = "",
  time = "",
  setdelete,
  setNotes,
  imageUrl = null,
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
              className=""
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
              marginBottom: -135,
              padding: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <Tweet id={tweetId} />
          </div>
        ) : (
          <div className="">
            <iframe src={url} className="w-full h-full" allowFullScreen />
          </div>
        );
      } else {
        return (
          <div className={`overflow-hidden  rounded-t-xl ${imageUrl ? "" : "h-8  bg-gradient-to-b from-zinc-500/50 via-zinc-400/50 to-zinc-300 dark:from-zinc-300/80 dark:via-zinc-200/70 dark:to-zinc-100"}`}>
            { imageUrl ?  (
              <img
                src={imageUrl || ""}
                alt="Saved Content"
                className="w-72 object-cover max-h-56"
              />
            ) : ("") 
            }
          </div>
        );
      }
    }

    return null;
  };

  return (
    <article className="break-inside-avoid mb-2">
      <div className="flex-col  bg-zinc-300 w-72 dark:bg-zinc-100/90 z-10 rounded-xl b flex justify-between dark:shadow shadow-xl shadow-black">
        <header className="overscroll-x-none rounded-t-xl no-scrollbar overflow-hidden">
          {type == "Url" ? (
            <div className="text-sm overscroll-x-none   overflow-hidden">
              {renderContent()}
            </div>
          ) : (
            <div
              className={`bg-${randomColour}-100  text-sm overflow-hidden`}
            >
              {renderContent()}
            </div>
          )}
        </header>
        <div
         className="rounded-b-xl ">
          <div className="flex justify-between p-2 rounded-xl">
            <div className="flex gap-2">
              <div className="rounded-xl p-1 text-gray-700 bg-zinc-400/50">
                {type === "Doc" ? (
                  <File className="w-4 h-4 " />
                ) : type === "Image" ? (
                  <ImageIcon className="w-4 h-4 " />
                ) : type === "Note" ? (
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

              <h2 className="text-md font-medium text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap max-w-60">
                {title}
              </h2>
            </div>
          </div>
          <nav className="flex items-end gap-1 justify-between  rounded-sm p-1 m-1">
            <div className="gap-1 flex items-center justify-center">
              {type == "Url" ? (
                <button className=" rounded-lg p-1 text-gray-600 border-gray-400/50 hover:shadow  hover:dark:bg-white hover:bg-gray-200 hover:inset-shadow-indigo-500 transition duration-100">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ShareIcon />
                  </a>
                </button>
              ) : (
                <button
                  onClick={setNotes}
                  className=" rounded-lg  p-1 text-gray-600 border-gray-400/50 hover:shadow hover:dark:bg-white hover:bg-gray-200 hover:inset-shadow-indigo-500 transition duration-100"
                >
                  <Expand />
                </button>
              )}
              <button
                onClick={setdelete}
                className=" rounded-lg p-1 text-gray-600 border-gray-400/50 hover:shadow hover:dark:bg-white hover:bg-gray-200 hover:inset-shadow-indigo-500 duration-100"
              >
                <Delete />
              </button>
            </div>
            <p className="text-gray-500 flex text-xs">{time}</p>
          </nav>
        </div>
      </div>
    </article>
  );
};

export default Card;
