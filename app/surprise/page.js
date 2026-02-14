"use client";

import { useState } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";
import { createConfetti } from "../components/effects";

function GiftBox({ color, ribbonColor, message, title, delay }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    createConfetti();
  };

  return (
    <div
      className="text-center animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="cursor-pointer mx-auto relative group"
        onClick={handleOpen}
        style={{ width: "220px", height: "220px" }}
      >
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/10 blur-sm rounded-[50%]"></div>

        {/* Gift Box Base - Kraft Paper Style */}
        <div
          className="absolute bottom-0 w-full h-40 shadow-lg transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundColor: color,
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 10px, transparent 10px, transparent 20px)",
            borderRadius: "4px",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {/* Vertical Ribbon - Washi Tape */}
          <div
            className="absolute w-10 h-full left-1/2 -translate-x-1/2"
            style={{
              backgroundColor: ribbonColor,
              opacity: 0.9,
              boxShadow: "0 0 2px rgba(0,0,0,0.1)",
            }}
          />
          {/* Horizontal Ribbon - Washi Tape */}
          <div
            className="absolute h-10 w-full top-1/2 -translate-y-1/2"
            style={{
              backgroundColor: ribbonColor,
              opacity: 0.9,
              boxShadow: "0 0 2px rgba(0,0,0,0.1)",
            }}
          />

          {/* Content */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              isOpen
                ? "opacity-100 -translate-y-16 scale-110"
                : "opacity-0 scale-50"
            }`}
          >
            <div className="bg-white p-3 rotate-3 shadow-md border border-gray-100">
              <span className="text-5xl">{message}</span>
            </div>
          </div>
        </div>

        {/* Gift Box Lid - Removable */}
        <div
          className={`absolute bottom-36 w-56 -left-1 h-12 shadow-md transition-all duration-700 ease-out z-20 ${
            isOpen
              ? "-rotate-12 -translate-y-32 translate-x-10 opacity-0"
              : "group-hover:-translate-y-1"
          }`}
          style={{
            backgroundColor: color,
            borderRadius: "4px",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <div className="absolute w-full h-full bg-black/5 rounded-sm"></div>{" "}
          {/* Texture overlay */}
          <div
            className="absolute h-full w-10 left-1/2 -translate-x-1/2"
            style={{
              backgroundColor: ribbonColor,
              opacity: 0.9,
            }}
          />
        </div>

        {/* Bow - Hand-tied look */}
        <div
          className={`absolute -top-4 left-1/2 -translate-x-1/2 text-6xl z-30 transition-all duration-700 ${
            isOpen
              ? "-translate-y-40 rotate-12 opacity-0"
              : "animate-float-fast group-hover:scale-110"
          }`}
        >
          🎀
        </div>
      </div>

      {/* Title Tag */}
      <div className="mt-8 relative inline-block transform -rotate-1">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-200 rounded-full z-[-1]"></div>{" "}
        {/* String hole simulation */}
        <p className="text-slate-700 font-handwriting text-xl bg-white px-4 py-2 shadow-sm border border-gray-200">
          {isOpen ? title : "เปิดเลย! 👇"}
        </p>
      </div>
    </div>
  );
}

export default function SurprisePage() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({
    emoji: "",
    title: "",
    content: "",
  });

  const gifts = [
    {
      color: "#d4a373", // Kraft Brown
      ribbonColor: "#ffafcc", // Pink Tape
      message: "💕",
      title: "รักหนูนะ!",
    },
    {
      color: "#eaddcf", // Light Beige
      ribbonColor: "#a2d2ff", // Blue Tape
      message: "🌹",
      title: "ดอกไม้ให้หนู!",
    },
    {
      color: "#ccd5ae", // Sage Green
      ribbonColor: "#e9c46a", // Yellow Tape
      message: "💖",
      title: "หัวใจทั้งดวง!",
    },
  ];

  const openSpecialGift = () => {
    setCurrentMessage({
      emoji: "🎉💕🎉",
      title: "Happy Valentine's Day!",
      content: `หนูคือของขวัญที่ดีที่สุด...\nในชีวิตของพี่ ❤️`,
    });
    setShowMessage(true);
    createConfetti();
  };

  return (
    <main className="relative z-10 min-h-screen px-4 py-12 pb-24 overflow-hidden">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-16 animate-fade-in-up md:pt-8 bg-white/60 p-6 w-fit mx-auto rounded-sm shadow-sm transform rotate-1 border border-slate-200">
        <h1 className="text-5xl md:text-7xl font-dancing font-bold text-rose-800 mb-2">
          Surprise Box 🎁
        </h1>
        <p className="text-slate-600 font-handwriting text-xl">
          กล่องของขวัญแด่คนพิเศษ
        </p>
      </div>

      {/* Gift Boxes Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-12 justify-items-center mb-20 px-4">
        {gifts.map((gift, i) => (
          <GiftBox key={i} {...gift} delay={i * 0.2} />
        ))}
      </div>

      {/* Special Surprise Section */}
      <div className="max-w-xl mx-auto text-center relative mt-16 animate-fade-in-up">
        {/* Washi Tape Decoration */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-6 bg-pink-200/70 rotate-3 z-10"></div>

        <div className="paper-card p-12 bg-white rotate-1">
          <h2 className="text-4xl font-dancing font-bold text-rose-800 mb-8">
            ✨ Special Gift ✨
          </h2>

          {/* Big Gift Box */}
          <div className="flex justify-center mb-10 mt-8 relative">
            <div
              className="cursor-pointer transform hover:scale-110 transition-transform duration-500"
              onClick={openSpecialGift}
            >
              <div className="relative group w-64 h-64">
                {/* Box */}
                <div className="absolute bottom-0 w-full h-48 bg-rose-400 rounded-sm shadow-lg border-2 border-rose-300">
                  <div className="absolute w-12 h-full left-1/2 -translate-x-1/2 bg-white/30 border-l border-r border-white/40"></div>
                  <div className="absolute h-12 w-full top-1/2 -translate-y-1/2 bg-white/30 border-t border-b border-white/40"></div>
                </div>

                {/* Lid */}
                <div className="absolute bottom-40 w-[110%] -left-[5%] h-16 bg-rose-500 rounded-sm shadow-md border-2 border-rose-400 group-hover:-translate-y-4 transition-transform duration-500"></div>

                {/* Bow */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-8xl z-10 animate-heartbeat text-rose-600 drop-shadow-md">
                  🎁
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-500 font-handwriting text-lg">
            ( กดเพื่อเปิดดูความในใจ )
          </p>
        </div>
      </div>

      {/* Message Modal - Note Card Style */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
          <div className="bg-white p-8 md:p-12 shadow-2xl max-w-lg w-full relative transform rotate-1 border-2 border-gray-100">
            {/* Tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 -rotate-2 shadow-sm"></div>

            <div className="text-center">
              <div className="text-6xl mb-6 animate-bounce">🎉</div>
              <h3 className="text-4xl font-dancing font-bold text-rose-800 mb-6">
                {currentMessage.title}
              </h3>
              <div className="p-6 bg-rose-50 rounded-sm border border-dashed border-rose-200 mb-8">
                <p className="text-slate-700 text-xl font-handwriting whitespace-pre-line leading-loose">
                  {currentMessage.content}
                </p>
              </div>
              <button
                onClick={() => setShowMessage(false)}
                className="px-8 py-3 bg-rose-400 text-white font-prompt rounded-full hover:bg-rose-500 shadow-md transition-transform transform hover:scale-105"
              >
                รักพี่เหมือนกัน 💕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Back Button */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-white hover:bg-rose-50 text-rose-600 p-3 rounded-full shadow-md border-2 border-rose-200 transition-all hover:scale-110 group opacity-90 hover:opacity-100"
      >
        <span className="text-2xl block group-hover:-translate-x-1 transition-transform">
          🏠
        </span>
      </Link>
    </main>
  );
}
