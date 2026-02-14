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

  const menuItems = [
    {
      href: "/anniversary",
      icon: "⏰",
      title: "Anniversary",
      desc: "นับเวลาแห่งความรัก",
    },
    {
      href: "/gallery",
      icon: "📸",
      title: "Gallery",
      desc: "ภาพทรงจำของเรา",
    },
    {
      href: "/playlist",
      icon: "🎵",
      title: "Playlist",
      desc: "เพลงสื่อรัก",
    },
    { href: "/games", icon: "🎮", title: "Games", desc: "เล่นเกมกันเถอะ" },
    {
      href: "/love-letter",
      icon: "💌",
      title: "Love Letter",
      desc: "จดหมายจากใจ",
    },
    {
      href: "/surprise",
      icon: "🎁",
      title: "Surprise",
      desc: "กล่องของขวัญ",
    },
  ];

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 pb-24 overflow-hidden">
      <FloatingHearts />

      {/* Hero Section */}
      <div className="z-10 text-center mb-12 animate-fade-in-up relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-pink-400/20 blur-[100px] rounded-full -z-10 animate-pulse-glow" />
        <h1 className="text-6xl md:text-8xl font-dancing font-bold text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)] mb-4 leading-tight">
          Happy <br className="md:hidden" />
          <span className="text-gradient drop-shadow-none">
            Valentine&apos;s
          </span>{" "}
          Day
        </h1>
        <p className="text-xl md:text-2xl font-prompt text-white/90 drop-shadow-md mt-4">
          เซอร์ไพรส์สุดพิเศษสำหรับคนพิเศษของพี่ 💕
        </p>

        {/* Counter Glass */}
        <div className="glass inline-block mt-8 px-8 py-4 animate-float-slow">
          <p className="text-rose-700 font-prompt text-lg">
            เรารักกันมาแล้ว...
          </p>
          <div className="text-3xl font-bold text-rose-600 font-dancing mt-1">
            {totalDays} วัน {hours} ชั่วโมง ❤️
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full px-4">
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index} className="block group">
            <div
              className={`glass-card p-8 flex flex-col items-center justify-center text-center h-64 relative overflow-hidden transition-all duration-500`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Glowing Background on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 drop-shadow-lg">
                {item.icon}
              </div>
              <h2 className="text-3xl font-dancing font-bold text-rose-700 group-hover:text-rose-900 transition-colors drop-shadow-sm relative z-10">
                {item.title}
              </h2>
              <p className="text-slate-600 font-prompt mt-2 text-lg group-hover:text-slate-800 transition-colors relative z-10">
                {item.desc}
              </p>

              {/* Floating Particles in Card */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 text-2xl animate-bounce">
                ✨
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
