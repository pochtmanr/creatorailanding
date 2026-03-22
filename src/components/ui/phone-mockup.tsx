"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface PhoneMockupProps {
  images: { src: string; alt: string }[];
}

export function PhoneMockup({ images }: PhoneMockupProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative mx-auto w-[280px] md:w-[300px]">
      {/* iPhone Frame */}
      <div className="relative rounded-[3rem] border-[6px] border-surface-container-highest bg-surface-container-lowest p-1 shadow-2xl shadow-primary/10">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 mx-auto w-28 h-6 bg-surface-container-highest rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="relative rounded-[2.4rem] overflow-hidden aspect-[9/19.5] bg-surface-container">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="300px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === current
                  ? "bg-primary-container w-6"
                  : "bg-on-surface/20 hover:bg-on-surface/40"
              }`}
              aria-label={`Show screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
