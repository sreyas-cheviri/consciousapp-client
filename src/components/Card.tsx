import React from "react";
import { NoteIcon } from "../icons/NoteIcon";
import { Delete } from "../icons/Delete";
import { ShareIcon } from "../icons/ShareIcon";
import { Expand } from "../icons/Expand";
import { File, Globe, ImageIcon } from "lucide-react";
import { 
  InstagramEmbed,
  PinterestEmbed,
  YouTubeEmbed,
  LinkedInEmbed,
  FacebookEmbed,
  XEmbed,
} from 'react-social-media-embed';

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
  imageUrl = "",
}) => {


  //--------------------------------------------------
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
 //--------------------------------------------------

  //--------------------------------------------------
  const randomColour = React.useMemo(() => {
    const colours = ["blue", "green", "yellow", "purple"];
    return colours[Math.floor(Math.random() * colours.length)];
  }, []);
 //--------------------------------------------------

  //--------------------------------------------------
  const isValidSocialUrl = (url: string) => {
    const socialPatterns = {
      youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/,
      twitter: /^(https?:\/\/)?(twitter\.com|x\.com)/,
      instagram: /^(https?:\/\/)?(www\.)?instagram\.com/,
      facebook: /^(https?:\/\/)?(www\.)?facebook\.com/,
      linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com/,
      Pinterest: /^(https?:\/\/)?(www\.)?pinterest\.com/,
    };

    for (const [platform, pattern] of Object.entries(socialPatterns)) {
      if (url.match(pattern)) return platform;
    }
    return null;
  };
 //--------------------------------------------------
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
      const socialPlatform = isValidSocialUrl(url);
      
      if (socialPlatform) {
        const embedDiv = {
          position: 'relative' as const,
          zIndex: 1,
          // padding : '-10px',
          overflow: 'hidden',
          pointerEvents: 'none' as const,
          width: '100%',
          
        };

        const embedProps = {
          url,
          width: '100%',
          
          height: 'auto',
        
        };

        switch (socialPlatform) {
          case 'youtube':
            return (
              <div style={embedDiv}>
                <YouTubeEmbed {...embedProps} />
              </div>
            );
          case 'pinterest':
            return (
              <div style={embedDiv}>
                <PinterestEmbed {...embedProps} />
              </div>
            );
          case 'twitter':
            return (
              <div style={{...embedDiv, marginBottom: '-90px' }} className="twitter-embed">
                <XEmbed {...embedProps} />
              </div>
            );
            case 'instagram':
              return (
                <div style={{
                  ...embedDiv,
                  height: '370px',  
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  transform: 'scale(2)',  // Slightly scale up to hide borders
                  transformOrigin: 'center center'
                }}>
                  <InstagramEmbed 
                    {...embedProps} 
                    height="100%" 
                  />
                </div>
              );
          case 'facebook':
            return (
              <div style={embedDiv}>
                <FacebookEmbed {...embedProps} />
              </div>
            );
          case 'linkedin':
            return (
              <div style={embedDiv}>
                <LinkedInEmbed {...embedProps} />
              </div>
            );
        }
      }
      
      return (
        <div className={`overflow-hidden rounded-t-xl ${imageUrl ? "" : "h-8 bg-gradient-to-b from-zinc-500/50 via-zinc-400/50 to-zinc-300 dark:from-zinc-300/80 dark:via-zinc-200/70 dark:to-zinc-100"}`}>
          {imageUrl ? (
            <img
              src={imageUrl || ""}
              alt="Saved Content"
              className="w-full object-cover max-h-56"
            />
          ) : (
            ""
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <article className="break-inside-avoid mb-2 ">
      <div className="flex-col bg-zinc-300 w-full dark:bg-zinc-100/90 z-10 rounded-xl p-1  b flex justify-between dark:shadow shadow-xl shadow-black">
        <header className="overscroll-x-none   rounded-xl no-scrollbar overflow-hidden ">
          {type == "Url" ? (
            <div className="text-sm overscroll-x-none overflow-hidden rounded-xl">
              {renderContent()}
            </div>
          ) : (
            <div className={`bg-${randomColour}-100 text-sm overflow-hidden rounded-xl`}>
              {renderContent()}
            </div>
          )}
        </header>
        <div className="rounded-b-xl">
          <div className="flex justify-between p-2 rounded-xl">
            <div className="flex gap-2 items-center">
              <div className="rounded-xl p-1 text-gray-700 bg-zinc-400/50">
                {type === "Doc" ? (
                  <File className="w-4 h-auto" />
                ) : type === "Image" ? (
                  <ImageIcon className="w-4 h-auto" />
                ) : type === "Note" ? (
                  <NoteIcon />
                ) : getFaviconUrl(url) ? (
                  <img
                    src={getFaviconUrl(url)}
                    alt="Website Logo"
                    className="w-4  p-0.5 "
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <Globe size={14} />
                )}
              </div>

              <h2 className="text-sm  font-medium text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px]">
                {title}
              </h2>
            </div>
          </div>
          
          <nav className="flex items-end gap-1 justify-between rounded-sm p-1 m-1">
            <div className="gap-1 flex items-center justify-center">
              {type == "Url" ? (
                <button className="rounded-lg p-1 text-gray-600 border-gray-400/50 hover:shadow hover:dark:bg-white hover:bg-gray-200 hover:inset-shadow-indigo-500 transition duration-100">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ShareIcon />
                  </a>
                </button>
              ) : (
                <button
                  onClick={setNotes}
                  className="rounded-lg p-1 text-gray-600 border-gray-400/50 hover:shadow hover:dark:bg-white hover:bg-gray-200 hover:inset-shadow-indigo-500 transition duration-100"
                >
                  <Expand />
                </button>
              )}
              {setdelete && (
                <button
                  onClick={setdelete}
                  className="rounded-lg p-1 text-gray-600 border-gray-400/50 hover:shadow hover:dark:bg-white hover:bg-gray-200 hover:inset-shadow-indigo-500 duration-100"
                >
                  <Delete />
                </button>
              )}
            </div>
            <p className="text-gray-500 text-xs">{time}</p>
          </nav>
        </div>
      </div>
    </article>
  );
};

export default Card;
