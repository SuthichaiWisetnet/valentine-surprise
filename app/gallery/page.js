"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingHearts from "../components/FloatingHearts";

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    { id: 1, src: "/1.jpg", alt: "Photo 1", rotate: "2deg" },
    { id: 2, src: "/2.jpeg", alt: "Photo 2", rotate: "-1deg" },
    { id: 3, src: "/3.jpeg", alt: "Photo 3", rotate: "1deg" },
    { id: 4, src: "/4.jpeg", alt: "Photo 4", rotate: "-2deg" },
    { id: 5, src: "/5.JPG", alt: "Photo 5", rotate: "3deg" },
    { id: 6, src: "/6.PNG", alt: "Photo 6", rotate: "-1.5deg" },
    { id: 7, src: "/7.PNG", alt: "Photo 7", rotate: "2deg" },
    { id: 8, src: "/8.jpg", alt: "Photo 8", rotate: "-2deg" },
    { id: 9, src: "/9.jpeg", alt: "Photo 9", rotate: "1.5deg" },
    { id: 10, src: "/10.jpeg", alt: "Photo 10", rotate: "-1deg" },
    { id: 11, src: "/11.jpeg", alt: "Photo 11", rotate: "2deg" },
    { id: 12, src: "/12.jpeg", alt: "Photo 12", rotate: "-2deg" },
    { id: 13, src: "/IMG_6198.png", alt: "Special Photo", rotate: "0deg" },
    { id: 14, src: "/13.JPG", alt: "Photo 14", rotate: "2.5deg" },
    { id: 15, src: "/14.jpg", alt: "Photo 15", rotate: "-1.5deg" },
    { id: 16, src: "/15.PNG", alt: "Photo 16", rotate: "1deg" },
  ];

  const videos = [
    {
      id: 1,
      title: "ช่วงเวลาพิเศษ",
      src: "/Special_moments.mp4",
    },
    {
      id: 2,
      title: "ทริปสุดพิเศษ",
      src: "/Trip.mp4",
    },
  ];

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24 overflow-hidden bg-[url('/bg-dot.png')]">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-16 animate-fade-in-up md:pt-8 bg-white/90 p-4 max-w-fit mx-auto shadow-sm rotate-1 relative">
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-full border-l-2 border-dashed border-gray-300"></div>
        <h1 className="text-4xl md:text-6xl font-dancing font-bold text-rose-800 mb-2">
          Our Album 📸
        </h1>
        <p className="text-slate-600 font-handwriting text-xl">
          เก็บรวบรวมทุกรอยยิ้มของเรา
        </p>
      </div>

      {/* Photo Gallery - Polaroid Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-20 overflow-visible">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-8 p-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="break-inside-avoid relative group cursor-pointer animate-fade-in-up inline-block w-full"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              onClick={() => {
                setSelectedImage(photo);
                setLightboxOpen(true);
              }}
            >
              <div className="polaroid" style={{ "--rotation": photo.rotate }}>
                {/* Optional: Tape on some photos */}
                {index % 3 === 0 && <div className="tape"></div>}

                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={500}
                  height={500}
                  className="polaroid-img"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  unoptimized
                />
                <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-handwriting text-slate-500 text-lg">
                    My Love ❤️
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="max-w-5xl mx-auto mt-12 animate-slide-up pb-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-dancing font-bold text-slate-700 inline-block border-b-2 border-rose-300 pb-2">
            🎥 วิดีโอของเรา
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 px-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white p-4 shadow-md rotate-1 hover:rotate-0 transition-transform duration-300 border border-gray-100"
            >
              <div className="absolute -top-3 w-24 h-6 bg-rose-100/50 left-1/2 -translate-x-1/2 -rotate-1 shadow-sm z-10"></div>
              <div className="overflow-hidden bg-black/5 relative aspect-video">
                <video controls className="w-full h-full object-cover">
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-handwriting text-2xl text-rose-800 font-bold">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox - Simple Clean */}
      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <div className="polarioid-open bg-white p-4 pb-16 shadow-2xl transform rotate-1">
              <div className="relative w-full h-auto max-h-[80vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={800}
                  height={800}
                  className="object-contain max-h-[70vh] w-auto mx-auto border border-gray-200"
                  unoptimized
                />
              </div>
            </div>

            <button
              className="mt-8 px-6 py-2 bg-white text-slate-800 rounded-full font-prompt hover:bg-rose-50 transition shadow-lg flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
            >
              ✕ ปิด
            </button>
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
