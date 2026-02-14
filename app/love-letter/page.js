"use client";

import { useState } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";

export default function LoveLetterPage() {
  const [isOpen, setIsOpen] = useState(false);

  // NOTE: Read-only letter content
  const letterText = `ถึง หนู,

สุขสันต์วันวาเลนไทน์นะครับ 💕

ขอบคุณที่เป็นความสุขของพี่ ขอบคุณที่อยู่ข้างๆ กันเสมอ
ไม่ว่าเวลาจะผ่านไปนานแค่ไหน พี่ก็ยังรักหนูเหมือนวันแรก
และจะรักมากขึ้นทุกๆ วัน

ขอให้เรามีความสุขแบบนี้ด้วยกันตลอดไปนะ
รักหนูที่สุดในโลก! ❤️

จาก พี่เอง`;

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24 flex flex-col items-center justify-center overflow-hidden">
      <FloatingHearts />

      <h1 className="text-4xl md:text-6xl font-dancing font-bold text-rose-800 mb-12 drop-shadow-sm rotate-2 animate-float-slow">
        💌 Love Letter
      </h1>

      <div className="relative w-full max-w-lg perspective-1000">
        <div
          className={`relative w-full transition-all duration-1000 transform-style-3d cursor-pointer ${
            isOpen ? "translate-y-24" : "translate-y-0"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Envelope Body - Kraft Paper */}
          <div className="absolute bottom-0 w-full h-48 bg-kraft-brown shadow-md z-20 rounded-b-md border border-[#c59260]"></div>

          {/* Envelope Flap */}
          <div
            className={`absolute top-0 w-full h-48 bg-[#bc8a5f] origin-top transition-all duration-1000 z-30 rounded-t-md border border-[#a67c52] ${
              isOpen ? "rotate-x-180 z-10" : "rotate-x-0 delay-500"
            }`}
            style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
          ></div>

          {/* Letter Paper - Lined Paper Style */}
          <div
            className={`relative bg-cream-paper p-8 pb-16 mx-auto w-[90%] shadow-sm transition-all duration-1000 ease-in-out z-10 ${
              isOpen
                ? "-translate-y-48 h-auto opacity-100 rotate-1 shadow-lg border border-gray-100"
                : "translate-y-10 h-40 opacity-0"
            }`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(#fdfbf7 0px, #fdfbf7 24px, #a2d2ff 25px)",
              backgroundAttachment: "local",
            }}
          >
            {/* Washi Tape on Paper */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/60 rotate-2 opacity-80"></div>

            <p className="font-handwriting text-xl md:text-2xl text-slate-700 whitespace-pre-wrap leading-loose">
              {letterText}
            </p>

            {/* Stamp */}
            <div className="absolute bottom-4 right-4 text-rose-300 opacity-50 transform -rotate-12 border-2 border-rose-300 rounded-full p-2 w-20 h-20 flex items-center justify-center font-dancing text-xl">
              Love
            </div>
          </div>

          {!isOpen && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 animate-pulse text-white font-prompt bg-rose-500/80 px-4 py-1 rounded-full text-sm">
              แตะเพื่อเปิดอ่าน
            </div>
          )}
        </div>
      </div>

      {/* Decorative items around */}
      <div className="fixed bottom-10 left-10 text-6xl opacity-20 -rotate-12 pointer-events-none hidden md:block">
        🌹
      </div>

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
