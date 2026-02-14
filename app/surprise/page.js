"use client";

import { useState } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";
import { createConfetti } from "../components/effects";

function GiftBox({ color, ribbonColor, message, title }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    createConfetti();
  };

  return (
    <div className="text-center">
      <div
        className="cursor-pointer mx-auto relative"
        onClick={handleOpen}
        style={{ width: "200px", height: "200px", perspective: "1000px" }}
      >
        {/* Gift Box Base */}
        <div
          className="absolute bottom-0 w-full h-36 rounded-xl shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          }}
        >
          {/* Vertical Ribbon */}
          <div
            className="absolute w-8 h-full left-1/2 -translate-x-1/2"
            style={{ background: ribbonColor }}
          />
          {/* Horizontal Ribbon */}
          <div
            className="absolute h-8 w-full top-1/2 -translate-y-1/2"
            style={{ background: ribbonColor }}
          />
          {/* Content */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-4xl">{message}</span>
          </div>
        </div>

        {/* Gift Box Lid */}
        <div
          className={`absolute bottom-32 w-52 -left-1.5 h-12 rounded-xl shadow-lg transition-transform duration-1000 origin-bottom ${
            isOpen ? "-rotate-x-120 -translate-y-5" : ""
          }`}
          style={{
            background: `linear-gradient(135deg, ${color}dd, ${color})`,
          }}
        >
          <div
            className="absolute h-full w-8 left-1/2 -translate-x-1/2 rounded-t-xl"
            style={{ background: ribbonColor }}
          />
        </div>

        {/* Bow */}
        <div
          className={`absolute -top-8 left-1/2 -translate-x-1/2 text-5xl z-10 transition-all duration-500 ${
            isOpen ? "-translate-y-8 scale-125" : ""
          }`}
        >
          🎀
        </div>
      </div>
      <p className="text-slate-600 font-prompt mt-4 text-sm font-medium">
        {isOpen ? title : "กดเพื่อเปิด"}
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
  };

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-800 mb-2">
          🎁 <span className="text-gradient">เซอร์ไพรส์</span>
        </h1>
        <p className="text-slate-600 font-prompt">กดที่กล่องเพื่อเปิดดู!</p>
      </div>

      {/* Gift Boxes Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-12">
        {gifts.map((gift, i) => (
          <GiftBox key={i} {...gift} />
        ))}
      </div>

      {/* Special Surprise Section */}
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-dancing text-rose-800 mb-6">
          ✨ เซอร์ไพรส์พิเศษ
        </h2>

        {/* Big Gift Box */}
        <div className="flex justify-center mb-8">
          <div
            className="cursor-pointer transform scale-125 hover:scale-150 transition-transform"
            onClick={openSpecialGift}
          >
            <div
              className="relative"
              style={{ width: "200px", height: "200px" }}
            >
              {/* Gift Box Base */}
              <div className="absolute bottom-0 w-full h-36 rounded-xl shadow-xl bg-linear-to-br from-pink-400 to-rose-500">
                <div className="absolute w-8 h-full left-1/2 -translate-x-1/2 bg-yellow-400" />
                <div className="absolute h-8 w-full top-1/2 -translate-y-1/2 bg-yellow-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">🎁</span>
                </div>
              </div>
              {/* Lid */}
              <div className="absolute bottom-32 w-52 -left-1.5 h-12 rounded-xl shadow-lg bg-linear-to-br from-rose-500 to-pink-400">
                <div className="absolute h-full w-8 left-1/2 -translate-x-1/2 bg-yellow-400 rounded-t-xl" />
              </div>
              {/* Bow */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl z-10 animate-heartbeat text-rose-500">
                🎀
              </div>
            </div>
          </div>
        </div>

        <p className="text-slate-600 font-prompt">
          กดเพื่อเปิดเซอร์ไพรส์พิเศษ!
        </p>
      </div>

      {/* Message Modal */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md animate-bounce-in shadow-2xl border border-rose-100">
            <div className="text-6xl mb-4">{currentMessage.emoji}</div>
            <h3 className="text-3xl font-dancing text-rose-800 mb-4">
              {currentMessage.title}
            </h3>
            <p className="text-slate-600 text-lg font-prompt whitespace-pre-line leading-relaxed">
              {currentMessage.content}
            </p>
            <button
              onClick={() => setShowMessage(false)}
              className="mt-6 px-6 py-3 bg-rose-500 rounded-full text-white font-prompt hover:scale-105 transition shadow-md"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="mt-8 text-slate-500 hover:text-rose-500 transition font-prompt flex items-center justify-center gap-2"
      >
        🏠 กลับหน้าหลัก
      </Link>
    </main>
  );
}
