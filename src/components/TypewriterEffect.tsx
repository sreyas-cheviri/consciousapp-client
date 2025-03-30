// import React from 'react'

import { useEffect, useState } from "react";

export default function TypewriterEffect({ text }: { text: string }) {
  const [displayText, SetDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        SetDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 3);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return <div>{displayText}</div>;
}
