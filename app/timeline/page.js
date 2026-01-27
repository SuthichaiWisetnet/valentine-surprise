"use client";

import { useEffect, useRef } from "react";
import FloatingHearts from "../components/FloatingHearts";
import Navigation from "../components/Navigation";

export default function TimelinePage() {
  const timelineRef = useRef(null);

  const timelineItems = [
    {
      date: "8 ตุลาคม 2568",
      title: "💖 วันแรกที่เจอกัน",
      description: "วันที่ชีวิตเปลี่ยนไป เพราะได้เจอเธอ...",
      icon: "💕",
      emoji: "📷",
    },
    {
      date: "เดือนถัดมา",
      title: "🌹 เดทแรก",
      description: "มื้ออาหารที่พิเศษที่สุด...",
      icon: "🌹",
      emoji: "🍽️",
    },
    {
      date: "ทริปแรกด้วยกัน",
      title: "✈️ เที่ยวด้วยกัน",
      description: "การผจญภัยครั้งแรกของเรา...",
      icon: "✈️",
      emoji: "🏖️",
    },
    {
      date: "วันเกิด",
      title: "🎂 วันพิเศษ",
      description: "เซอร์ไพรส์ที่ไม่มีวันลืม...",
      icon: "🎂",
      emoji: "🎉",
    },
    {
      date: "ครบรอบ",
      title: "💝 ครบรอบ 1 ปี",
      description: "หนึ่งปีที่มีความสุขที่สุด...",
      icon: "💝",
      emoji: "🎊",
    },
    {
      date: "อนาคต",
      title: "✨ และอีกมากมาย...",
      description: "ความทรงจำดีๆ ที่รอเราอยู่...",
      icon: "✨",
      emoji: "💕",
      isFuture: true,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-800 mb-2">
          📅 Timeline <span className="text-gradient">ความทรงจำ</span>
        </h1>
        <p className="text-slate-600 font-prompt">เส้นทางความรักของเรา</p>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto relative" ref={timelineRef}>
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-rose-200 via-rose-300 to-rose-200 transform md:-translate-x-1/2"></div>

        {timelineItems.map((item, index) => (
          <div
            key={index}
            className={`timeline-item relative pl-12 md:pl-0 mb-12 ${
              index % 2 === 0
                ? "md:w-1/2 md:pr-12"
                : "md:w-1/2 md:ml-auto md:pl-12"
            }`}
          >
            <div
              className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-2 border-white ${
                item.isFuture
                  ? "bg-linear-to-r from-yellow-400 to-amber-500 animate-pulse"
                  : index % 2 === 0
                    ? "bg-rose-400"
                    : "bg-pink-400"
              } ${
                index % 2 === 0
                  ? "md:left-auto md:right-0 md:transform md:translate-x-1/2"
                  : "md:left-0 md:transform md:-translate-x-1/2"
              }`}
            >
              <span className="text-xs">{item.icon}</span>
            </div>
            <div
              className={`bg-white rounded-2xl p-6 card-hover shadow-sm border border-rose-50 ${
                item.isFuture
                  ? "border-2 border-dashed border-amber-200 bg-amber-50/50"
                  : ""
              }`}
            >
              <div
                className={`text-sm mb-2 font-medium ${item.isFuture ? "text-amber-500" : "text-rose-400"}`}
              >
                {item.date}
              </div>
              <h3 className="text-xl font-dancing text-rose-800 mb-2">
                {item.title}
              </h3>
              <div className="w-full h-32 bg-rose-50 rounded-xl mb-3 flex items-center justify-center border border-rose-100">
                <span className="text-4xl">{item.emoji}</span>
              </div>
              <p className="text-slate-600 text-sm font-prompt leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center mt-6">
        <p className="text-slate-400 font-prompt text-sm">
          💡 เพิ่มเหตุการณ์และรูปภาพจริงได้ตามต้องการ
        </p>
      </div>

      <Navigation />
    </main>
  );
}
