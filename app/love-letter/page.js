"use client";

import { useState } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";
import TypeWriter from "../components/TypeWriter";
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
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24 flex flex-col items-center justify-center">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-800 mb-2">
          💌 <span className="text-gradient">จดหมาย</span>รัก
        </h1>
        <p className="text-slate-600 font-prompt">
          {!isOpen ? "กดที่ซองจดหมายเพื่อเปิดอ่าน" : "จดหมายจากใจ"}
        </p>
      </div>

      {/* Envelope */}
      {!showFullLetter && (
        <div
          className="cursor-pointer animate-float mb-8"
          onClick={openEnvelope}
        >
          <div className="relative w-80 h-56">
            {/* Envelope Back */}
            <div className="absolute inset-0 bg-linear-to-br from-pink-400 to-rose-500 rounded-xl shadow-2xl" />

            {/* Envelope Flap */}
            <div
              className={`absolute top-0 left-0 right-0 h-28 bg-linear-to-br from-rose-400 to-pink-400 rounded-t-xl origin-top transition-transform duration-1000 ${
                isOpen ? "-rotate-x-180" : ""
              }`}
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Letter Inside */}
            <div
              className={`absolute bottom-2 left-2 right-2 h-44 bg-white rounded-lg shadow-inner transition-transform duration-1000 delay-500 ${
                isOpen ? "-translate-y-24" : ""
              }`}
            >
              <div
                className={`p-4 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
              >
                <p className="text-rose-700 text-sm font-prompt">
                  {letterText.substring(0, 50)}...
                </p>
              </div>
            </div>

            {/* Seal */}
            {!isOpen && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl z-20 animate-heartbeat text-rose-200">
                💝
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Letter */}
      {showFullLetter && !isEditing && (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 relative shadow-xl border border-rose-50">
            {/* Decorations */}
            <div className="absolute -top-4 -left-4 text-4xl animate-float">
              💕
            </div>
            <div
              className="absolute -top-4 -right-4 text-4xl animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              🌹
            </div>
            <div
              className="absolute -bottom-4 -left-4 text-4xl animate-float"
              style={{ animationDelay: "1s" }}
            >
              💖
            </div>
            <div
              className="absolute -bottom-4 -right-4 text-4xl animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              ✨
            </div>

            {/* Letter Header */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">💌</div>
              <h2 className="text-3xl font-dancing text-rose-800">
                ถึงหนูที่รัก
              </h2>
            </div>

            {/* Letter Body */}
            <div className="bg-white rounded-2xl p-6 md:p-8 text-slate-700 border border-slate-100 shadow-inner">
              <p className="text-lg font-prompt leading-loose whitespace-pre-line">
                {letterText}
              </p>
            </div>

            {/* Signature */}
            <div className="text-right mt-6">
              <p className="text-slate-500 font-prompt">รักเสมอ</p>
              <p className="text-3xl font-dancing text-rose-600 mt-2">
                จากพี่วุ้น 💕
              </p>
            </div>
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
