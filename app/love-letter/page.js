"use client";

import { useState } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";
import { createConfetti } from "../components/effects";

export default function LoveLetterPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [letterText, setLetterText] = useState(`ถึง หนู,
  
  พี่เขียนจดหมายฉบับนี้ขึ้นมา เพราะอยากบอกความในใจที่บางทีพี่อาจจะพูดออกมาไม่เก่ง แต่ทุกตัวอักษรมาจากใจของพี่จริง ๆ
  
  ขอบคุณหนูนะที่เข้ามาเป็นเรื่องราวดี ๆ ในชีวิตพี่ ตั้งแต่มีหนูอยู่ข้าง ๆ โลกของพี่ก็สดใสขึ้นเยอะเลย หนูรู้ไหมว่ารอยยิ้มของหนูคือกำลังใจสำคัญของพี่ เวลาเหนื่อย ๆ แค่ได้เห็นหน้าหนู หรือได้ยินเสียงหนู พี่ก็หายเหนื่อยแล้ว
  
  ขอบคุณที่เข้าใจและอยู่เคียงข้างกันมาตลอด ไม่ว่าจะเจอกับอะไร พี่อุ่นใจเสมอที่มีหนู พี่สัญญาว่าจะดูแลหนูให้ดีที่สุด จะทำให้หนูยิ้มได้ในทุก ๆ วัน และจะรักหนูให้มากขึ้นในทุก ๆ วินาที
  
  รักหนูที่สุดนะครับ 💕`);

  const openEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setShowFullLetter(true);
      createConfetti();
    }, 1500);
  };

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24 flex flex-col items-center justify-center overflow-hidden">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up relative z-20">
        <h1 className="text-5xl md:text-7xl font-dancing font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-4">
          💌 <span className="text-gradient drop-shadow-none">จดหมาย</span>รัก
        </h1>
        <p className="text-white/90 font-prompt text-xl drop-shadow-md">
          {!isOpen ? "แตะที่ซองจดหมายเพื่อเปิดอ่าน" : "ความในใจจากพี่"}
        </p>
      </div>

      {/* Envelope */}
      {!showFullLetter && (
        <div
          className="cursor-pointer animate-float mb-8 relative z-10 group"
          onClick={openEnvelope}
        >
          <div className="relative w-80 h-56 perspective-1000 transform transition-transform duration-500 group-hover:scale-105">
            {/* Envelope Shadow/Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-rose-500/30 blur-2xl rounded-full -z-10 animate-pulse-glow" />

            {/* Envelope Back */}
            <div className="absolute inset-0 bg-linear-to-br from-pink-400 to-rose-600 rounded-xl shadow-2xl border border-white/20" />

            {/* Envelope Flap */}
            <div
              className={`absolute top-0 left-0 right-0 h-28 bg-linear-to-br from-rose-400 to-pink-500 rounded-t-xl origin-top transition-all duration-1000 ease-in-out z-20 ${
                isOpen ? "-rotate-x-180 z-0" : "z-20 shadow-lg"
              }`}
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Inner Flap Color (visible when open) */}
              <div className="absolute inset-0 bg-rose-700 opacity-20" />
            </div>

            {/* Letter Preview Inside */}
            <div
              className={`absolute bottom-2 left-2 right-2 h-48 bg-white rounded-lg shadow-inner transition-all duration-1000 delay-500 z-10 ${
                isOpen ? "-translate-y-32 scale-95" : "scale-100"
              }`}
            >
              <div
                className={`p-4 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
              >
                <div className="w-full h-2 bg-slate-200 mb-2 rounded" />
                <div className="w-3/4 h-2 bg-slate-200 mb-2 rounded" />
                <div className="w-full h-2 bg-slate-200 mb-2 rounded" />
                <p className="text-rose-700 text-xs font-prompt mt-4 text-center">
                  อ่านข้อความข้างใน...
                </p>
              </div>
            </div>

            {/* Envelope Front (Bottom Pockets) */}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-20 overflow-hidden rounded-b-xl pointer-events-none">
              <div
                className="absolute bottom-0 left-0 w-full h-full bg-linear-to-tl from-rose-600 to-pink-500"
                style={{
                  clipPath: "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)",
                }}
              ></div>
            </div>

            {/* Seal */}
            {!isOpen && (
              <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl z-30 animate-heartbeat text-red-600 drop-shadow-lg">
                <div className="relative">
                  🛑
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-yellow-200">
                    ❤
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Letter Modal */}
      {showFullLetter && !isEditing && (
        <div className="max-w-2xl mx-auto animate-fade-in-up w-full relative z-20">
          <div className="glass p-1 md:p-2 rounded-3xl relative shadow-[0_0_60px_rgba(255,107,157,0.4)]">
            {/* Sparkles */}
            <div className="absolute -top-6 -left-6 text-4xl animate-bounce">
              ✨
            </div>
            <div
              className="absolute -bottom-6 -right-6 text-4xl animate-bounce"
              style={{ animationDelay: "1s" }}
            >
              ✨
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-12 relative border border-white/40 shadow-inner overflow-hidden">
              {/* Paper Texture Effect */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Letter Header */}
              <div className="text-center mb-8 relative">
                <div className="text-6xl mb-4 animate-bounce">💌</div>
                <h2 className="text-4xl font-dancing font-bold text-rose-800">
                  ถึงหนูที่รัก
                </h2>
                <div className="w-1/2 h-0.5 bg-rose-200 mx-auto mt-4" />
              </div>

              {/* Letter Body */}
              <div className="text-slate-700 relative z-10">
                <p className="text-lg md:text-xl font-prompt leading-relaxed whitespace-pre-line tracking-wide">
                  {letterText}
                </p>
              </div>

              {/* Signature */}
              <div className="text-right mt-12 relative z-10">
                <p className="text-slate-500 font-prompt italic">รักเสมอ</p>
                <p className="text-4xl font-dancing font-bold text-rose-600 mt-2 transform -rotate-2 inline-block">
                  จากพี่วุ้น 💕
                </p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setIsEditing(true)}
              className="px-8 py-3 bg-white/20 hover:bg-white/30 border border-white/40 text-white rounded-full font-prompt backdrop-blur-sm transition flex items-center justify-center gap-2 mx-auto"
            >
              <span>✍️</span> แก้ไขจดหมาย
            </button>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <div className="max-w-2xl mx-auto w-full animate-fade-in-up z-20">
          <div className="glass p-6 md:p-8 shadow-2xl">
            <h3 className="text-3xl font-dancing text-rose-800 text-center mb-6 font-bold">
              ✍️ เขียนจดหมายรัก
            </h3>
            <textarea
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              rows={10}
              className="w-full p-6 rounded-2xl bg-white/80 text-slate-700 font-prompt text-lg focus:outline-none focus:ring-4 focus:ring-rose-200 border border-white/50 shadow-inner"
              placeholder="เขียนข้อความจากใจของคุณ..."
            />
            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={() => {
                  setIsEditing(false);
                  createConfetti();
                }}
                className="px-8 py-3 bg-rose-500 rounded-full text-white font-prompt hover:bg-rose-600 hover:scale-105 transition shadow-lg font-semibold"
              >
                💾 บันทึก
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-8 py-3 bg-slate-200 rounded-full text-slate-600 font-prompt hover:bg-slate-300 transition font-semibold"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="mt-12 inline-flex items-center gap-2 text-white/80 hover:text-white transition font-prompt bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30"
      >
        <span>🏠</span> กลับหน้าหลัก
      </Link>
    </main>
  );
}
