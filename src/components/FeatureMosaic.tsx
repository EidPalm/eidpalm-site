"use client";
import React from "react";
import { Globe, Sparkles, Languages, ShoppingCart, Star, Sun, Shield, Trees } from "lucide-react";
import { motion } from "framer-motion";

type Item = { icon: React.ReactNode; label: string };

export default function FeatureMosaic({ count = 8 }: { count?: number }) {
  const items: Item[] = [
    { icon: <Globe className="h-5 w-5" />, label: "Global-ready" },
    { icon: <Sparkles className="h-5 w-5" />, label: "Light scenes" },
    { icon: <Languages className="h-5 w-5" />, label: "Arabic + English" },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "Preorder" },
    { icon: <Sun className="h-5 w-5" />, label: "Warm glow" },
    { icon: <Star className="h-5 w-5" />, label: "Festive details" },
    { icon: <Shield className="h-5 w-5" />, label: "Safe materials" },
    { icon: <Trees className="h-5 w-5" />, label: "Timeless form" },
  ].slice(0, count);

  return (
    <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)]/60 p-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-2xl p-4 ring-1 ring-[var(--border)]/60"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
          >
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(20px 20px at 20px 20px, rgba(255,255,255,.08) 2px, transparent 2px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 flex items-center gap-3 text-[var(--foreground)]">
              <span className="text-[var(--accent-gold)]">{it.icon}</span>
              <span className="font-medium">{it.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
