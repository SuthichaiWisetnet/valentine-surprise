"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FloatingHearts from "./components/FloatingHearts";

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

  const menuItems = [
    {
      href: "/anniversary",
      icon: "⏰",
      title: "Anniversary",
      desc: "นับเวลาแห่งความรัก",
      rotate: "-2deg",
    },
    {
      href: "/gallery",
      icon: "📸",
      title: "Gallery",
      desc: "ภาพทรงจำของเรา",
      rotate: "1deg",
    },
    {
      href: "/playlist",
      icon: "🎵",
      title: "Playlist",
      desc: "เพลงสื่อรัก",
      rotate: "-1deg",
    },
    {
      href: "/games",
      icon: "🎮",
      title: "Games",
      desc: "เล่นเกมกันเถอะ",
      rotate: "2deg",
    },
    {
      href: "/love-letter",
      icon: "💌",
      title: "Love Letter",
      desc: "จดหมายจากใจ",
      rotate: "-2deg",
    },
    {
      href: "/surprise",
      icon: "🎁",
      title: "Surprise",
      desc: "กล่องของขวัญ",
      rotate: "1deg",
    },
  ];

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 pb-24 overflow-hidden bg-[url('/bg-paper.png')]">
      <FloatingHearts />

      {/* Hero Section: Scrapbook Title */}
      <div className="z-10 text-center mb-16 animate-fade-in-up relative max-w-2xl mx-auto">
        {/* Decorative Tape */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-200 opacity-80 rotate-2 shadow-sm z-20"></div>

        <div className="bg-white p-8 md:p-12 shadow-md transform -rotate-1 border border-slate-100 relative">
          <h1 className="text-5xl md:text-7xl font-dancing font-bold text-rose-800 mb-2 leading-tight">
            Happy Valentine&apos;s Day
          </h1>
          <p className="text-xl md:text-2xl font-handwriting text-slate-600 mt-2">
            บันทึกความทรงจำของพี่... ถึงหนู 💕
          </p>

          {/* Stamp/Doodle */}
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-20 rotate-12 pointer-events-none">
            💋
          </div>

          <div className="mt-8 border-t-2 border-dashed border-rose-200 pt-6">
            <p className="text-slate-500 font-prompt text-sm uppercase tracking-widest mb-2">
              Together for
            </p>
            <div className="text-3xl font-bold text-rose-600 font-dancing">
              {totalDays} วัน {hours} ชั่วโมง ❤️
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid: Polaroids/Stickers */}
      <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto w-full px-4">
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index} className="block group">
            <div
              className="paper-card p-6 flex flex-col items-center justify-center text-center h-48 relative transition-all duration-300 group-hover:-translate-y-2"
              style={{
                transform: `rotate(${item.rotate})`,
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-blue-200/50 shadow-sm z-10"></div>

              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h2 className="text-2xl font-dancing font-bold text-slate-700 group-hover:text-rose-600 transition-colors">
                {item.title}
              </h2>
              <p className="text-slate-500 font-handwriting mt-1 text-lg">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
