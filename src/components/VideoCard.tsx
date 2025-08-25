"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type VideoCardProps = {
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
  className?: string;
};

const easeInOut = [0.22, 1, 0.36, 1] as const;

export default function VideoCard({
  src,
  poster,
  title,
  caption,
  className = "",
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.currentTime > 0.1) v.currentTime = 0;
      v.play().catch(() => {});
    } catch {}
  };

  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.pause();
      v.currentTime = 0;
    } catch {}
  };

  // Ensure we pause/reset if the component unmounts mid-play
  useEffect(() => stop, []);

  return (
    <motion.figure
      role="group"
      aria-label={title || "Video"}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easeInOut },
      }}
      viewport={{ once: true, amount: 0.3 }}
      onHoverStart={play}
      onHoverEnd={stop}
      onFocus={play}
      onBlur={stop}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        preload="metadata"
        onTouchStart={play}
        onEnded={stop}
      />
      {(title || caption) && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <div className="rounded-xl bg-black/35 px-3 py-2 backdrop-blur">
            {title && <h3 className="text-sm font-medium">{title}</h3>}
            {caption && <p className="mt-0.5 text-xs text-white/80">{caption}</p>}
          </div>
        </figcaption>
      )}
    </motion.figure>
  );
}
