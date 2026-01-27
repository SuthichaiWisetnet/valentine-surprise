"use client";

import { useState, useEffect } from "react";
import FloatingHearts from "../components/FloatingHearts";
import Countdown from "../components/Countdown";

const loveReasons = [
  "รอยยิ้มของเธอทำให้วันของฉันสดใส",
  "เธอเข้าใจฉันมากกว่าใครๆ",
  "อยู่กับเธอแล้วรู้สึกเป็นตัวเอง",
  "เธอทำให้ฉันอยากเป็นคนที่ดีขึ้น",
  "เสียงหัวเราะของเธอคือเพลงที่ไพเราะที่สุด",
  "ทุกช่วงเวลากับเธอมีค่าเสมอ",
  "เธอคือบ้านของหัวใจฉัน",
  "รักที่เธอเป็นเธอ ไม่ต้องเปลี่ยนแปลง",
];

import Link from "next/link";

export default function AnniversaryPage() {
  const [reasons, setReasons] = useState([]);
  const [currentReason, setCurrentReason] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReason((prev) => (prev + 1) % loveReasons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-800 mb-2">
          ⏰ นับวัน<span className="text-gradient">ครบรอบ</span>
        </h1>
        <p className="text-slate-600 font-prompt">
          เริ่มต้นตั้งแต่วันที่ 8 ตุลาคม 2568
        </p>
      </div>

      {/* Couple Photo Placeholder */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative rounded-3xl overflow-hidden shadow-xl animate-float bg-white p-2">
          <div className="aspect-square bg-rose-50 rounded-2xl flex items-center justify-center border-2 border-rose-100">
            <div className="text-center text-slate-500">
              <div className="text-8xl mb-4 opacity-50">💑</div>
              <p className="font-prompt text-lg">รูปคู่รักของเรา</p>
              <p className="text-sm text-slate-400">( ใส่รูปจริงได้ )</p>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 text-5xl animate-heartbeat text-rose-400">
            💕
          </div>
          <div
            className="absolute -bottom-4 -left-4 text-5xl animate-heartbeat text-rose-300"
            style={{ animationDelay: "0.5s" }}
          >
            💖
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="max-w-5xl mx-auto mb-10">
        <Countdown targetDate="2025-10-08" />
      </div>

      {/* Love Message */}
      <div className="text-center bg-white rounded-3xl p-6 md:p-8 max-w-2xl mx-auto mb-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl md:text-3xl font-dancing text-rose-700 mb-4">
          💕 เราคบกันมา
        </h2>
        <p className="text-slate-600 font-prompt text-lg">
          ทุกวินาทีที่ผ่านไป คือความทรงจำที่มีค่า
          <br />
          ขอบคุณที่อยู่เคียงข้าง ❤️
        </p>
      </div>

      {/* Love Reasons */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-dancing text-rose-800 text-center mb-6">
          🌟 เหตุผลที่รักเธอ
        </h3>
        <div className="relative h-20 flex items-center justify-center">
          <div
            key={currentReason}
            className="bg-white border border-rose-100 shadow-sm px-6 py-3 rounded-full animate-slide-up"
          >
            <span className="text-rose-600 text-lg font-prompt">
              💕 {loveReasons[currentReason]}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="mt-12 text-slate-500 hover:text-rose-500 transition font-prompt flex items-center justify-center gap-2"
      >
        🏠 กลับหน้าหลัก
      </Link>
    </main>
  );
}
