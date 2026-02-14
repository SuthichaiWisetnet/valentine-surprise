"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingHearts from "../components/FloatingHearts";

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    { id: 1, src: "/1.jpg", alt: "Photo 1" },
    { id: 2, src: "/2.jpeg", alt: "Photo 2" },
    { id: 3, src: "/3.jpeg", alt: "Photo 3" },
    { id: 4, src: "/4.jpeg", alt: "Photo 4" },
    { id: 5, src: "/5.JPG", alt: "Photo 5" },
    { id: 6, src: "/6.PNG", alt: "Photo 6" },
    { id: 7, src: "/7.PNG", alt: "Photo 7" },
    { id: 8, src: "/8.jpg", alt: "Photo 8" },
    { id: 9, src: "/9.jpeg", alt: "Photo 9" },
    { id: 10, src: "/10.jpeg", alt: "Photo 10" },
    { id: 11, src: "/11.jpeg", alt: "Photo 11" },
    { id: 12, src: "/12.jpeg", alt: "Photo 12" },
    { id: 13, src: "/IMG_6198.png", alt: "Special Photo" },
    { id: 14, src: "/13.JPG", alt: "Photo 14" },
    { id: 15, src: "/14.jpg", alt: "Photo 15" },
    { id: 16, src: "/15.PNG", alt: "Photo 16" },
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
    <main className="relative z-10 min-h-screen px-4 py-8 pb-24 overflow-hidden">
      <FloatingHearts />

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up md:pt-8">
        <h1 className="text-4xl md:text-7xl font-dancing font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-4">
          📸 <span className="text-gradient drop-shadow-none">แกลเลอรี่</span>
          ความทรงจำ
        </h1>
        <div className="glass inline-block px-6 py-2 rounded-full">
          <p className="text-rose-700 font-prompt text-lg font-medium">
            รวมภาพประทับใจของเรา 💕
          </p>
        </div>
      </div>

      {/* Photo Gallery Masonry */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="break-inside-avoid relative group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                setSelectedImage(photo);
                setLightboxOpen(true);
              }}
            >
              <div className="glass-card overflow-hidden p-2 transform transition-all duration-300 group-hover:rotate-1 group-hover:scale-[1.02]">
                <div className="relative rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-3xl animate-bounce">
                      ❤️
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="max-w-5xl mx-auto mt-12 animate-slide-up pb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-dancing font-bold text-rose-800 drop-shadow-sm mb-2 bg-white/40 backdrop-blur-sm inline-block px-8 py-2 rounded-full">
            🎥 วิดีโอความทรงจำ
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="glass-card p-4 group transition-all duration-300 hover:shadow-xl"
            >
              <div className="rounded-xl overflow-hidden shadow-lg border border-white/20 relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                <video controls className="w-full h-auto block relative z-0">
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-dancing text-2xl text-rose-800 font-bold group-hover:text-rose-600 transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            {/* Glossy Image Container */}
            <div className="relative w-full h-[80vh] p-2 glass rounded-2xl shadow-[0_0_50px_rgba(255,107,157,0.3)]">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  unoptimized
                />
              </div>
            </div>

            <button
              className="mt-6 px-8 py-3 bg-white/20 hover:bg-white/40 border border-white/50 text-white rounded-full font-prompt transition backdrop-blur-md flex items-center gap-2 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
            >
              <span>ปิด</span> ✕
            </button>
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
