import React from 'react';
import { NoteIcon } from "../icons/NoteIcon";
import { Delete } from "../icons/Delete";
import { ShareIcon } from "../icons/ShareIcon";
import { Link } from "lucide-react";

interface CardProps {
  title: string;
  type?: 'note' | 'url';
  content?: string;
  url?: string;
}

const Card: React.FC<CardProps> = ({ title, type = 'note', content = '', url = '' }) => {
  const isValidYoutubeUrl = (url: string) => {
    return url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/);
  };

  const isValidTwitterUrl = (url: string) => {
    return url.match(/^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)/);
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || 
                   url.split('youtu.be/')[1]?.split('?')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };
  const getTwitterTweetId = (url: string) => {
    const matches = url.match(/\/status\/(\d+)/);
    return matches ? matches[1] : null;
  };

  const renderContent = () => {
    if (type === 'note') {
      return (
        <div className="p-3">
          <p className="text-gray-700">{content}</p>
        </div>
      );
    } else if (type === 'url') {
      if (isValidYoutubeUrl(url)) {
        const embedUrl = getYoutubeEmbedUrl(url);
        return (
          <div className="aspect-video mt-2">
            <iframe 
              src={embedUrl || ''}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        );
      } else if (isValidTwitterUrl(url)) {
        const tweetId = getTwitterTweetId(url);
        if (tweetId) {
          return (
            <div className="p-3">
              <div 
                className="twitter-tweet twitter-tweet-rendered"
                style={{ minHeight: "300px" }}
              >
                <blockquote
                  className="twitter-tweet"
                  data-conversation="none"
                  data-theme="light"
                >
                  <a href={url}></a>
                </blockquote>
              </div>
            </div>
          );
        } else {
          return (
            <div className="p-3">
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
    <div className="flex flex-col bg-white rounded-lg p-2">
      <div className="flex justify-between bg-gray-200 p-2 gap-5 rounded-lg">
        <div className="flex items-center gap-1">
          <div className="bg-gray-200 rounded-lg p-1 border-gray-400">
            {type === 'note' ? <NoteIcon /> : <Link size={14} />}
          </div>
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {type == 'url' ? <button className="bg-gray-200 rounded-lg p-1 border border-gray-400 hover:bg-gray-300 transition duration-300">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ShareIcon />
            </a>
          </button> : null}
          
          <button className="bg-gray-200 rounded-lg p-1 border border-gray-400 hover:bg-gray-300 duration-300">
            <Delete />
          </button>
        </div>
      </div>
    <div className="border min-w-64 max-w-64 bg-white rounded-lg shadow-lg p-2 m-1 gap-1 max-h-60 overflow-y-auto ">
      <div className='bg-gray-200 mt-2 rounded-lg p-1'>

      {renderContent()}
      </div>
    </div>
    <div className='max-h-10 mt-0'>
      <button className='bg-white p-2 rounded-lg w-full max-h-10'>Query</button>
    </div>
    </div>
  );
};

export default Card;