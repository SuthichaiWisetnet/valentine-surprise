"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";
import { createConfetti } from "../components/effects";
import LoveQuiz from "../components/LoveQuiz";

const emojis = ["💕", "💖", "🌹", "💗", "❤️", "💘"];

// Memory Game Component
function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initGame = useCallback(() => {
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
  }, []);

  useEffect(() => {
    // Use timeout to avoid "setState in effect" warning during mount
    const timer = setTimeout(() => initGame(), 0);
    return () => clearTimeout(timer);
  }, [initGame]);

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
      <p className="text-slate-600 mb-6 font-handwriting text-2xl">
        ∼ จับคู่การ์ดที่เหมือนกัน! (ครั้งที่เปิด: {moves}) ∼
      </p>
      <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto">
        {cards.map((card, i) => (
          <div
            key={card.id}
            onClick={() => handleFlip(i)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-md flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-sm border-2 ${
              flipped.includes(i) || matched.includes(i)
                ? "bg-white rotate-y-180 border-rose-300"
                : "bg-rose-100 border-rose-200 text-transparent"
            }`}
          >
            {flipped.includes(i) || matched.includes(i) ? card.emoji : "❓"}
          </div>
        ))}
      </div>
      <button
        onClick={initGame}
        className="mt-8 px-8 py-2 bg-white text-rose-600 border-2 border-rose-200 rounded-full font-prompt hover:bg-rose-50 transition shadow-sm"
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
    "🎁 ของขวัญ",
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
      <p className="text-slate-600 mb-8 font-handwriting text-2xl">
        หมุนวงล้อเสี่ยงทายคำสัญญา 💕
      </p>
      <div className="relative inline-block mb-8">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl z-20 text-rose-600">
          🔽
        </div>
        <div className="p-2 bg-white rounded-full inline-block shadow-md border-4 border-rose-100">
          <div
            className="w-64 h-64 md:w-80 md:h-80 rounded-full relative shadow-inner overflow-hidden"
            style={{
              background:
                "conic-gradient(#ffc8dd 0deg 45deg, #bde0fe 45deg 90deg, #ffafcc 90deg 135deg, #a2d2ff 135deg 180deg, #ffc8dd 180deg 225deg, #bde0fe 225deg 270deg, #ffafcc 270deg 315deg, #a2d2ff 315deg 360deg)",
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                : "none",
            }}
          >
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md z-10 flex items-center justify-center text-xl">
              ❤️
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="block mx-auto px-10 py-3 bg-rose-400 text-white rounded-full text-xl shadow-md hover:bg-rose-500 hover:scale-105 transition disabled:opacity-70 font-prompt border-2 border-white/50"
      >
        {spinning ? "กำลังหมุน..." : "หมุนเลย!"}
      </button>
      {result && (
        <div className="mt-8 bg-white p-6 shadow-md transform rotate-1 border border-dashed border-rose-300 max-w-sm mx-auto relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-rose-200 rounded-full opacity-50"></div>
          <p className="text-slate-700 text-2xl font-handwriting">{result}</p>
        </div>
      )}
    </div>
  );
}

// Balloon Pop Component
function BalloonPop() {
  const [balloons, setBalloons] = useState([
    { id: 1, msg: "คิดถึงหนูทุกวัน 💕", color: "#FFAFCC", popped: false },
    { id: 2, msg: "หนูคือคนพิเศษ ❤️", color: "#FFC8DD", popped: false },
    { id: 3, msg: "รักหนูที่สุด 💖", color: "#A2D2FF", popped: false },
    { id: 4, msg: "ขอบคุณที่มีหนู 🌹", color: "#BDE0FE", popped: false },
    { id: 5, msg: "อยากอยู่กับหนูตลอดไป 💗", color: "#CDB4DB", popped: false },
  ]);

  const pop = (id) => {
    setBalloons(
      balloons.map((b) => (b.id === id ? { ...b, popped: true } : b)),
    );
  };

  return (
    <div className="text-center animate-fade-in-up">
      <p className="text-slate-600 mb-8 font-handwriting text-2xl">
        จิ้มลูกโป่งดูข้อความลับ!
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            onClick={() => !balloon.popped && pop(balloon.id)}
            className={`cursor-pointer transition-all ${balloon.popped ? "" : "animate-float hover:scale-110"}`}
            style={{ animationDelay: `${balloon.id * 0.2}s` }}
          >
            {balloon.popped ? (
              <div className="bg-white p-4 shadow-md border-b-4 border-gray-100 max-w-35 transform rotate-2">
                <span className="text-slate-600 text-sm font-handwriting">
                  {balloon.msg}
                </span>
              </div>
            ) : (
              <div className="relative group">
                <div
                  className="w-16 h-20 rounded-full shadow-md"
                  style={{ backgroundColor: balloon.color }}
                >
                  <div className="absolute top-4 left-4 w-4 h-2 bg-white/40 rounded-full transform -rotate-45"></div>
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-400 z-[-1]"></div>
                </div>
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
    {
      id: "memory",
      icon: "🎴",
      title: "Memory Match",
      desc: "จับคู่การ์ด",
      color: "bg-rose-100",
    },
    {
      id: "quiz",
      icon: "❓",
      title: "Love Quiz",
      desc: "ทดสอบความรัก",
      color: "bg-blue-100",
    },
    {
      id: "wheel",
      icon: "🎰",
      title: "Wheel of Love",
      desc: "หมุนวงล้อ",
      color: "bg-yellow-100",
    },
    {
      id: "balloons",
      icon: "🎈",
      title: "Pop Balloons",
      desc: "แตกลูกโป่ง",
      color: "bg-purple-100",
    },
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
        <div className="inline-block relative">
          <div className="absolute top-0 left-0 w-full h-full bg-yellow-100 transform -rotate-2 -z-10 rounded-sm"></div>
          <h1 className="text-4xl md:text-6xl font-dancing font-bold text-slate-800 mb-2 relative z-10 px-4">
            Game Station 🎮
          </h1>
        </div>
        <p className="text-slate-500 font-handwriting text-xl mt-4">
          มุมพักผ่อนของเราสองคน
        </p>
      </div>

      {!activeGame ? (
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
          {games.map((game, index) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`p-8 flex flex-col items-center justify-center text-center group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border-2 border-dashed border-gray-300 bg-white`}
            >
              <div
                className={`text-6xl mb-4 p-4 rounded-full ${game.color} bg-opacity-50`}
              >
                {game.icon}
              </div>
              <h3 className="font-dancing text-3xl text-slate-700 mb-1 font-bold">
                {game.title}
              </h3>
              <p className="text-slate-500 text-lg font-handwriting">
                {game.desc}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto relative z-20">
          {activeGame !== "quiz" && (
            <div className="mb-6 flex items-center justify-between px-6">
              <button
                onClick={() => setActiveGame(null)}
                className="text-rose-500 hover:text-rose-700 transition flex items-center gap-2 font-handwriting text-xl"
              >
                ← กลับไปเลือกเกม
              </button>
            </div>
          )}

          <div className="bg-white p-6 md:p-10 shadow-lg min-h-100 flex flex-col justify-center border-t-4 border-rose-200 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-rose-200/50"></div>
            {renderGame()}
          </div>
        </div>
      )}

      {/* Fixed Back Button */}
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
