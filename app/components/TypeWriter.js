"use client";

import { useState, useEffect } from "react";

export default function TypeWriter({ texts, speed = 80, pause = 4000 }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentText = texts[currentIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
          setDisplayText("");
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, pause);
        return () => clearTimeout(timeout);
      }
    } else {
      setIsTyping(true);
    }
  }, [displayText, currentIndex, isTyping, texts, speed, pause]);

  return (
    <span className="border-r-2 border-pink-400 pr-1 animate-pulse">
      {displayText}
    </span>
  );
}
