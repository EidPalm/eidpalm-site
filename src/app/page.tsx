"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Globe, ShoppingCart, Languages } from "lucide-react";
import Marquee from "../components/Marquee";
import VideoCard from "../components/VideoCard";

/* === Section wrapper for consistent layout === */
const Section = ({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className={`mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8 ${className}`}>
    {children}
  </section>
);

/* === Motion variants === */
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

/* === VideoCard typing (avoid `any`) === */
type VideoCardProps = {
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
  className?: string;
};
const VCard = VideoCard as React.ComponentType<VideoCardProps>;

/**
 * Eid Palm — Ragged Edge–style Landing (v0.1)
 * Built for Next.js App Router + Tailwind + Framer Motion.
 * Sections: Header, Hero, Story, Showcase, Features, Preorder, Footer
 */

const navItems = [
  { label: "Story", href: "#story" },
  { label: "Showcase", href: "#showcase" },
  { label: "Features", href: "#features" },
  { label: "Preorder", href: "#preorder" },
  { label: "Contact", href: "#contact" },
];

function useHeaderActive() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function MagneticCTA({ children, href = "#preorder" }: { children: React.ReactNode; href?: string }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <a href={href} className="inline-block">
      <motion.button
        ref={ref}
        className="group relative overflow-hidden rounded-2xl px-6 py-3 font-semibold tracking-wide shadow-sm ring-1 ring-white/10 backdrop-blur-md bg-gradient-to-br from-amber-400/80 to-yellow-600/80 text-black hover:shadow-lg"
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          setPos({ x, y });
        }}
        onMouseLeave={() => setPos({ x: 0, y: 0 })}
        animate={{ x: pos.x * 0.06, y: pos.y * 0.06 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </span>
        <motion.span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
        />
      </motion.button>
    </a>
  );
}

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-overlay"
      style={{
        backgroundImage:
          "radial-gradient(transparent 0, rgba(0,0,0,.07) 100%), url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27128%27 height=%27128%27><filter id=%27n%27><feTurbulence baseFrequency=%270.8%27 type=%27fractalNoise%27 numOctaves=%272%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.25%27/></svg>')",
        backgroundSize: "cover, 128px 128px",
      }}
    />
  );
}

function KineticHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="leading-[0.95] font-extrabold tracking-tight text-balance">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <motion.span
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="show"
            className="inline-block mr-3 text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function Header() {
  const scrolled = useHeaderActive();
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled ? "backdrop-blur-md bg-neutral-900/60 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3"><a href="/" className="flex items-center gap-2 font-semibold tracking-tight text-white">
  <img src="/eidpalm-logo.svg" alt="Eid Palm" className="h-7 w-auto drop-shadow-[0_1px_1.5px_rgba(0,0,0,.7)]" />
  <span className="sr-only">Eid Palm</span>
</a>

        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-white/80 hover:text-white transition-colors">
              {n.label}
            </a>
          ))}
          <a href="#preorder" className="text-sm font-medium text-amber-400 hover:text-amber-300">
            Preorder
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Language" className="rounded-xl p-2 text-white/70 hover:text-white">
            <Languages className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* === Show real hover video tiles using <VideoCard> === */
type Tile = { src: string; title: string; caption: string };

function Showcase() {
  const tiles: Tile[] = [
    { src: "/tile-1.mp4", title: "Zena Collection", caption: "Hover or tap to play" },
    { src: "/tile-2.mp4", title: "PalmMena App", caption: "Hover or tap to play" },
    { src: "/tile-3.mp4", title: "Sizes & Builds", caption: "Hover or tap to play" },
  ];

  return (
    <Section id="showcase" className="relative bg-neutral-950 py-20 text-white">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-3xl font-bold md:text-5xl">Showcase</h2>
        <span className="text-sm text-white/60">Hover or tap to play</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tiles.map((t, i) => (
          <VCard key={i} src={t.src} title={t.title} caption={t.caption} className="aspect-[16/10]" />
        ))}
      </div>
    </Section>
  );
}

