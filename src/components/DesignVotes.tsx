// src/components/DesignVotes.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import DesignCard from "./DesignCard";

type Totals = Record<string, number>;

const designs = [
  { id: "classic",     title: "Classic Palm",     src: "/designs/classic.webp" },
  { id: "geometric",   title: "Geometric Glow",   src: "/designs/geometric.webp" },
  { id: "calligraphy", title: "Calligraphy Aura", src: "/designs/calligraphy.webp" },
  { id: "minimal",     title: "Minimal Modern",   src: "/designs/minimal.webp" },
];

export default function DesignVotes() {
  const [likes, setLikes] = useState<Totals>({});
  const [isPending, startTransition] = useTransition();

  // fetch initial totals
  useEffect(() => {
    const ids = designs.map(d => d.id).join(",");
    fetch(`/api/likes?ids=${ids}`, { cache: "no-store" })
      .then(r => r.json())
      .then((data: Totals) => setLikes(data))
      .catch(() => {});
  }, []);

  const likeOne = (id: string) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) return;
        const { likes: n } = await res.json();
        setLikes(prev => ({ ...prev, [id]: n }));
      } catch {}
    });
  };

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="text-xl font-semibold">Vote your favorite design</h3>
        <p className="text-xs text-[var(--muted-fg)]">Tap the heart — votes are public.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {designs.map(d => (
          <DesignCard
            key={d.id}
            id={d.id}
            title={d.title}
            src={d.src}
            likes={likes[d.id] ?? 0}
            onLike={likeOne}
          />
        ))}
      </div>

      {isPending && (
        <p className="mt-2 text-xs text-[var(--muted-fg)]">Saving your vote…</p>
      )}
    </div>
  );
}
