"use client";

import { useState, useEffect } from "react";

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const startDate = new Date(targetDate);

    const calculateTime = () => {
      const now = new Date();
      const diff = now - startDate;

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30.44);
      const years = Math.floor(days / 365.25);

      setTime({
        years,
        months: months % 12,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
        totalDays: days,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  const items = [
    { value: time.years, label: "ปี", delay: "0.1s" },
    { value: time.months, label: "เดือน", delay: "0.2s" },
    { value: time.days, label: "วัน", delay: "0.3s" },
    { value: formatNumber(time.hours), label: "ชั่วโมง", delay: "0.4s" },
    { value: formatNumber(time.minutes), label: "นาที", delay: "0.5s" },
    { value: formatNumber(time.seconds), label: "วินาที", delay: "0.6s" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 text-center">
      {items.map((item, index) => (
        <div
          key={index}
          className="countdown-item glass rounded-2xl p-4 md:p-6 animate-bounce-in"
          style={{ animationDelay: item.delay }}
        >
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient font-dancing">
            {item.value}
          </div>
          <div className="text-sm md:text-base text-pink-300 mt-2 font-prompt">
            {item.label}
          </div>
        </div>
      ))}
      <div
        className="col-span-2 md:col-span-3 lg:col-span-1 glass rounded-2xl p-4 md:p-6 animate-bounce-in"
        style={{ animationDelay: "0.7s" }}
      >
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 font-dancing">
          {time.totalDays}
        </div>
        <div className="text-sm md:text-base text-pink-300 mt-2 font-prompt">
          วันทั้งหมด
        </div>
      </div>
    </div>
  );
}
