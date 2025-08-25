"use client";
import React from "react";

type MarqueeProps = {
  items: string[];
};

export default function Marquee({ items }: MarqueeProps) {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-neutral-950">
      <div className="marquee whitespace-nowrap py-3 text-sm text-white/70">
        {items.concat(items).map((w, i) => (
          <span key={i} className="mx-6 inline-block">
            {w}
          </span>
        ))}
      </div>
      <style jsx>{`
        .marquee {
          display: inline-block;
          animation: marquee 18s linear infinite;
          will-change: transform;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
