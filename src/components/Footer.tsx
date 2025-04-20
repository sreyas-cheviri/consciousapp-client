import { ArrowUp } from "lucide-react";
import { PushButtons } from "./PushButtons";
import { useEffect, useState } from "react";

const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 200);
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <>
      {showScroll && (
        <footer className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2  transition-all duration-300 ease-in-out">
          <PushButtons
            variant="bold"
            icon={<ArrowUp style={{ padding: "1px" }} />}
            size="md"
            onClick={handleScrollToTop}
          />
        </footer>
      )}
    </>
  );
};
