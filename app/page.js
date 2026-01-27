"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FloatingHearts from "./components/FloatingHearts";
import TypeWriter from "./components/TypeWriter";

export default function Home() {
  const [totalDays, setTotalDays] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const startDate = new Date("2025-10-08");
      const now = new Date();
      const diff = now - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTotalDays(days);
      setHours(hrs);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const welcomeMessages = [
    "ขอบคุณที่เข้ามาในชีวิต... 💕",
    "คุณคือคนพิเศษที่สุดของฉัน ❤️",
    "รักนะ... ตลอดไป 💖",
  ];

  const quickNavItems = [
    { href: "/anniversary", icon: "⏰", label: "นับวันรัก" },
    { href: "/gallery", icon: "📸", label: "แกลเลอรี่" },
    { href: "/playlist", icon: "🎵", label: "เพลงของเรา" },
    { href: "/games", icon: "🎮", label: "เกม" },
    { href: "/love-letter", icon: "💌", label: "จดหมายรัก" },
    { href: "/surprise", icon: "🎁", label: "เซอร์ไพรส์" },
  ];

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20 pb-10">
      <FloatingHearts />

      {/* Welcome Section */}
      <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
        {/* Love Icon */}
        <div className="text-8xl md:text-9xl mb-6 animate-heartbeat text-rose-500">
          💕
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-dancing text-rose-800 mb-4 drop-shadow-sm">
          สำหรับ<span className="text-gradient">คนพิเศษ</span>
        </h1>

        {/* Typewriter Message */}
        <div className="h-16 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-slate-600 font-prompt">
            <TypeWriter texts={welcomeMessages} />
          </p>
        </div>

        {/* Love Stats */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mt-8 mb-10 inline-block shadow-sm border border-slate-100">
          <p className="text-slate-500 text-lg">รักกันมาแล้ว</p>
          <div className="text-3xl md:text-4xl font-dancing text-rose-600 mt-2">
            {totalDays} วัน {hours} ชั่วโมง
          </div>
        </div>

        {/* Enter Button */}
        <div className="mt-8">
          <Link
            href="/anniversary"
            className="inline-block px-10 py-4 bg-rose-500 rounded-full text-white text-xl font-prompt 
                      shadow-md hover:bg-rose-600 hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            💖 เริ่มต้นเซอร์ไพรส์
          </Link>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16 max-w-6xl mx-auto px-4 w-full">
        {quickNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card-hover bg-white rounded-2xl p-4 text-center shadow-sm border border-rose-50 hover:border-rose-200 transition-all"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-slate-600 text-sm font-prompt">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
