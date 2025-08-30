"use client";
import React, { useEffect, useRef } from "react";

export type VideoCardProps = {
  src: string;
  poster?: string;
  className?: string;
};

export default function VideoCard({ src, poster, className }: VideoCardProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const over = () => { try { v.play(); } catch {} };
    const out = () => { v.pause(); v.currentTime = 0; };
    v.addEventListener("mouseenter", over);
    v.addEventListener("mouseleave", out);
    v.addEventListener("touchstart", over, { passive: true });
    v.addEventListener("touchend", out);
    return () => {
      v.removeEventListener("mouseenter", over);
      v.removeEventListener("mouseleave", out);
      v.removeEventListener("touchstart", over as any);
      v.removeEventListener("touchend", out as any);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      playsInline
      preload="metadata"
      poster={poster}
      className={`block h-full w-full object-cover ${className ?? ""}`}
      src={src}
    />
  );
}
