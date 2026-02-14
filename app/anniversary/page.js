"use client";

import { useState, useEffect } from "react";
import FloatingHearts from "../components/FloatingHearts";
import Countdown from "../components/Countdown";
import Image from "next/image";
import Link from "next/link";

const loveReasons = [
  "รอยยิ้มของหนูทำให้วันของพี่สดใส",
  "หนูเข้าใจพี่มากกว่าใครๆ",
  "อยู่กับหนูแล้วรู้สึกเป็นตัวเอง",
  "หนูทำให้พี่อยากเป็นคนที่ดีขึ้น",
  "เสียงหัวเราะของหนูคือเพลงที่ไพเราะที่สุด",
  "ทุกช่วงเวลากับหนูมีค่าเสมอ",
  "หนูคือบ้านของหัวใจพี่",
  "รักที่หนูเป็นหนู ไม่ต้องเปลี่ยนแปลง",
];

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
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24 overflow-hidden">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up relative z-20">
        <h1 className="text-4xl md:text-7xl font-dancing font-bold text-rose-800 mb-4 drop-shadow-sm">
          ⏰ นับวัน<span className="text-gradient">ครบรอบ</span>
        </h1>
        <p className="text-slate-600 font-prompt text-lg bg-white/40 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
          เริ่มต้นตั้งแต่วันที่ 8 ตุลาคม 2568
        </p>
      </div>

      {/* Couple Photo Placeholder */}
      <div className="max-w-md mx-auto mb-12 relative z-10">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-float group">
          <div className="glass p-3">
            <div className="aspect-square bg-rose-50/50 rounded-2xl flex items-center justify-center border-2 border-white/50 relative overflow-hidden">
              {/* Photo */}
              <Image
                src="/IMG_6198.png"
                alt="รูปคู่"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-4xl animate-bounce">❤️</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 text-6xl animate-heartbeat text-rose-400 drop-shadow-md z-20">
            💕
          </div>
          <div
            className="absolute -bottom-6 -left-6 text-6xl animate-heartbeat text-rose-300 drop-shadow-md z-20"
            style={{ animationDelay: "0.5s" }}
          >
            💖
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="glass p-6 md:p-8 shadow-xl">
          <Countdown targetDate="2025-10-08" />
        </div>
      </div>

      {/* Love Message */}
      <div className="text-center glass-card p-8 max-w-2xl mx-auto mb-12 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl md:text-4xl font-dancing text-rose-700 mb-4 font-bold">
          💕 เราคบกันมา
        </h2>
        <p className="text-slate-700 font-prompt text-xl leading-relaxed">
          ทุกวินาทีที่ผ่านไป คือความทรงจำที่มีค่า
          <br />
          ขอบคุณที่อยู่เคียงข้าง ❤️
        </p>
      </div>

      {/* Love Reasons */}
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-dancing text-rose-800 mb-8 font-bold">
          🌟 เหตุผลที่รักหนู
        </h3>
        <div className="relative h-24 flex items-center justify-center">
          <div
            key={currentReason}
            className="glass px-8 py-4 rounded-full animate-bounce-in shadow-lg border border-white/60"
          >
            <span className="text-rose-600 text-xl md:text-2xl font-prompt font-semibold">
              💕 {loveReasons[currentReason]}
            </span>
          </div>
        </div>
      </div>

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
