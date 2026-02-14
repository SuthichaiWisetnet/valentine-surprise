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
    { id: 14, src: "/13.jpg", alt: "Photo 14" },
    { id: 15, src: "/14.jpg", alt: "Photo 15" },
    { id: 16, src: "/15.png", alt: "Photo 16" },
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-item card-hover rounded-2xl overflow-hidden relative group aspect-square cursor-pointer shadow-md bg-white"
              onClick={() => {
                setSelectedImage(photo);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                unoptimized // Adding unoptimized to avoid potential format issues like before
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white text-3xl font-bold opacity-80">
                  ❤️
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
              <div className="bg-black relative">
                <video controls className="w-full h-auto block">
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4">
                <h3 className="font-prompt text-rose-700 text-lg">
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
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <div className="relative w-full h-[85vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain rounded-lg shadow-2xl"
                sizes="100vw"
                unoptimized
              />
            </div>

            <button
              className="absolute -top-12 right-0 md:-right-12 text-white/80 hover:text-white text-4xl font-bold p-2 hover:bg-white/10 rounded-full transition"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
            >
              ×
            </button>
          </div>
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
