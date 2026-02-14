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
    <main className="relative z-10 min-h-screen px-4 py-12 pb-24 overflow-hidden font-prompt">
      <FloatingHearts />

      {/* Header with Washi Tape */}
      <div className="text-center mb-16 animate-fade-in-up relative z-20 max-w-xl mx-auto">
        <div className="relative bg-white/80 p-6 shadow-sm rotate-1">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/60 -rotate-2"></div>
          <h1 className="text-4xl md:text-6xl font-dancing font-bold text-rose-800 mb-2">
            Our Anniversary
          </h1>
          <p className="text-slate-500 font-handwriting text-xl">
            เริ่มนับตั้งแต่วันที่ 8 ตุลาคม 2568
          </p>
        </div>
      </div>

      {/* Couple Photo Polaroid */}
      <div className="max-w-sm mx-auto mb-16 relative z-10">
        <div className="polaroid transform -rotate-2 hover:rotate-0 transition-transform duration-500">
          <div className="absolute -top-4 right-10 w-32 h-8 bg-blue-100/50 rotate-3 z-10 shadow-sm"></div>
          <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4">
            <Image
              src="/IMG_6198.png"
              alt="รูปคู่"
              width={400}
              height={400}
              className="polaroid-img"
            />
          </div>
          <div className="text-center">
            <p className="font-handwriting text-2xl text-slate-600">
              You & Me ❤️
            </p>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Somewhere in our memories
            </p>
          </div>
        </div>
      </div>

      {/* Countdown - Calendar Style */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-white p-6 shadow-md border-t-8 border-rose-300 rounded-sm relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white text-2xl shadow-md border-4 border-white">
            ⏰
          </div>
          <div className="mt-8">
            <Countdown targetDate="2025-10-08" />
          </div>
        </div>
      </div>

      {/* Love Message - Note Style */}
      <div className="paper-card p-8 max-w-2xl mx-auto mb-16 transform rotate-1 bg-yellow-50/50 relative">
        <div className="absolute -top-3 right-1/2 translate-x-1/2 w-16 h-4 bg-yellow-200/50 -rotate-1"></div>
        <h2 className="text-3xl font-dancing text-rose-700 mb-4 font-bold text-center">
          💕 บันทึกถึงหนู
        </h2>
        <p className="text-slate-700 font-handwriting text-2xl leading-relaxed text-center">
          &quot;ทุกวินาทีที่ผ่านไป คือความทรงจำที่มีค่า... <br />{" "}
          ขอบคุณที่เข้ามาเป็นเรื่องราวดีๆ ในชีวิตพี่นะ&quot;
        </p>
        <div className="text-right mt-4">
          <span className="text-rose-400 font-dancing text-xl">
            - รักเสมอ -
          </span>
        </div>
      </div>

      {/* Love Reasons - Sticky Note */}
      <div className="max-w-2xl mx-auto text-center relative">
        <h3 className="text-2xl font-dancing text-slate-600 mb-6 font-bold">
          ทำไมพี่ถึงรักหนู?
        </h3>
        <div className="relative min-h-30 flex items-center justify-center">
          <div
            key={currentReason}
            className="bg-pink-50 p-6 md:p-8 shadow-md transform -rotate-1 transition-all duration-500 animate-bounce-in max-w-lg w-full relative"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-rose-100 rounded-full opacity-50"></div>
            <span className="text-slate-700 text-2xl font-handwriting font-semibold block">
              {loveReasons[currentReason]}
            </span>
          </div>
        </div>
      </div>

      {/* Fixed Back Button - Stamp Style */}
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
