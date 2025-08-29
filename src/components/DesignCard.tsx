// src/components/DesignCard.tsx
"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback } from "react";

type Props = {
  id: string;
  title: string;
  src: string;
  likes: number;
  onLike: (id: string) => void;
};

export default function DesignCard({ id, title, src, likes, onLike }: Props) {
  // ----- Subtle 3D tilt (no extra lib)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 300, damping: 24 });
  const ry = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 300, damping: 24 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }, [px, py]);

  const handleLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative rounded-3xl p-[1.6px] transition-shadow duration-300
                 [background:linear-gradient(140deg,rgba(255,221,160,.8),rgba(201,166,70,.9)_40%,rgba(108,83,38,.9))]
                 shadow-[0_2px_18px_rgba(255,210,130,.12)]
                 hover:shadow-[0_10px_36px_rgba(255,210,130,.23)]"
    >
      {/* Inner card surface */}
      <div className="relative rounded-[calc(theme(borderRadius.3xl)-1.6px)]
                      overflow-hidden bg-[var(--surface)]">
        {/* Frosted title pill */}
        <span
          className="absolute left-3 top-3 z-10 rounded-full border border-white/20
                     bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white
                     backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,.25)]"
        >
          {title}
        </span>

        {/* Image with soft Ken-Burns */}
        <div className="relative aspect-[16/10]">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out
                       group-hover:scale-[1.05]"
            priority={false}
          />
          {/* dark vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_120%_at_50%_0%,transparent_45%,rgba(0,0,0,.35))]" />
        </div>

        {/* Heart chip */}
        <button
          onClick={() => onLike(id)}
          aria-label={`Like ${title}`}
          aria-pressed="false"
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full
                     border border-white/20 bg-white/10 px-3 py-1 text-sm text-white
                     backdrop-blur-md transition-colors hover:bg-white/15"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
            <path d="M12 21s-6.716-4.213-9.142-8.293C1.1 10.31 2.08 7 5.148 7 7.02 7 8.272 8.24 9 9.203 9.728 8.24 10.98 7 12.852 7c3.068 0 4.048 3.31 2.29 5.707C18.716 16.787 12 21 12 21z"/>
          </svg>
          <span className="tabular-nums">{likes}</span>
        </button>
      </div>

      {/* Animated gold shimmer on hover (border highlight) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0
                   transition-opacity duration-500 group-hover:opacity-100
                   [background:radial-gradient(60%_60%_at_80%_0%,rgba(255,238,200,.35),transparent_60%)]" />
    </motion.div>
  );
}
