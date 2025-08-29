"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Sparkles,
  Languages,
  ShoppingCart,
  Star,
  Shield,
  Wand2,
  SunMedium,
} from "lucide-react";

type Item = { icon: React.ReactNode; title: string };

/**
 * FeatureMosaic
 * - Renders 4 or 8 “zellige”-style tiles.
 * - Uses Tailwind CSS tokens from your theme (var(--surface), var(--border), var(--accent-gold)).
 *
 * Usage:
 *   <FeatureMosaic />         // defaults to 8
 *   <FeatureMosaic count={8} />
 *   <FeatureMosaic count={4} />
 */
export default function FeatureMosaic({ count = 8 }: { count?: 4 | 8 }) {
  const base: Item[] = [
    { icon: <Globe className="h-5 w-5" />, title: "Global-ready" },
    { icon: <Sparkles className="h-5 w-5" />, title: "Light scenes" },
    { icon: <Languages className="h-5 w-5" />, title: "Arabic + English" },
    { icon: <ShoppingCart className="h-5 w-5" />, title: "Preorder" },
    // Extra four for the 8-tile layout
    { icon: <Shield className="h-5 w-5" />, title: "Safe materials" },
    { icon: <Wand2 className="h-5 w-5" />, title: "Modular builds" },
    { icon: <Star className="h-5 w-5" />, title: "App + voice control" },
    { icon: <SunMedium className="h-5 w-5" />, title: "Sustainable LEDs" },
  ];

  const items = base.slice(0, count);

  return (
    <div
      className="grid gap-4 md:grid-cols-4"
      role="list"
      aria-label="Eid Palm feature highlights"
    >
      {items.map((it, i) => (
        <motion.div
          role="listitem"
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.03, duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
        >
          {/* subtle “zellige”/mosaic dot pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              background:
                "radial-gradient(circle at 8px 8px, rgba(240,179,35,.25) 1.25px, transparent 1.25px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-[var(--accent-gold)]">{it.icon}</span>
            <span className="font-medium">{it.title}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
