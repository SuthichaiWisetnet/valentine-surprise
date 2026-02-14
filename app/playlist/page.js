"use client";

import { useState } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";
import Image from "next/image";

export default function PlaylistPage() {
  const [currentSong, setCurrentSong] = useState(0);

  // ตัวอย่างเพลง (สามารถเปลี่ยน id เป็นของ youtube ที่ต้องการได้)
  const songs = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      id: "2Vv-BfVoq4g", // YouTube Video ID
      duration: "4:23",
    },
    {
      title: "Just the Way You Are",
      artist: "Bruno Mars",
      id: "LjhCEhWiKXk",
      duration: "3:40",
    },
    {
      title: "A Thousand Years",
      artist: "Christina Perri",
      id: "rtOvBOTyX00",
      duration: "4:45",
    },
    {
      title: "Lover",
      artist: "Taylor Swift",
      id: "coCZSx6pzaQ", // ID จาก URL youtube?v=...
      duration: "3:41",
    },
  ];

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 flex flex-col items-center">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-800 mb-2">
          🎵 <span className="text-gradient">เพลง</span>ของเรา
        </h1>
        <p className="text-slate-600 font-prompt">สื่อความหมายแทนใจ</p>
      </div>

      {/* YouTube Player Card */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-rose-100 max-w-2xl w-full animate-fade-in-up">
        {/* Video Wrapper */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner mb-6 bg-slate-100 relative">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${songs[currentSong].id}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        </div>

        {/* Song Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-rose-800 font-prompt">
            {songs[currentSong].title}
          </h2>
          <p className="text-slate-500 font-prompt">
            {songs[currentSong].artist}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-2">
          <button
            onClick={() =>
              setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length)
            }
            className="w-12 h-12 rounded-full border border-rose-200 text-rose-500 hover:bg-rose-50 flex items-center justify-center text-xl transition shadow-sm"
          >
            ⏮️
          </button>

          <div className="text-sm font-prompt text-rose-400 bg-rose-50 px-4 py-1 rounded-full">
            Playing {currentSong + 1} / {songs.length}
          </div>

          <button
            onClick={() => setCurrentSong((prev) => (prev + 1) % songs.length)}
            className="w-12 h-12 rounded-full border border-rose-200 text-rose-500 hover:bg-rose-50 flex items-center justify-center text-xl transition shadow-sm"
          >
            ⏭️
          </button>
        </div>
      </div>

      {/* Playlist List */}
      <div className="max-w-2xl w-full mt-8 space-y-3">
        {songs.map((song, index) => (
          <div
            key={index}
            onClick={() => setCurrentSong(index)}
            className={`flex items-center p-4 rounded-xl cursor-pointer transition border ${
              currentSong === index
                ? "bg-rose-50 border-rose-200 shadow-sm transform scale-[1.02]"
                : "bg-white border-transparent hover:bg-white/50 hover:shadow-sm"
            }`}
          >
            {/* Thumbnail preview - using YouTube thumbnail */}
            <div className="w-16 h-12 rounded-lg bg-slate-200 overflow-hidden mr-4 relative shrink-0">
              <Image
                src={`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`}
                alt={song.title}
                className="w-full h-full object-cover"
                width={64}
                height={64}
              />
              {currentSong === index && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs">
                  ▶
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-prompt font-medium truncate ${currentSong === index ? "text-rose-700" : "text-slate-700"}`}
              >
                {song.title}
              </h3>
              <p className="text-xs text-slate-500 truncate">{song.artist}</p>
            </div>
            <div className="text-xs text-slate-400 ml-4 shrink-0">
              {song.duration}
            </div>
          </div>
        ))}
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="mt-12 text-slate-500 hover:text-rose-500 transition font-prompt flex items-center gap-2"
      >
        🏠 กลับหน้าหลัก
      </Link>
    </main>
  );
}
