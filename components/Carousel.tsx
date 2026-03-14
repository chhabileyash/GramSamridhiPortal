"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1634874706682-3468a6e421ba?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Vibrant Rural Ecosystems",
    description:
      "Modern infrastructure meeting traditional values in the heart of Maharashtra.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1643474004591-35d044e959ea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Digital Empowerment",
    description:
      "Connecting every village to the global digital economy through accessible services.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1647184223407-ef8273a6822c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Sustainable Agriculture",
    description:
      "Promoting eco-friendly farming practices and robust water management.",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="group relative">
      <div className="relative aspect-video w-full overflow-hidden border border-slate-300 bg-white">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              alt={slide.title}
              className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              src={slide.image}
            />
            <div className="absolute right-0 bottom-0 left-0 border-t-4 border-[#e67e22] bg-[#fffffff]/80 p-6 text-white backdrop-blur-sm">
              <div className="mx-auto w-full max-w-300 px-3 sm:px-6 lg:px-8">
                <h3 className="text-lg font-black tracking-tight uppercase sm:text-xl">
                  {slide.title}
                </h3>
                <p className="text-xs font-medium text-slate-300 sm:text-sm">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center border border-slate-300 bg-white/90 text-[#002147] shadow-lg transition-all hover:border-[#002147] hover:bg-[#002147] hover:text-white sm:left-4 sm:size-12"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center border border-slate-300 bg-white/90 text-[#002147] shadow-lg transition-all hover:border-[#002147] hover:bg-[#002147] hover:text-white sm:right-4 sm:size-12"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
