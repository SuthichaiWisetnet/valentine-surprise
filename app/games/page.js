"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";
import { createConfetti } from "../components/effects";

import LoveQuiz from "../components/LoveQuiz";

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
    <div className="text-center animate-fade-in-up">
      <p className="text-slate-600 mb-6 font-prompt text-lg bg-white/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
        จับคู่การ์ดที่เหมือนกัน! (ครั้งที่เปิด: {moves})
      </p>
      <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto">
        {cards.map((card, i) => (
          <div
            key={card.id}
            onClick={() => handleFlip(i)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-3xl cursor-pointer transition-all duration-500 transform hover:scale-105 shadow-md ${
              flipped.includes(i) || matched.includes(i)
                ? "bg-white rotate-y-180 border-2 border-rose-200"
                : "bg-linear-to-br from-rose-400 to-pink-500 text-transparent border-2 border-white/50"
            }`}
            style={{ perspective: "1000px" }}
          >
            {flipped.includes(i) || matched.includes(i) ? card.emoji : "💖"}
          </div>
        ))}
      </div>
      <button
        onClick={initGame}
        className="mt-8 px-8 py-3 bg-white hover:bg-rose-50 text-rose-500 rounded-full font-prompt font-semibold transition shadow-lg border border-rose-100 hover:scale-105"
      >
        🔄 เริ่มใหม่
      </button>
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
    <div className="text-center animate-fade-in-up">
      <p className="text-slate-600 mb-8 font-prompt text-lg bg-white/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
        หมุนวงล้อเพื่อรับคำสัญญา!
      </p>
      <div className="relative inline-block mb-8">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl z-20 text-rose-600 drop-shadow-md">
          🔽
        </div>
        <div className="p-2 glass rounded-full inline-block">
          <div
            className="w-64 h-64 md:w-80 md:h-80 rounded-full relative shadow-2xl border-4 border-white/50"
            style={{
              background:
                "conic-gradient(#FF6B9D 0deg 45deg, #C44569 45deg 90deg, #FFD700 90deg 135deg, #FF69B4 135deg 180deg, #FF6B9D 180deg 225deg, #C44569 225deg 270deg, #FFD700 270deg 315deg, #FF69B4 315deg 360deg)",
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                : "none",
            }}
          >
            <div className="absolute inset-4 md:inset-6 rounded-full bg-white flex items-center justify-center shadow-inner">
              <span className="text-4xl md:text-6xl animate-pulse">💕</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="block mx-auto px-10 py-4 bg-linear-to-r from-rose-500 to-pink-500 rounded-full text-white text-xl shadow-lg hover:shadow-rose-300 hover:scale-105 transition disabled:opacity-70 disabled:scale-100 font-prompt font-bold"
      >
        {spinning ? "กำลังหมุน..." : "หมุนเลย! 🎉"}
      </button>
      {result && (
        <div className="mt-8 glass p-6 rounded-2xl animate-bounce-in shadow-xl max-w-sm mx-auto border-2 border-white/60">
          <div className="text-5xl mb-2">🎁</div>
          <p className="text-rose-700 text-2xl font-prompt font-bold">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}

// Balloon Pop Component
function BalloonPop() {
  const [balloons, setBalloons] = useState([
    { id: 1, msg: "คิดถึงหนูทุกวัน 💕", color: "#FF6B9D", popped: false },
    { id: 2, msg: "หนูคือคนพิเศษ ❤️", color: "#C44569", popped: false },
    { id: 3, msg: "รักหนูที่สุด 💖", color: "#FFD700", popped: false },
    { id: 4, msg: "ขอบคุณที่มีหนู 🌹", color: "#FF69B4", popped: false },
    { id: 5, msg: "อยากอยู่กับหนูตลอดไป 💗", color: "#FF1493", popped: false },
  ]);

  const pop = (id) => {
    setBalloons(
      balloons.map((b) => (b.id === id ? { ...b, popped: true } : b)),
    );
  };

  return (
    <div className="text-center animate-fade-in-up">
      <p className="text-slate-600 mb-8 font-prompt text-lg bg-white/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
        กดแตกลูกโป่งเพื่อเผยข้อความ!
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            onClick={() => !balloon.popped && pop(balloon.id)}
            className={`cursor-pointer transition-all ${balloon.popped ? "" : "animate-float hover:scale-110"}`}
            style={{ animationDelay: `${balloon.id * 0.2}s` }}
          >
            {balloon.popped ? (
              <div className="glass p-4 rounded-xl animate-bounce-in shadow-lg border border-white/50 max-w-37.5">
                <span className="text-rose-600 text-sm font-prompt font-semibold">
                  {balloon.msg}
                </span>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-md transform scale-75 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg
                  width="70"
                  height="90"
                  viewBox="0 0 60 80"
                  className="drop-shadow-lg filter group-hover:brightness-110 transition-all"
                >
                  <ellipse
                    cx="30"
                    cy="35"
                    rx="28"
                    ry="35"
                    fill={balloon.color}
                  />
                  <polygon points="30,70 25,75 35,75" fill={balloon.color} />
                  <path
                    d="M30 75 Q32 85 28 95"
                    stroke="#888"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Shine */}
                  <ellipse
                    cx="20"
                    cy="20"
                    rx="8"
                    ry="12"
                    fill="white"
                    opacity="0.4"
                    transform="rotate(-30 20 20)"
                  />
                </svg>
              </div>
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
        return <LoveQuiz onBack={() => setActiveGame(null)} />;
      case "wheel":
        return <WheelOfLove />;
      case "balloons":
        return <BalloonPop />;
      default:
        return null;
    }
  };

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24 overflow-hidden">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-10 animate-fade-in-up relative z-20">
        <h1 className="text-4xl md:text-7xl font-dancing font-bold text-rose-800 mb-4 drop-shadow-sm">
          🎮 <span className="text-gradient">เกม</span>ความรัก
        </h1>
        <p className="text-slate-600 font-prompt text-lg bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full inline-block shadow-sm">
          เล่นเกมสนุกๆ สะสมคะแนนความรัก
        </p>
      </div>

      {!activeGame ? (
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
          {games.map((game, index) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className="glass-card p-8 flex flex-col items-center justify-center text-center group hover:bg-white/80 transition-all duration-500"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 drop-shadow-md">
                {game.icon}
              </div>
              <h3 className="font-dancing text-3xl text-rose-700 mb-2 font-bold group-hover:text-rose-800">
                {game.title}
              </h3>
              <p className="text-slate-500 text-lg font-prompt">{game.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto relative z-20">
          {activeGame !== "quiz" && (
            <div className="mb-6 flex items-center justify-between glass px-6 py-3 rounded-full">
              <button
                onClick={() => setActiveGame(null)}
                className="text-rose-500 hover:text-rose-700 transition flex items-center gap-2 font-prompt font-semibold"
              >
                <span className="text-xl">←</span> กลับเมนูเกม
              </button>
              <h2 className="text-2xl font-dancing text-rose-800 font-bold hidden md:block">
                {games.find((g) => g.id === activeGame)?.icon}{" "}
                {games.find((g) => g.id === activeGame)?.title}
              </h2>
              <div className="w-8"></div> {/* Spacer */}
            </div>
          )}
          {/* Mobile Title for Game */}
          {activeGame !== "quiz" && (
            <h2 className="md:hidden text-3xl font-dancing text-rose-800 text-center mb-8 font-bold animate-fade-in-up">
              {games.find((g) => g.id === activeGame)?.icon}{" "}
              {games.find((g) => g.id === activeGame)?.title}
            </h2>
          )}

          <div className="glass p-6 md:p-10 rounded-3xl shadow-xl min-h-100 flex flex-col justify-center">
            {renderGame()}
          </div>
        </div>
      )}

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
