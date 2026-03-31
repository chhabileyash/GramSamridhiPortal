"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Trash2,
  Image as ImageIcon } from
"lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Sidebar } from "@/shared/components/layout/Sidebar";
import Footer from "@/shared/components/layout/Footer";

type GalleryImage = {
  url: string;
  title?: string;
  type?: string;
  isPrimary?: boolean;
  villageId?: string;
  villageName?: string;
};

export default function GalleryPage() {
  const { user, isLoaded } = useUser();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const meta = user?.unsafeMetadata as any;
  const villageId = meta?.village_id;

  useEffect(() => {
    if (!isLoaded) return;
    let url = "/api/gallery";
    if (villageId) {
      url += `?villageId=${encodeURIComponent(villageId)}`;
    }
    fetch(url).
    then((res) => res.json()).
    then((data) => {
      setImages(data.images || []);
      setLoading(false);
    });
  }, [villageId, isLoaded]);


  const [modalOpen, setModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);

  const openModal = (idx: number) => {
    setCurrentIdx(idx);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    setCurrentIdx(null);
    document.body.style.overflow = "auto";
  };
  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIdx !== null && images.length > 0) {
      setCurrentIdx((prev) => (prev! - 1 + images.length) % images.length);
    }
  };
  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIdx !== null && images.length > 0) {
      setCurrentIdx((prev) => (prev! + 1) % images.length);
    }
  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, currentIdx]);

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        <Sidebar aria-label="Sidebar navigation" />

        <main className="flex-1 p-6 space-y-6 min-w-0 bg-[#f9fafb]">
          <div className="mx-auto max-w-7xl">
            {}
            <section className="bg-white p-8 border-b-4 border-[#1F4E79] shadow-sm rounded-sm mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-[#1F4E79]" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gallery</h1>
              </div>
              <p className="text-gray-600 max-w-2xl">
                A visual journey through our village progress, cultural events, and developmental landmarks. Discover the vibrant spirit of our community.
              </p>
            </section>

            {loading ?
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {[...Array(8)].map((_, i) =>
              <div key={i} className="break-inside-avoid">
                    <Skeleton
                  className={`w-full rounded-sm ${i % 3 === 0 ? "h-64" : i % 2 === 0 ? "h-96" : "h-48"}`} />
                
                  </div>
              )}
              </div> :
            images.length === 0 ?
            <div className="text-center py-20 bg-white border border-gray-100 rounded-sm">
                <ImageIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium tracking-wide">No images found in the gallery.</p>
              </div> :

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {images.map((img, idx) =>
              <div
                key={idx}
                className="group relative break-inside-avoid bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openModal(idx)}>
                
                    <img
                  src={img.url}
                  alt={img.title || `Gallery Image ${idx + 1}`}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  loading="lazy" />
                
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                       <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                          <Maximize2 className="text-white w-6 h-6" />
                       </div>
                    </div>
                  </div>
              )}
              </div>
            }
          </div>
        </main>
      </div>

      <Footer />

      {}
      {modalOpen && currentIdx !== null && images[currentIdx] &&
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closeModal}>
        
          {}
          <button
          className="absolute top-6 right-6 z-[110] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20 group"
          onClick={closeModal}
          aria-label="Close">
          
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>

          {}
          <button
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20 group"
          onClick={showPrev}
          aria-label="Previous">
          
            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
          </button>

          {}
          <button
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20 group"
          onClick={showNext}
          aria-label="Next">
          
            <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
          </button>

          {}
          <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center pointer-events-none" onClick={(e) => e.stopPropagation()}>
            <img
            src={images[currentIdx].url}
            alt={images[currentIdx].title || "Preview"}
            className="max-h-[80vh] w-auto border border-white/10 rounded-sm shadow-2xl pointer-events-auto" />
          
            
            {}
            <div className="mt-4 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white pointer-events-auto flex items-center gap-3">
              <span className="text-sm font-semibold tracking-wide">
                {images[currentIdx].title || "Gallery View"}
              </span>
              <span className="w-px h-4 bg-white/20"></span>
              <span className="text-xs text-white/60 font-medium">
                {currentIdx + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      }
    </div>);

}