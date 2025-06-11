import Card from "../components/Card";
import { Modal } from "../components/Modal";
import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "../components/SideBar";
import SearchBox from "../components/SearchBox";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import axios from "axios";
import { Delete } from "../icons/Delete";
import CommonMondal from "../components/CommonMondal";
import { Copy, CopyCheck,  Link2Off,  Loader2 } from "lucide-react";
import LinkIcon from "@mui/icons-material/Link";
import { Button } from "../components/Button";
import clsx from "clsx";
import { ArrowBack } from "@mui/icons-material";
import { PushButtons } from "../components/PushButtons";
import TypewriterEffect from "../components/TypewriterEffect";
import Toast from "../components/Toast";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  setModalOpen,
  setShareModalOpen,
  setPanelOpen,
  setShareUrl,
  setIsSharing,
} from "../store/features/uiSlice";
import LoadingCard from "../components/LoadingCard";

const API_URL = import.meta.env.VITE_API_URL;

export function Dashboard() {
  const { hash } = useParams();
  const [isSharedView] = useState(!!hash);
  const [sharedUsername, setSharedUsername] = useState("");
  const [Note, setNote] = useState(false);
  const [answer, setAnswer] = useState("");
  const [searchloading, setsearchLoading] = useState(false);
  const [Copen, setCOpen] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<
    {
      _id: string;
      type: string;
      link: string;
      title: string;
      content: string;
      createdAt: Date;
      imageUrl?: string;
    }[]
  >([]);
  const [page, setPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [searchText, setSearchText] = useState("");
  const [toastLoading, setToastLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get UI state from Redux
  const isModalOpen = useAppSelector((state) => state.ui.isModalOpen);
  const isShareModalOpen = useAppSelector((state) => state.ui.isShareModalOpen);
  const isPanelOpen = useAppSelector((state) => state.ui.isPanelOpen);
  const shareUrl = useAppSelector((state) => state.ui.shareUrl);
  const isSharing = useAppSelector((state) => state.ui.isSharing);
  const dispatch = useAppDispatch();

  const fetchContent = useCallback(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    axios
      .get(`${API_URL}/api/v1/content`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setContent(
          response.data.content.map(
            (item: {
              _id: string;
              type: string;
              link: string;
              title: string;
              content: string;
              createdAt: string;
            }) => ({
              ...item,
              createdAt: new Date(item.createdAt),
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const fetchSharedContent = useCallback(() => {
    if (!hash) return;
    setIsLoading(true);

    axios
      .get(`${API_URL}/api/v1/share/${hash}`, {})
      .then((response) => {
        setContent(
          response.data.content.map(
            (item: {
              _id: string;
              type: string;
              link: string;
              title: string;
              content: string;
              createdAt: string;
            }) => ({
              ...item,
              createdAt: new Date(item.createdAt),
            })
          )
        );
        setSharedUsername(response.data.username);
      })
      .catch((error) => {
        console.error("Error fetching shared content:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [hash]);

  useEffect(() => {
    if (isSharedView) {
      fetchSharedContent();
    } else {
      fetchContent();
    }
  }, [isSharedView, fetchContent, fetchSharedContent]);

  const cardsData = content.map(
    ({ _id, type, link, title, content, createdAt, imageUrl }) => ({
      id: _id,
      type,
      link,
      title,
      content,
      createdAt,
      imageUrl,
      
    })
  );

  const StopShare = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/share`,
        { share: false },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      dispatch(setShareUrl(res.data.hash));
      dispatch(setIsSharing(false));
    } catch (error) {
      console.log("error while stopping share", error);
      return;
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedCardId(id);
    setCOpen(true);
  };
  const handleNotesOpen = (id: string) => {
    const noteContent = content.find((item) => item._id === id);
    if (noteContent) {
      setSelectedNote({
        title: noteContent.title,
        content: noteContent.content,
      });
      setNote(true);
    }
  };

  const copyLink = async () => {
    setLoading(true);
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
    setTimeout(() => {
      setLoading(false);
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
        setContent((prevContent) =>
          prevContent.filter((item) => item._id !== selectedCardId)
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

  const filteredCards = (() => {
    let data = cardsData;

    if (filter === "Date" || answer) {
      data = data.slice().reverse();
    }

    return filter && filter !== "Date"
      ? data.filter((card) => card.type === filter)
      : data;
  })();

  const handleContentAdded = (newContent: {
    _id: string;
    type: string;
    link: string;
    title: string;
    content: string;
    createdAt: Date;
    imageUrl?: string;
  }) => {
    setContent((prevContent) => [...prevContent, newContent]);
    fetchContent();
  };

  useEffect(() => {
    if (isModalOpen || Copen || isShareModalOpen || isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isShareModalOpen, Copen, isPanelOpen]);

  function greetings() {
    const time = new Date().getHours();
    if (time >= 5 && time < 12) return "Good Morning";
    else if (time >= 12 && time < 17) return "Good Afternoon";
    else if (time >= 17 && time < 22) return "Good Evening";
    else return "Late Night";
  }

  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center">
        <article className="flex flex-col justify-center items-center max-w-6xl w-full px-4">
          <Sidebar
            openpanel={isPanelOpen}
            closepanel={() => dispatch(setPanelOpen(false))}
          />

          <div
            className={`flex flex-col justify-center items-center max-w-6xl w-full  ${
              isModalOpen || Copen || isShareModalOpen || isPanelOpen
                ? "blur-[1.5px]"
                : ""
            }`}
          >
            <Header isSharedView={isSharedView} />

            <Footer />
            <h1
              className={clsx(
                "text-2xl md:text-3xl  dark:text-zinc-900 font-recoleta text-gray-100 transition-all duration-1000",
                searchloading || answer
                  ? "opacity-0 -translate-y-10 h-0 mt-0"
                  : "opacity-100 translate-y-0 h-auto mt-10"
              )}
            >
              {isSharedView
                ? `* Shared Brain From ${sharedUsername}`
                : greetings() +
                  ",\n" +
                  (localStorage.getItem("username") ||
                    "please login to continue")}
            </h1>
            {isSharedView && (
              <h4 className="text-black flex dark:text-zinc-200 dark:bg-zinc-800 font-poppins p-2 m-2 w-fit mx-auto rounded-lg  bg-gray-300  justify-center text-xs md:text-sm mb-4">
                Shared content cannot be deleted or edited
              </h4>
            )}
            <SearchBox
              setAnswer={setAnswer}
              setContent={setContent}
              setLoading={setsearchLoading}
              onChipSelect={handleChipSelect}
              searchText={searchText} 
              setSearchText={setSearchText}
            />
            {searchloading ? (
              <div className="text-gray-300 dark:text-gray-600 relative flex justify-center items-center">
                <Loader2 className="h-12 duration-500 text-gray-100 w-12 animate-spin" />
                <img
                  src="/logo.png"
                  className="w-5 absolute rounded-full  animate-pulse transition-all duration-500 ease-in-out hover:rotate-[360deg]"
                  alt="Logo"
                  style={{ 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)' 
                  }}
                />
              </div>
            ) : (
              <section className="flex flex-col gap-4 w-full max-w-6xl px-4 justify-center items-center">
                {answer && (
                  <div className="w-full flex justify-start">
                    <PushButtons
                      variant="opaque2"
                      icon={<ArrowBack style={{ padding: "3px" }} />}
                      size="sm"
                      onClick={() => {
                        fetchContent();
                        setAnswer("");
                        setSearchText(""); // Add this linesetSearchText("");  // Add this line
                      }}
                    />
                  </div>
                )}
                {answer && (
                  <div className="w-full flex flex-col gap-5">
                    <div className="w-full rounded-md bg-zinc-700/30 dark:bg-zinc-400/30 p-4 md:p-8 shadow-xl shadow-black/30 dark:shadow-zinc-300">
                      <p className="text-gray-300 dark:text-zinc-900 whitespace-pre-wrap text-sm md:text-base">
                        <TypewriterEffect text={answer} />
                      </p>
                    </div>
                  </div>
                )}
                {answer && (
                  <p className="text-gray-300 dark:text-zinc-900 font-semibold w-full text-lg md:text-xl mt-2">
                    Relevant Knowledge from Your Memory :
                  </p>
                )}
              </section>
            )}
            <section
              className={`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 max-w-[95%] mx-auto p-3 sm:p-5 rounded-2xl bg-zinc-600/3`}
            >
              {isLoading ? (
                // Loading skeleton cards
                Array.from({ length: 12 }).map((_, index) => (
                  <LoadingCard key={index} className="" />
                ))
              ) : filteredCards.length > 0 ? (
                [...filteredCards]
                  .reverse()
                  .slice(0, page * 12)
                  .map((card, index) => (
                    <div key={card.id} className="break-inside-avoid mb-4">
                      <Card
                        title={card.title}
                        type={card.type}
                        content={card.content}
                        url={card.link}
                        imageUrl={card.imageUrl}
                        setdelete={
                          !isSharedView
                            ? () => handleDeleteClick(card.id)
                            : undefined
                        }
                        setNotes={() => handleNotesOpen(card.id)}
                        index={index}
                        time={(() => {
                          try {
                            const date = new Date(card.createdAt);
                            if (isNaN(date.getTime())) {
                              return 'Invalid date';
                            }
                            return new Intl.DateTimeFormat('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                          
                            }).format(date);
                          } catch (error) {
                            console.error('Date parsing error:', error);
                            return 'Invalid date';
                          }
                        })()}
                      />
                    </div>
                  ))
              ) : (
                <div className="flex items-center justify-center md:h-80  md:w-96 text-gray-500">
                  No content found. Add some content to get started.
                </div>
              )}
            </section>
            <div
              className={`flex w-full h-fit  mb-20  justify-center m-0 ${
                page * 12 >= filteredCards.length
                  ? "opacity-30 pointer-events-none"
                  : ""
              } ${filteredCards.length == 0 ? "hidden" : "block"}`}
            >
              <Button
                variant={"secondary"}
                children={"Load More"}
                size={"sm"}
                onClick={() => setPage(page + 1)}
              />
            </div>
          </div>

          <CommonMondal
            Copen={Copen}
            onClose={() => {
              setCOpen(false);
            }}
            Message={
              <div className="flex  flex-col justify-center items-center gap-1">
                <Delete size={5} color="red" />
                <p className="text-sm text-center text-gray-500 font-poppins font-normal p-2">
                  {" "}
                  <span className="text-lg text-black">
                    You're about to delete this Memory.
                  </span>{" "}
                  <br />
                  Once deleted, it will not show up in the search results.
                </p>
              </div>
            }
            ButtonMessage={
              loading ? (
                <div className="flex gap-2  items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" /> Deleting...
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                <><Delete size={4} color="white"/> Delete</>
                </div>
              )
            }
            WrongButtonMessage={"Cancel"}
            onConfirm={deleteCard}
            loading={loading}
            variant={"normal"}
            isDanger={true}
          />

          <CommonMondal
            onClose={() => {
              dispatch(setShareModalOpen(false));
              dispatch(setIsSharing(true));
            }}
            Message={<div className="flex  flex-col justify-center items-center gap-1">
              <LinkIcon className="w-12 h-12 -rotate-45" />
              <p className="text-sm text-center text-gray-500 font-poppins font-normal p-2">
                {" "}
                <span className="text-lg text-black">
                Share your brain with others
                </span>{" "}
                <br />
                Copy the link below to allow others to view your shared content.
              </p>
            </div>}
            Message2={shareUrl}
            ButtonDisabled={!isSharing}
            ButtonMessage={
              loading ? (
                <div className="flex items-center gap-2">
                  <CopyCheck size={16} />
                  Copied
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Copy size={16} />
                  Copy
                </div>
              )
            }
            WrongButtonMessage={ <div className="flex items-center gap-2">
              <Link2Off size={16} />
              Stop Sharing
            </div>}
            WrongButtonDisabled={!isSharing}
            onConfirm={copyLink}
            onWrongButtonClick={() => {
              StopShare();
              setTimeout(() => {
                dispatch(setShareModalOpen(false));
                dispatch(setIsSharing(true));
              }, 2000);
            }}
            loading={loading}
            Copen={isShareModalOpen}
            variant={"normal"}
          />
          <CommonMondal
            onClose={() => {
              setNote(false);
              setSelectedNote(null);
            }}
            Message={selectedNote?.title || ""}
            Message2={selectedNote?.content || ""}
            loading={loading}
            Copen={Note}
            variant={"fullscreen"}
          />

          <Modal
            open={isModalOpen}
            onClose={() => dispatch(setModalOpen(false))}
            onContentAdded={handleContentAdded}
            setToastLoading={setToastLoading}
          />
          <Toast loading={toastLoading} />
        </article>
      </div>
    </main>
  );
}
