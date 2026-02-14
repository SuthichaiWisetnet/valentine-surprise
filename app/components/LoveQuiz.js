"use client";

import { useState, useEffect } from "react";
import { createConfetti } from "./effects";

export default function LoveQuiz({ onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      q: "💕 เราเจอกันครั้งแรกที่ไหน?",
      options: ["ร้านกาแฟ", "มหาวิทยาลัย", "ออนไลน์", "งานปาร์ตี้"],
      correct: 2,
    },
    {
      q: "🍽️ อาหารจานโปรดของพี่คืออะไร?",
      options: ["สุกี้", "ส้มตำ", "พิซซ่า", "ราเมน"],
      correct: 1,
    },
    {
      q: "💖 สิ่งที่รักที่สุดในตัวพี่?",
      options: ["รอยยิ้ม", "ความใจดี", "อารมณ์ขัน", "ทุกอย่าง"],
      correct: 3,
    },
    {
      q: "🚌 สถานที่ท่องเที่ยวที่เราไปด้วยกันครั้งแรกคืออะไร?",
      options: ["ทะเล", "ภูเขา", "คาเฟ่", "ห้างสรรพสินค้า"],
      correct: 0,
    },
    {
      q: "🎵 เพลงโปรดของเราสองคน?",
      options: [
        "เพลงรักหวานซึ้ง",
        "เพลงร็อคหนักๆ",
        "เพลงป๊อปสนุกๆ",
        "เพลงแจ๊สฟังสบาย",
      ],
      correct: 0,
    },
    {
      q: "🎁 ของขวัญชิ้นแรกที่ให้กัน?",
      options: ["ตุ๊กตา", "นาฬิกา", "ดอกไม้", "เสื้อผ้า"],
      correct: 2,
    },
    {
      q: "📅 วันครบรอบของเราคือวันที่เท่าไหร่?",
      options: ["8 ตุลาคม", "14 กุมภาพันธ์", "1 มกราคม", "25 ธันวาคม"],
      correct: 0,
    },
  ];

  useEffect(() => {
    if (showResult || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ, showResult, isAnswered]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    // Auto proceed after delay
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedOption(index);

    if (index === questions[currentQ].correct) {
      setScore((s) => s + 1);
      createConfetti();
    }

    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ((c) => c + 1);
      setTimeLeft(15);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      createConfetti();
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  if (showResult) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl text-center max-w-lg mx-auto shadow-2xl border-2 border-rose-100 animate-bounce-in">
        <div className="text-8xl mb-6">🎉💕</div>
        <h3 className="text-4xl font-dancing text-rose-600 mb-4">ผลลัพธ์</h3>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-pink-500 mb-6">
          {score}/{questions.length}
        </div>
        <p className="text-slate-600 mb-8 font-prompt text-xl">
          {score >= questions.length - 2
            ? "สุดยอด! คุณคือแฟนพันธุ์แท้! 🏆"
            : score >= questions.length / 2
              ? "เก่งมาก! แต่ยังหวานได้อีกนะ 😘"
              : "ต้องเติมความหวานให้กันหน่อยแล้ว! 🍫"}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-rose-500 rounded-full text-white hover:bg-rose-600 hover:scale-105 transition shadow-lg font-prompt text-lg"
          >
            เล่นอีกครั้ง
          </button>
          {onBack && (
            <button
              onClick={onBack}
              className="px-8 py-3 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition shadow-lg font-prompt text-lg"
            >
              กลับเมนู
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-3xl max-w-xl mx-auto shadow-2xl border border-rose-100 relative overflow-hidden">
      {/* ProgressBar */}
      <div className="absolute top-0 left-0 h-2 bg-slate-100 w-full">
        <div
          className="h-full bg-rose-500 transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-6 mt-2">
        <div className="text-sm font-prompt bg-rose-50 text-rose-600 px-3 py-1 rounded-full border border-rose-100">
          คำถาม {currentQ + 1}/{questions.length}
        </div>
        <div
          className={`text-lg font-bold font-prompt ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-slate-400"}`}
        >
          ⏳ {timeLeft} วินาที
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-dancing text-rose-800 mb-8 text-center min-h-20 flex items-center justify-center">
        {questions[currentQ].q}
      </h3>

      <div className="space-y-4">
        {questions[currentQ].options.map((opt, i) => {
          let buttonClass =
            "bg-white hover:bg-rose-50 border-slate-200 text-slate-600";

          if (isAnswered) {
            if (i === questions[currentQ].correct) {
              buttonClass =
                "bg-green-100 border-green-400 text-green-700 font-bold";
            } else if (i === selectedOption) {
              buttonClass = "bg-red-100 border-red-400 text-red-700";
            } else {
              buttonClass =
                "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-2xl transition-all duration-300 border-2 font-prompt text-lg relative overflow-hidden group ${buttonClass} ${!isAnswered && "hover:scale-[1.02] hover:shadow-md"}`}
            >
              <span className="relative z-10 flex justify-between items-center">
                {opt}
                {isAnswered && i === questions[currentQ].correct && (
                  <span className="text-xl">✅</span>
                )}
                {isAnswered &&
                  i === selectedOption &&
                  i !== questions[currentQ].correct && (
                    <span className="text-xl">❌</span>
                  )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
