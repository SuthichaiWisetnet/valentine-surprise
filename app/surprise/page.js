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
        className="cursor-pointer mx-auto relative group perspective-1000"
        onClick={handleOpen}
        style={{ width: "200px", height: "200px" }}
      >
        {/* Glow Effect behind box */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-${color}/50 blur-2xl rounded-full -z-10 transition-all duration-500 ${isOpen ? "scale-150 opacity-80" : "scale-100 opacity-40 group-hover:scale-125 group-hover:opacity-60"}`}
          style={{ backgroundColor: color }}
        />

        {/* Gift Box Base */}
        <div
          className="absolute bottom-0 w-full h-36 rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}cc)`,
            boxShadow: `0 10px 30px -5px ${color}80`,
          }}
        >
          {/* Vertical Ribbon */}
          <div
            className="absolute w-8 h-full left-1/2 -translate-x-1/2 shadow-inner"
            style={{
              background: `linear-gradient(to right, ${ribbonColor}, #fff, ${ribbonColor})`,
            }}
          />
          {/* Horizontal Ribbon */}
          <div
            className="absolute h-8 w-full top-1/2 -translate-y-1/2 shadow-inner"
            style={{
              background: `linear-gradient(to bottom, ${ribbonColor}, #fff, ${ribbonColor})`,
            }}
          />
          {/* Content */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              isOpen
                ? "opacity-100 -translate-y-5 scale-125"
                : "opacity-0 scale-50"
            }`}
          >
            <span className="text-6xl drop-shadow-md animate-bounce">
              {message}
            </span>
          </div>
        </div>

        {/* Gift Box Lid */}
        <div
          className={`absolute bottom-32 w-52 -left-1.5 h-12 rounded-xl shadow-lg transition-all duration-700 origin-bottom ease-out z-20 ${
            isOpen
              ? "-rotate-x-120 -translate-y-12 opacity-0"
              : "group-hover:-translate-y-2"
          }`}
          style={{
            background: `linear-gradient(135deg, ${color}dd, ${color})`,
            boxShadow: `0 5px 15px -3px ${color}60`,
          }}
        >
          <div
            className="absolute h-full w-8 left-1/2 -translate-x-1/2 rounded-t-xl"
            style={{
              background: `linear-gradient(to right, ${ribbonColor}, #fff, ${ribbonColor})`,
            }}
          />
        </div>

        {/* Bow */}
        <div
          className={`absolute -top-8 left-1/2 -translate-x-1/2 text-6xl z-30 transition-all duration-700 ${
            isOpen
              ? "-translate-y-20 rotate-12 opacity-0 scale-150"
              : "animate-float-fast group-hover:scale-110"
          }`}
          style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }}
        >
          🎀
        </div>
      </div>
      <p className="text-rose-800 font-prompt mt-6 text-lg font-semibold bg-white/40 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
        {isOpen ? title : "แตะเพื่อเปิด"}
      </p>
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
      color: "#FF6B9D",
      ribbonColor: "#FFD700",
      message: "💕",
      title: "รักหนูนะ!",
    },
    {
      color: "#FFA500",
      ribbonColor: "#FF6B9D",
      message: "🌹",
      title: "ดอกกุหลาบให้หนู!",
    },
    {
      color: "#9B59B6",
      ribbonColor: "#FFD700",
      message: "💖",
      title: "หัวใจทั้งดวง!",
    },
  ];

  const openSpecialGift = () => {
    setCurrentMessage({
      emoji: "🎉💕🎉",
      title: "สุขสันต์วันวาเลนไทน์!",
      content: `หนูคือคนที่ทำให้ชีวิตของพี่มีความหมาย

ขอบคุณที่เข้ามาในชีวิต ขอบคุณที่รักกัน ขอบคุณที่อยู่ด้วยกันมาจนถึงวันนี้

สัญญาว่าจะรักพี่ตลอดไป... 💕

Happy Valentine's Day! 🌹❤️🌹`,
    });
    setShowMessage(true);
    createConfetti();
    setTimeout(() => createConfetti(), 500);
    setTimeout(() => createConfetti(), 1000);
    setTimeout(() => createConfetti(), 1500);
  };

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24 overflow-hidden">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up md:pt-8">
        <h1 className="text-5xl md:text-7xl font-dancing font-bold text-rose-800 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-4">
          🎁 <span className="text-gradient drop-shadow-none">เซอร์ไพรส์</span>
        </h1>
        <p className="text-rose-700 font-prompt text-xl bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full inline-block shadow-sm">
          ของขวัญแด่คนพิเศษ
        </p>
      </div>

      {/* Gift Boxes Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-20 md:gap-12 justify-items-center mb-20 px-4">
        {gifts.map((gift, i) => (
          <GiftBox key={i} {...gift} delay={i * 0.2} />
        ))}
      </div>

      {/* Special Surprise Section */}
      <div className="max-w-2xl mx-auto text-center relative mt-16 animate-fade-in-up">
        {/* Background Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-rose-500/20 blur-[80px] rounded-full -z-10 animate-pulse-glow" />

        <h2 className="text-4xl font-dancing font-bold text-rose-800 mb-8 drop-shadow-sm">
          ✨ เซอร์ไพรส์พิเศษ ✨
        </h2>

        {/* Big Gift Box */}
        <div className="flex justify-center mb-10 mt-16 relative">
          <div
            className="cursor-pointer transform hover:scale-110 transition-transform duration-500"
            onClick={openSpecialGift}
          >
            <div className="relative group w-60 h-60">
              {/* Gift Box Base */}
              <div className="absolute bottom-0 w-full h-44 rounded-2xl shadow-2xl bg-linear-to-br from-pink-500 to-rose-600 border-2 border-white/20">
                <div className="absolute w-10 h-full left-1/2 -translate-x-1/2 bg-yellow-400 shadow-lg" />
                <div className="absolute h-10 w-full top-1/2 -translate-y-1/2 bg-yellow-400 shadow-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl animate-pulse">🎁</span>
                </div>
              </div>

              {/* Lid */}
              <div className="absolute bottom-40 w-64 -left-2 h-16 rounded-xl shadow-xl bg-linear-to-br from-rose-600 to-pink-500 border-2 border-white/20 group-hover:-translate-y-4 transition-transform duration-500">
                <div className="absolute h-full w-10 left-1/2 -translate-x-1/2 bg-yellow-400 rounded-t-xl shadow-inner" />
              </div>

              {/* Bow */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-7xl z-10 animate-heartbeat text-rose-500 drop-shadow-xl group-hover:scale-125 transition-transform duration-500">
                🎀
              </div>
            </div>
          </div>
        </div>

        <p className="text-rose-700 font-prompt text-lg bg-white/50 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm">
          กดเพื่อเปิดเซอร์ไพรส์พิเศษ!
        </p>
      </div>

      {/* Message Modal */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in-up">
          <div className="glass p-8 md:p-12 rounded-4xl text-center max-w-lg w-full relative overflow-hidden shadow-[0_0_50px_rgba(255,107,157,0.5)]">
            {/* Sparkles */}
            <div className="absolute top-4 left-4 text-3xl animate-bounce">
              ✨
            </div>
            <div
              className="absolute bottom-4 right-4 text-3xl animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              ✨
            </div>

            <div className="text-8xl mb-6 animate-heartbeat">🎉</div>
            <h3 className="text-4xl md:text-5xl font-dancing font-bold text-rose-800 mb-6 drop-shadow-sm">
              {currentMessage.title}
            </h3>
            <div className="bg-white/60 rounded-2xl p-6 shadow-inner mb-8">
              <p className="text-slate-700 text-lg md:text-xl font-prompt whitespace-pre-line leading-loose">
                {currentMessage.content}
              </p>
            </div>
            <button
              onClick={() => setShowMessage(false)}
              className="px-10 py-4 bg-linear-to-r from-rose-500 to-pink-500 rounded-full text-white font-prompt text-lg font-semibold hover:scale-105 hover:shadow-lg transition-all transform active:scale-95"
            >
              ปิดด้วยความรัก 💕
            </button>
          </div>
        </div>
      )}

      {/* Fixed Back Button */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-white/80 hover:bg-white text-rose-500 hover:text-rose-600 p-4 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:shadow-rose-200 border border-rose-100 group"
      >
        <span className="text-2xl block group-hover:-translate-x-1 transition-transform">
          🏠
        </span>
      </Link>
    </main>
  );
}
