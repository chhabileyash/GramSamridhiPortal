"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

  const handleDelete = async (
    e: React.MouseEvent,
    imgUrl: string,
    imgVillageId: string,
  ) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imgUrl, villageId: imgVillageId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setImages((prev) => prev.filter((img) => img.url !== imgUrl));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    let url = "/api/gallery";
    if (villageId) {
      url += `?villageId=${encodeURIComponent(villageId)}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || []);
        setLoading(false);
      });
  }, [villageId, isLoaded]);

  // Modal state for image preview
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);

  const openModal = (idx: number) => {
    setCurrentIdx(idx);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setCurrentIdx(null);
  };
  const showPrev = () => {
    if (currentIdx !== null && images.length > 0) {
      setCurrentIdx((prev) => (prev! - 1 + images.length) % images.length);
    }
  };
  const showNext = () => {
    if (currentIdx !== null && images.length > 0) {
      setCurrentIdx((prev) => (prev! + 1) % images.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1F4E79] mb-6">Gallery</h1>
        <p className="mb-8 text-lg text-gray-700">
          A glimpse into the vibrant life and development of our villages.
        </p>
        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="mb-6 break-inside-avoid">
                <Skeleton
                  className={`w-full rounded-xl ${i % 3 === 0 ? "h-64" : i % 2 === 0 ? "h-96" : "h-48"}`}
                />
              </div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No images found.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="group relative mb-6 break-inside-avoid bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => openModal(idx)}
              >
                {/* True masonry requires natural image heights */}
                <img
                  src={img.url}
                  alt={img.title || `Gallery Image ${idx + 1}`}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for image preview */}
      {modalOpen && currentIdx !== null && images[currentIdx] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-all"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full mx-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={images[currentIdx].url}
              alt={
                images[currentIdx].title || `Gallery Image ${currentIdx + 1}`
              }
              className="max-h-[80vh] w-auto object-contain rounded-lg mt-8 mb-4"
            />
            <div className="flex justify-between items-center w-full px-6 pb-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-lg font-semibold"
                onClick={showPrev}
                aria-label="Previous image"
              >
                &#8592; Prev
              </button>
              <span className="text-gray-700 text-base font-medium">
                {images[currentIdx].title ||
                  `Image ${currentIdx + 1} of ${images.length}`}
              </span>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-lg font-semibold"
                onClick={showNext}
                aria-label="Next image"
              >
                Next &#8594;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
