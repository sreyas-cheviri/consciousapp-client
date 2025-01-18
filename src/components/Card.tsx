import React from "react";
import { NoteIcon } from "../icons/NoteIcon";
import { Delete } from "../icons/Delete";
import { ShareIcon } from "../icons/ShareIcon";
import { Globe } from 'lucide-react';
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Expand } from "../icons/Expand";
import { Margin } from "@mui/icons-material";

interface CardProps {
  title: string;
  type?: "note" | "url";
  content?: string;
  url?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  type = "note",
  content = "",
  url = "",
}) => {
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
    if (type === "note") {
      return (
        <div className="p-2">
          <p className="text-gray-700">{content}</p>
        </div>
      );
    } else if (type === "url") {
      if (isValidYoutubeUrl(url)) {
        const embedUrl = getYoutubeEmbedUrl(url);
        return (
          <div className="">
            
            <iframe
            
              src={embedUrl || ""}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        );
      } else if (isValidTwitterUrl(url)) {
        const tweetId = getTwitterTweetId(url);
        if (tweetId) {
          return (
         
            <div style={{ margin: 0, padding: 0 }}>

                <TwitterTweetEmbed
                  tweetId={tweetId}
                  placeholder={<div className="flex justify-center text-gray-500 items-center font-semibold m-2 p-2">Loading...</div>}
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
              
            
          );
        } else {
          return (
            <div className="">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all text-sm"
              >
                {url}
              </a>
            </div>
          );
        }
      }
    }
    return null;
  };

  return (
    <div className=" flex-col bg-gray-100 rounded-xl flex justify-between p-1  h-60 shadow-lg shadow-black/90  ">
     
      <div className=" min-w-72 max-w-72 border-1 border-gray-300 bg-white rounded-xl  no-scrollbar shadow-lg min-h-32 gap-1 max-h-60 overflow-y-auto ">
        {type == "url" ? (
          <div className="bg-gray-100 rounded-lg p-.5 text-sm min-h-36 horizontal-scroll  overflow-hidden">
            {renderContent()}
          </div>
        ) : (
          <div className="bg-yellow-100 rounded-lg p-.5 text-sm min-h-36 horizontal-scroll overflow-hidden">
            {renderContent()}
          </div>
        )}
      </div>
      <div className="bg-gray-300/90 mt-1 rounded-xl rounded-t-md">
      <div className="flex justify-between  p-2 min-w-72 max-w-72 rounded-lg ">
        <div className="flex  gap-1">
          <div className="rounded-full p-1 text-gray-700">
            {type === "note" ? <NoteIcon /> : <Globe size={14} />}
          </div>
          <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        </div>
      </div>
     <hr  />
      <div className="flex items-start gap-1 justify-start rounded-xl p-1  m-1   ">
        {type == "url" ? (
          <button className="bg-gray-200 rounded-lg p-1 border border-gray-400/50 hover:bg-gray-300 transition duration-300">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ShareIcon />
            </a>
          </button>
        ) : (
          <button className="bg-gray-200 rounded-lg p-1 border border-gray-400/50 hover:bg-gray-300 transition duration-300">
            <Expand />
          </button>
        )}

        <button className="bg-gray-200 rounded-lg p-1 border border-gray-400/50 hover:bg-gray-300 duration-300">
          <Delete />
        </button>
        <button className="bg-gray-200 flex items-center justify-center rounded-lg p-1 py-0 border border-gray-400/50 hover:bg-gray-300 duration-300">
          <p>Query</p>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Card;
