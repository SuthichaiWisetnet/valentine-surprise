"use client";

import { useEffect, useRef } from "react";

export default function FloatingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hearts = ["❤️", "💕", "💖", "💗", "💓", "💞", "💘", "🌹"];

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 1.5 + 0.5 + "rem";
      heart.style.animationDuration = Math.random() * 5 + 5 + "s";
      heart.style.opacity = Math.random() * 0.5 + 0.3;
      container.appendChild(heart);

      setTimeout(() => heart.remove(), 10000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="hearts-container" />;
}
