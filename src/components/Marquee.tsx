"use client";
import React from "react";

type MarqueeProps = {
  items: string[];
  speed?: number;        // seconds per loop
  className?: string;
};

export default function Marquee({ items, speed = 14, className = "" }: MarqueeProps) {
  const loop = [...items, ...items, ...items]; // seamless

  return (
    <div
      className={`ep-marquee overflow-hidden border-t border-[var(--border)]/40 bg-[var(--surface)] ${className}`}
      data-role="marquee"
    >
      <div className="ep-track whitespace-nowrap flex gap-8 py-3">
        {loop.map((txt, i) => (
          <span key={i} className="ep-marquee-item uppercase tracking-wide text-sm md:text-base">
            {txt}
          </span>
        ))}
      </div>

      <style jsx>{`
        .ep-track { animation: marquee var(--speed, ${speed}s) linear infinite; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
