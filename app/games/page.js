"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";
import { createConfetti } from "../components/effects";

// Memory Game Component
function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const emojis = ["💕", "💖", "🌹", "💗", "❤️", "💘"];

  const initGame = () => {
    const pairs = [...emojis, ...emojis];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(
      shuffled.map((emoji, i) => ({
        id: i,
        emoji,
        isFlipped: false,
        isMatched: false,
      })),
    );
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      if (cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setTimeout(() => {
            createConfetti();
            alert(`🎉 ยอดเยี่ยม! จับคู่ครบใน ${moves + 1} ครั้ง!`);
          }, 300);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="text-center">
      <p className="text-slate-600 mb-4 font-prompt">
        จับคู่การ์ดที่เหมือนกัน! (ครั้งที่เปิด: {moves})
      </p>
      <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
        {cards.map((card, i) => (
          <div
            key={card.id}
            onClick={() => handleFlip(i)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 border ${
              flipped.includes(i) || matched.includes(i)
                ? "bg-white shadow-sm border-rose-200 rotate-y-180"
                : "bg-rose-400 shadow-md border-rose-500 text-transparent"
            }`}
          >
            {flipped.includes(i) || matched.includes(i) ? card.emoji : "💖"}
          </div>
        ))}
      </div>
      <button
        onClick={initGame}
        className="mt-6 px-6 py-2 bg-rose-500 rounded-full text-white hover:bg-rose-600 transition shadow-md font-prompt"
      >
        เริ่มใหม่
      </button>
    </div>
  );
}

// Quiz Component
function LoveQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "💕 เราเจอกันครั้งแรกที่ไหน?",
      options: ["ร้านกาแฟ", "มหาวิทยาลัย", "ออนไลน์", "งานปาร์ตี้"],
      correct: 0,
    },
    {
      q: "🍽️ อาหารจานโปรดของเราคืออะไร?",
      options: ["สุกี้", "ส้มตำ", "พิซซ่า", "ราเมน"],
      correct: 2,
    },
    {
      q: "🎬 หนังเรื่องโปรดของเราคือ?",
      options: ["หนังรัก", "หนังผจญภัย", "หนังตลก", "หนังสยองขวัญ"],
      correct: 0,
    },
    {
      q: "💖 สิ่งที่รักที่สุดในตัวอีกฝ่าย?",
      options: ["รอยยิ้ม", "ความใจดี", "อารมณ์ขัน", "ทุกอย่าง"],
      correct: 3,
    },
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQ].correct) setScore((s) => s + 1);
    if (currentQ + 1 < questions.length) {
      setCurrentQ((c) => c + 1);
    } else {
      setShowResult(true);
      createConfetti();
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-white p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xl border border-rose-100">
        <div className="text-6xl mb-4">🎉💕</div>
        <h3 className="text-3xl font-dancing text-rose-600 mb-4">ผลลัพธ์</h3>
        <div className="text-5xl font-bold text-rose-500 mb-4">
          {score}/{questions.length}
        </div>
        <p className="text-slate-600 mb-6 font-prompt">
          {score >= 3 ? "คุณรู้จักคนรักดีมาก!" : "ลองเรียนรู้กันมากขึ้นนะ!"}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-rose-500 rounded-full text-white hover:bg-rose-600 transition shadow-md font-prompt"
        >
          เล่นอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl max-w-lg mx-auto shadow-lg border border-rose-100">
      <div className="text-sm text-slate-400 mb-2 font-prompt">
        คำถาม {currentQ + 1}/{questions.length}
      </div>
      <h3 className="text-xl font-dancing text-rose-800 mb-6">
        {questions[currentQ].q}
      </h3>
      <div className="space-y-3">
        {questions[currentQ].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="w-full p-4 text-left rounded-xl bg-slate-50 hover:bg-rose-50 hover:border-rose-200 transition text-slate-600 border border-slate-200 font-prompt"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// Wheel of Love Component
function WheelOfLove() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const prizes = [
    "💋 จูบหนึ่งครั้ง",
    "🍿 ดูหนังด้วยกัน",
    "🍽️ ทำอาหารให้",
    "💆 นวดให้ 10 นาที",
    "🛒 ช้อปปิ้งด้วยกัน",
    "🎁 ของขวัญเซอร์ไพรส์",
    "🌹 ดอกไม้ 1 ช่อ",
    "🎄 เที่ยวด้วยกัน",
  ];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const newRotation = rotation + 360 * 5 + randomIndex * 45 + 22.5;
    setRotation(newRotation);
    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[randomIndex]);
      createConfetti();
    }, 4000);
  };

  return (
    <div className="text-center">
      <p className="text-slate-600 mb-6 font-prompt">
        หมุนวงล้อเพื่อรับคำสัญญา!
      </p>
      <div className="relative inline-block mb-6">
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-3xl z-10 text-rose-500">
          🔽
        </div>
        <div
          className="w-64 h-64 rounded-full relative shadow-xl"
          style={{
            background:
              "conic-gradient(#FF6B9D 0deg 45deg, #C44569 45deg 90deg, #FFD700 90deg 135deg, #FF69B4 135deg 180deg, #FF6B9D 180deg 225deg, #C44569 225deg 270deg, #FFD700 270deg 315deg, #FF69B4 315deg 360deg)",
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
              : "none",
          }}
        >
          <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="text-4xl">💕</span>
          </div>
        </div>
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="block mx-auto px-8 py-4 bg-rose-500 rounded-full text-white text-xl shadow-md hover:bg-rose-600 hover:scale-105 transition disabled:opacity-50 font-prompt"
      >
        {spinning ? "กำลังหมุน..." : "หมุนเลย! 🎉"}
      </button>
      {result && (
        <div className="mt-6 bg-white border border-rose-100 p-6 rounded-2xl animate-bounce-in shadow-lg">
          <div className="text-4xl mb-2">🎁</div>
          <p className="text-rose-600 text-xl font-prompt">{result}</p>
        </div>
      )}
    </div>
  );
}

// Balloon Pop Component
function BalloonPop() {
  const [balloons, setBalloons] = useState([
    { id: 1, msg: "คิดถึงเธอทุกวัน 💕", color: "#FF6B9D", popped: false },
    { id: 2, msg: "เธอคือคนพิเศษ ❤️", color: "#C44569", popped: false },
    { id: 3, msg: "รักเธอที่สุด 💖", color: "#FFD700", popped: false },
    { id: 4, msg: "ขอบคุณที่มีเธอ 🌹", color: "#FF69B4", popped: false },
    { id: 5, msg: "อยากอยู่กับเธอตลอดไป 💗", color: "#FF1493", popped: false },
  ]);

  const pop = (id) => {
    setBalloons(
      balloons.map((b) => (b.id === id ? { ...b, popped: true } : b)),
    );
  };

  return (
    <div className="text-center">
      <p className="text-slate-600 mb-6 font-prompt">
        กดแตกลูกโป่งเพื่อเผยข้อความ!
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            onClick={() => !balloon.popped && pop(balloon.id)}
            className={`cursor-pointer transition-all ${balloon.popped ? "" : "animate-float hover:scale-110"}`}
            style={{ animationDelay: `${balloon.id * 0.2}s` }}
          >
            {balloon.popped ? (
              <div className="bg-white p-3 rounded-xl animate-bounce-in shadow-sm border border-rose-100">
                <span className="text-rose-500 text-sm font-prompt">
                  {balloon.msg}
                </span>
              </div>
            ) : (
              <svg width="60" height="80" viewBox="0 0 60 80">
                <ellipse cx="30" cy="35" rx="28" ry="35" fill={balloon.color} />
                <polygon points="30,70 25,75 35,75" fill={balloon.color} />
                <path
                  d="M30 75 Q32 85 28 95"
                  stroke="#888"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: "memory", icon: "🎴", title: "Memory Match", desc: "จับคู่การ์ด" },
    { id: "quiz", icon: "❓", title: "Love Quiz", desc: "ทดสอบความรัก" },
    { id: "wheel", icon: "🎰", title: "Wheel of Love", desc: "หมุนวงล้อ" },
    { id: "balloons", icon: "🎈", title: "Pop Balloons", desc: "แตกลูกโป่ง" },
  ];

  const renderGame = () => {
    switch (activeGame) {
      case "memory":
        return <MemoryGame />;
      case "quiz":
        return <LoveQuiz />;
      case "wheel":
        return <WheelOfLove />;
      case "balloons":
        return <BalloonPop />;
      default:
        return null;
    }
  };

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-800 mb-2">
          🎮 <span className="text-gradient">เกม</span>ความรัก
        </h1>
        <p className="text-slate-600 font-prompt">เล่นเกมสนุกๆ ด้วยกัน</p>
      </div>

      {!activeGame ? (
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className="card-hover bg-white rounded-2xl p-6 text-center shadow-md border border-rose-50 hover:border-rose-200"
            >
              <div className="text-5xl mb-3">{game.icon}</div>
              <h3 className="font-dancing text-xl text-rose-700">
                {game.title}
              </h3>
              <p className="text-slate-500 text-sm">{game.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setActiveGame(null)}
            className="mb-4 text-rose-500 hover:text-rose-700 transition flex items-center gap-2 font-prompt"
          >
            ← กลับเมนูเกม
          </button>
          <h2 className="text-3xl font-dancing text-rose-800 text-center mb-6">
            {games.find((g) => g.id === activeGame)?.icon}{" "}
            {games.find((g) => g.id === activeGame)?.title}
          </h2>
          {renderGame()}
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
