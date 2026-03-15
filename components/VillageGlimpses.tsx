"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type VillagePhoto = {
  title: string;
  description: string;
  image: string;
};

type VillageGlimpsesProps = {
  villageName: string;
  photos: VillagePhoto[];
};

export default function VillageGlimpses({
  villageName,
  photos,
}: VillageGlimpsesProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const openPreview = (index: number) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);

  const showPrev = () => {
    if (previewIndex === null) return;
    setPreviewIndex((previewIndex - 1 + photos.length) % photos.length);
  };

  const showNext = () => {
    if (previewIndex === null) return;
    setPreviewIndex((previewIndex + 1) % photos.length);
  };

  useEffect(() => {
    if (previewIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewIndex]);

  if (!photos.length) return null;

  const activePhoto = previewIndex !== null ? photos[previewIndex] : null;

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 animate-[fadeUp_850ms_ease-out] [animation-fill-mode:both]">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f58320]">
            Village Glimpses
          </p>
          <h2 className="text-3xl font-extrabold uppercase text-[#082b57]">
            Life Around {villageName}
          </h2>
          <p className="text-sm text-green-700 md:text-base">
            A visual overview of landmarks, landscapes, and day-to-day life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <button
            type="button"
            onClick={() => openPreview(0)}
            className="group relative overflow-hidden border border-green-200 bg-white text-left shadow-sm lg:col-span-7"
          >
            <img
              src={photos[0].image}
              alt={photos[0].title}
              loading="lazy"
              className="h-80 w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/30 to-transparent p-5 text-white md:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-green-200">
                Featured
              </p>
              <h3 className="mt-1 text-xl font-bold uppercase md:text-2xl">
                {photos[0].title}
              </h3>
              <p className="mt-1 text-sm text-green-100/90">
                {photos[0].description}
              </p>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            {photos.slice(1, 5).map((photo, localIndex) => {
              const actualIndex = localIndex + 1;

              return (
                <button
                  key={photo.title}
                  type="button"
                  onClick={() => openPreview(actualIndex)}
                  className="group relative overflow-hidden border border-green-200 bg-white text-left shadow-sm"
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="h-38 w-full object-cover transition duration-500 group-hover:scale-105 md:h-50"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/25 to-transparent px-3 py-2.5 text-white md:px-4">
                    <h3 className="line-clamp-1 text-xs font-bold uppercase tracking-wide md:text-sm">
                      {photo.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activePhoto && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Village image preview"
          onClick={closePreview}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              className="max-h-[78vh] w-full border border-white/20 object-contain bg-black"
            />

            <button
              type="button"
              onClick={closePreview}
              className="absolute right-2 top-2 inline-flex size-10 items-center justify-center bg-black/60 text-white transition hover:bg-black"
              aria-label="Close preview"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center bg-black/60 text-white transition hover:bg-black"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center bg-black/60 text-white transition hover:bg-black"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>

            <div className="border border-t-0 border-white/20 bg-black/70 px-4 py-3 text-white">
              <p className="text-sm font-bold uppercase tracking-wide">
                {activePhoto.title}
              </p>
              <p className="text-sm text-stone-100">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
