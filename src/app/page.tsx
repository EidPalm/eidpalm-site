"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Globe, ShoppingCart, Languages, Leaf } from "lucide-react";

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

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight text-white">
          <Leaf className="h-5 w-5 text-amber-400" />
          <span>Eid Palm</span>
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

function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section id="top" ref={ref} className="relative min-h-[92vh] w-full overflow-hidden bg-neutral-950 text-white">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_70%_20%,rgba(250,204,21,0.25),transparent_60%),radial-gradient(40%_60%_at_20%_80%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col items-start justify-center gap-6 px-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Introducing the Eid Palm
        </span>
        <KineticHeadline text="Reimagine Eid. Make it unforgettable." />
        <p className="max-w-2xl text-pretty text-base text-white/80 md:text-lg">
          A centerpiece for modern celebrations — a 1.8 m artificial palm with light-filled calligraphy cutouts and
          customizable <em>Zena</em> accessories. Designed for homes, majlis, and public spaces.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <MagneticCTA href="#preorder">Preorder now</MagneticCTA>
          <a href="#showcase" className="group inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-white/80 ring-1 ring-white/10 hover:text-white">
            Watch teaser <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  );
}

function Showcase() {
  const items = [
    {
      title: "Zena Collection",
      metric: "100+",
      caption: "handcrafted ornaments",
      body: "Curate your tree with iconic Islamic & Arabian motifs. Gold-finish, balanced weight, nearly invisible threads.",
    },
    {
      title: "PalmMena App",
      metric: "1",
      caption: "tap to change lights",
      body: "Switch light scenes, schedule evenings, and unlock stories behind each Zena via QR — all in one app.",
    },
    {
      title: "Sizes & Builds",
      metric: "1.8 m",
      caption: "standard height",
      body: "Standard for homes; custom builds for hotels & malls. Safe, durable materials with a warm interior glow.",
    },
    {
      title: "Education Mode",
      metric: "200+",
      caption: "micro-lessons",
      body: "Each ornament can teach — geography, food, architecture — through bite-sized AR-ready stories.",
    },
  ];

  return (
    <section id="showcase" className="relative bg-neutral-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-bold md:text-5xl">Showcase</h2>
          <span className="text-sm text-white/60">Swipe / scroll →</span>
        </div>
      </div>

      <div className="no-scrollbar relative mx-auto max-w-[96vw] overflow-x-auto px-4">
        <ul className="flex snap-x snap-mandatory gap-4">
          {items.map((it, i) => (
            <li
              key={i}
              className="group relative aspect-[16/10] w-[86vw] max-w-3xl shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 md:w-[62vw]"
            >
              <div className="absolute inset-0 opacity-60 [background:radial-gradient(70%_60%_at_80%_30%,rgba(250,204,21,0.16),transparent_70%),radial-gradient(40%_50%_at_10%_80%,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold md:text-3xl">{it.title}</h3>
                  <p className="mt-2 max-w-md text-sm text-white/70">{it.body}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-amber-400 md:text-6xl">{it.metric}</span>
                  <span className="text-sm uppercase tracking-wider text-white/70">{it.caption}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-neutral-950 py-28 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(250,204,21,0.12),transparent_60%)]" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-12 md:items-center">
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
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-800">
            <div className="flex h-full items-center justify-center p-8 text-center text-white/70">
              (Video teaser placeholder)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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
    <section id="features" className="bg-neutral-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-4">
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
      </div>
    </section>
  );
}

function Preorder() {
  return (
    <section id="preorder" className="relative overflow-hidden bg-white py-24 text-neutral-900">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(60%_60%_at_60%_40%,rgba(245,158,11,0.15),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <h2 className="text-3xl font-bold md:text-5xl">Preorder Eid Palm</h2>
            <p className="mt-3 max-w-prose text-neutral-700">
              Be among the first to welcome the Eid Palm into your home. Limited early batch with special Zena set.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticCTA href="#contact">Reserve yours</MagneticCTA>
              <a href="#features" className="rounded-2xl px-5 py-3 text-neutral-700 ring-1 ring-neutral-300 hover:bg-neutral-50">
                Learn more
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="aspect-[4/3] w-full rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-200" />
          </div>
        </div>
      </div>
    </section>
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
                <a className="hover:text-white" href="mailto:hello@eidpalm.com">
                  hello@eidpalm.com
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="tel:+971000000000">
                  +971 00 000 0000
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
      <Hero />
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

