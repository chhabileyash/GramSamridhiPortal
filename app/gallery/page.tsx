"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

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
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || []);
        setLoading(false);
      });
  }, [villageId, isLoaded]);

  return (
    <div className="min-h-screen bg-[#F5F6F7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1F4E79] mb-6">Gallery</h1>
        <p className="mb-8 text-lg text-gray-700">
          A glimpse into the vibrant life and development of our villages.
        </p>
        {loading ? (
          <div className="text-center text-gray-500 py-12">
            Loading images...
          </div>
        ) : images.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No images found.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="mb-6 break-inside-avoid bg-white rounded shadow border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={img.url}
                  alt={img.title || `Gallery Image ${idx + 1}`}
                  className="w-full object-cover hover:scale-[1.03] transition-transform duration-300"
                  style={{ maxHeight: 340, minHeight: 180 }}
                  loading="lazy"
                />
                <div className="p-3 text-center text-[#1F4E79] font-medium text-base border-t border-gray-50 bg-[#FAF9F5]">
                  {img.title || "Untitled"}
                  {img.villageName && (
                    <div className="text-xs text-gray-500 mt-1">
                      {img.villageName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