function Story() {
  return (
    <Section id="story" className="relative overflow-hidden bg-neutral-950 py-28 text-white">
      {/* soft radial accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(250,204,21,0.12),transparent_60%)]" />

      <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
        <motion.div
          className="md:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm uppercase tracking-wider text-amber-400">The Legend</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">From desert myth to modern ritual</h2>
          <p className="mt-4 text-white/80">
            Born from a treasure unearthed in a sandstorm, the Eid Palm brings a radiant beam of celebration into your
            space. It’s the centerpiece where families gather, stories glow, and traditions evolve.
          </p>
        </motion.div>

        <motion.div
          className="md:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Story teaser video (right column) */}
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 shadow-lg">
            <video
              key="/legend-teaser-v2.mp4"
              className="h-full w-full object-cover"
              src="/legend-teaser-v2.mp4"
              poster="/legend-teaser-fallback.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Eid Palm story teaser"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/20 ring-1 ring-white/10" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Features() {
  const feats = [
    { icon: <Globe className="h-5 w-5" />, title: "Global-ready", text: "Built for homes & venues across the GCC and beyond." },
    { icon: <Sparkles className="h-5 w-5" />, title: "Light scenes", text: "Warm interior glow and app-controlled presets." },
    { icon: <Languages className="h-5 w-5" />, title: "Arabic + English", text: "Switchable content and RTL-friendly layout." },
    { icon: <ShoppingCart className="h-5 w-5" />, title: "Preorder", text: "Secure your tree and Zena sets ahead of Eid." },
  ];

  return (
    <Section id="features" className="bg-neutral-950 py-24 text-white">
      <h2 className="text-3xl font-bold md:text-5xl">Design that celebrates</h2>
      <p className="mt-3 max-w-2xl text-white/70">
        Elegant by day, radiant by night. Engineered with safe materials and a timeless silhouette. Make Eid the
        center of your space — beautifully.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
        {feats.map((f, i) => (
          <motion.div
            key={i}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-800 p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <div className="mb-3 text-amber-400">{f.icon}</div>
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-white/70">{f.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Preorder() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const FORM_ENDPOINT = "https://formspree.io/f/movnalpw"; // TODO: move to NEXT_PUBLIC_FORMSPREE_ENDPOINT

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_subject", "Eid Palm Preorder");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="preorder" className="relative overflow-hidden bg-white py-24 text-neutral-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_60%_40%,rgba(245,158,11,0.15),transparent_60%)]" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-bold md:text-5xl">Preorder Eid Palm</h2>
          <p className="mt-3 max-w-prose text-neutral-700">
            Be among the first to welcome the Eid Palm into your home. Limited early batch with special Zena set.
          </p>

          {/* The actual form */}
          <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-2 max-w-lg" noValidate>
            <input
              name="name"
              placeholder="Full name"
              required
              autoComplete="name"
              className="rounded-xl bg-neutral-100 text-neutral-900 placeholder-neutral-500 px-4 py-3 outline-none border border-neutral-200"
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
              autoComplete="email"
              className="rounded-xl bg-neutral-100 text-neutral-900 placeholder-neutral-500 px-4 py-3 outline-none border border-neutral-200"
            />
            {/* Honeypot */}
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

            <button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              className="sm:col-span-2 rounded-xl px-5 py-3 font-medium bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Reserve my spot"}
            </button>

            {/* SR-friendly live region for form status */}
            <div aria-live="polite" aria-atomic="true" className="sm:col-span-2 min-h-[1.25rem]">
              {status === "success" && (
                <p className="text-xs text-emerald-600">Thanks! We’ll email you when preorders open.</p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-600">Sorry—something went wrong. Please try again.</p>
              )}
            </div>

            <p className="text-xs text-neutral-500 sm:col-span-2">
              We’ll only use your email to notify you about preorder availability.
            </p>
          </form>

          <a
            href="#features"
            className="mt-4 inline-block rounded-2xl px-5 py-3 text-neutral-700 ring-1 ring-neutral-300 hover:bg-neutral-50"
          >
            Learn more
          </a>
        </div>

        <div className="md:col-span-5">
          <div className="aspect-[4/3] w-full rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-200" />
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-neutral-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <Leaf className="h-5 w-5 text-amber-400" />
              Eid Palm
            </div>
            <p className="mt-3 max-w-sm text-white/70">Culture Element LLC · UAE & GCC</p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Get in touch</h4>
            <ul className="space-y-1 text-white/80">
              <li>
                <a className="hover:text-white" href="mailto:halla@eidpalm.com">
                  halla@eidpalm.com
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="tel:+971555166112">
                  +971 55 516 6112
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Links</h4>
            <ul className="space-y-1 text-white/80">
              <li>
                <a className="hover:text-white" href="#story">
                  Story
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#showcase">
                  Showcase
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#preorder">
                  Preorder
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-white/60">
          <p>© {new Date().getFullYear()} Culture Element LLC</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#">
              Privacy
            </a>
            <a className="hover:text-white" href="#">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function EidPalmLanding() {
  return (
    <main className="bg-neutral-950 text-white selection:bg-amber-300/40 selection:text-white">
      <Grain />
      <Header />

      {/* === HERO (teaser-v2 video + text overlay) === */}
      <section
        id="hero"
        className="relative isolate aspect-[16/9] w-full overflow-hidden edge-slant-bottom"
        aria-label="Eid Palm Hero"
      >
        {/* Video background */}
        <video
          className="absolute inset-0 h-full w-full object-cover z-0"
          src="/teaser-v2.mp4"
          poster="/teaser-fallback.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Readability gradient over video */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-black/70 via-black/25 to-transparent" />
        {/* Text overlay */}
        <div className="relative z-20 mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8 py-12 sm:py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
            Unforgettable Moments &amp; More
          </h1>
        </div>
      </section>

      {/* === MARQUEE === */}
<Marquee
  items={[
    "Celebrate",
    "Heritage",
    "Modern",
    "Togetherness",
    "Elegant",
    "Play",
    "Educational",
    "Roots",
    "Interactive",
    "Joyful",
    "Community",
    "Modular",
    "Colorful",
    "Secure",
    "Traditional",
    "Personalized",
    "Ambient",
    "Pride",
    "Interchangeable",
    "Legacy",
    "Fun",
    "Sustainable",
  ]}
/>

      <Story />
      <Showcase />
      <Features />
      <Preorder />
      <Footer />

      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>
    </main>
  );
}
