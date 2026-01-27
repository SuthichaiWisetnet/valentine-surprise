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
  const [letterText, setLetterText] = useState(`สวัสดีที่รัก,

นี่คือจดหมายที่เขียนจากใจ อยากบอกว่ารักเธอมากแค่ไหน...

ตั้งแต่วันที่เราเจอกัน ชีวิตก็เปลี่ยนไป ทุกวันที่มีเธออยู่ข้างๆ คือวันที่มีความสุขที่สุด

ขอบคุณที่เป็นเธอ ขอบคุณที่อยู่เคียงข้าง ขอบคุณที่รักกันมาตลอด

รักเธอนะ... ตลอดไป 💕`);

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
                ถึงคนที่รักที่สุด
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
              <p className="text-slate-500 font-prompt">ด้วยรักและคิดถึง</p>
              <p className="text-3xl font-dancing text-rose-600 mt-2">
                จากคนที่รักเธอ 💕
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setIsEditing(true)}
              className="px-8 py-4 bg-rose-500 rounded-full text-white text-lg font-prompt shadow-md hover:bg-rose-600 hover:scale-105 transition"
            >
              ✍️ แก้ไขจดหมาย
            </button>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-rose-100">
            <h3 className="text-2xl font-dancing text-rose-800 text-center mb-6">
              ✍️ เขียนจดหมายรัก
            </h3>
            <textarea
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              rows={10}
              className="w-full p-4 rounded-xl bg-slate-50 text-slate-700 font-prompt text-lg focus:outline-none focus:ring-2 focus:ring-rose-200 border border-slate-200"
              placeholder="เขียนข้อความจากใจของคุณ..."
            />
            <div className="flex gap-4 mt-4 justify-center">
              <button
                onClick={() => {
                  setIsEditing(false);
                  createConfetti();
                }}
                className="px-6 py-3 bg-rose-500 rounded-full text-white font-prompt hover:bg-rose-600 hover:scale-105 transition shadow-md"
              >
                💾 บันทึก
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-slate-100 rounded-full text-slate-600 font-prompt hover:bg-slate-200 transition"
              >
                ยกเลิก
              </button>
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
