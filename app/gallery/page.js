"use client";

import { useState } from "react";
import Link from "next/link";
import FloatingHearts from "../components/FloatingHearts";

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    { id: 1, gradient: "from-pink-400 to-rose-500", heart: "💕" },
    { id: 2, gradient: "from-rose-400 to-pink-500", heart: "💖" },
    { id: 3, gradient: "from-purple-400 to-pink-500", heart: "❤️" },
    { id: 4, gradient: "from-pink-500 to-red-400", heart: "💗" },
    { id: 5, gradient: "from-red-400 to-rose-500", heart: "💕" },
    { id: 6, gradient: "from-rose-500 to-pink-400", heart: "💘" },
  ];

  const videos = [
    { id: 1, title: "ช่วงเวลาพิเศษ", gradient: "from-rose-600 to-pink-700" },
    { id: 2, title: "ทริปสุดพิเศษ", gradient: "from-pink-600 to-rose-700" },
  ];

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-800 mb-2">
          📸 <span className="text-gradient">แกลเลอรี่</span>ความทรงจำ
        </h1>
        <p className="text-slate-600 font-prompt">รวมภาพประทับใจของเรา</p>
      </div>

      {/* Photo Gallery Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-item card-hover rounded-2xl overflow-hidden relative group aspect-square cursor-pointer shadow-md bg-white p-2"
              onClick={() => {
                setSelectedImage(photo);
                setLightboxOpen(true);
              }}
            >
              <div
                className={`w-full h-full rounded-xl bg-linear-to-br ${photo.gradient} flex items-center justify-center`}
              >
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">📷</div>
                  <p className="text-sm">รูปที่ {photo.id}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-6xl text-rose-500 drop-shadow-md">
                  {photo.heart}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl font-dancing text-rose-800 text-center mb-6">
          🎥 วิดีโอความทรงจำ
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
            >
              <div
                className={`aspect-video bg-linear-to-br ${video.gradient} flex items-center justify-center`}
              >
                <div className="text-center text-white">
                  <div className="text-6xl mb-3">🎬</div>
                  <p className="font-prompt">วิดีโอที่ {video.id}</p>
                  <p className="text-sm opacity-80">( ใส่วิดีโอจริงได้ )</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-prompt text-rose-700">{video.title}</h3>
                <p className="text-slate-500 text-sm">คำบรรยายวิดีโอ...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hint */}
      <div className="text-center mt-10">
        <p className="text-slate-400 font-prompt text-sm">
          💡 เพิ่มรูปและวิดีโอจริงได้โดยแทนที่ placeholder
        </p>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-white/95 flex items-center justify-center z-50 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className={`w-80 h-80 rounded-2xl shadow-2xl bg-linear-to-br ${selectedImage?.gradient} flex items-center justify-center relative`}
          >
            <div className="text-center text-white">
              <div className="text-8xl mb-4">{selectedImage?.heart}</div>
              <p className="font-prompt">รูปที่ {selectedImage?.id}</p>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 text-rose-500 text-5xl hover:scale-110 transition drop-shadow-lg"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>
        </div>
      )}

      <Link
        href="/"
        className="mt-12 text-slate-500 hover:text-rose-500 transition font-prompt flex items-center justify-center gap-2"
      >
        🏠 กลับหน้าหลัก
      </Link>
    </main>
  );
}
