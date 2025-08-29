"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CountMap = Record<string, number>;

const designs = [
  { id: "classic",     title: "Classic Palm",     file: "classic.webp",     alt: "Classic Eid Palm design" },
  { id: "geometric",   title: "Geometric Glow",   file: "geometric.webp",   alt: "Geometric Eid Palm design" },
  { id: "calligraphy", title: "Calligraphy Aura", file: "calligraphy.webp", alt: "Calligraphy Eid Palm design" },
  { id: "minimal",     title: "Minimal Modern",   file: "minimal.webp",     alt: "Minimal Eid Palm design" },
];

export default function DesignVotes() {
  const [counts, setCounts] = useState<CountMap>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("eidpalm_likes") || "{}");
    setLiked(saved);
    const ids = designs.map((d) => d.id).join(",");
    fetch(`/api/likes?ids=${ids}`)
      .then((r) => r.json())
      .then((data: CountMap) => setCounts(data))
      .catch(() => {});
  }, []);

  function markLiked(id: string) {
    const next = { ...liked, [id]: true };
    setLiked(next);
    localStorage.setItem("eidpalm_likes", JSON.stringify(next));
  }

  async function onLike(id: string) {
    if (liked[id]) return;
    setCounts((c) => ({ ...c, [id]: (c[id] || 0) + 1 })); // optimistic
    markLiked(id);

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        const { count } = await res.json();
        setCounts((c) => ({ ...c, [id]: count }));
      }
    } catch {
      // keep optimistic value on failure
    }
  }

  return (
    <div className="mt-10">
      <div className="mb-3 flex items-end justify-between">
        <h3 className="text-xl font-semibold">Vote your favorite design</h3>
        <p className="text-xs text-[var(--muted-fg)]">Tap the heart — votes are public.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {designs.map((d) => (
          <div
            key={d.id}
            className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={`/designs/${d.file}`}
                alt={d.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              />
            </div>

            <div className="absolute left-3 top-3 rounded-lg bg-black/35 px-2 py-1 text-xs text-white">
              {d.title}
            </div>

            <button
              onClick={() => onLike(d.id)}
              aria-pressed={liked[d.id] ? true : false}
              title={liked[d.id] ? "You liked this" : "Like this design"}
              className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1.5 text-white backdrop-blur-md ring-1 ring-white/30 hover:bg-black/65 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
            >
              <Heart className={`h-4 w-4 ${liked[d.id] ? "fill-current text-[var(--accent-gold)]" : ""}`} />
              <span className="text-xs tabular-nums">{counts[d.id] ?? 0}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
