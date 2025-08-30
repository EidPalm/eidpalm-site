"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Globe,
  ShoppingCart,
  Languages,
  Instagram,
  Linkedin,
  Facebook,
  Twitter
} from "lucide-react";

import Marquee from "../components/Marquee";
import VideoCard from "../components/VideoCard";
import FeatureMosaic from "../components/FeatureMosaic";
import DesignVotes from "../components/DesignVotes";

/* ---------- Small modal used in Story / Preorder / Footer ---------- */
function Modal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center">
      <button className="absolute inset-0 bg-black/70" onClick={onClose} aria-label="Close" />
      <div className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)]/60 px-5 py-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="rounded-lg px-3 py-1 ring-1 ring-[var(--border)] hover:bg-[var(--surface)]" onClick={onClose}>Close</button>
        </div>
        <div className="p-5 text-sm text-[var(--muted-fg)]">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Section wrapper ---------- */
type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  className?: string;
  children: React.ReactNode;
};
const Section = ({ id, className = "", children, ...rest }: SectionProps) => (
  <section id={id} className={`mx-auto max-w-screen-xl px-6 md:px-10 ${className}`} {...rest}>
    {children}
  </section>
);

/* ---------- Header with nav ---------- */
const navItems = [
  { label: "Story", href: "#story" },
  { label: "Showcase", href: "#showcase" },
  { label: "Features", href: "#features" },
  { label: "Votes", href: "#votes" },   // NEW
  { label: "Preorder", href: "#preorder" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "backdrop-blur-md bg-[color:rgba(11,21,18,0.60)] border-b border-[var(--border)]" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8 py-3">
        {/* Brand (nudged right via container padding) */}
        <a href="/" className="flex items-center gap-2 font-semibold tracking-tight text-[var(--foreground)]">
          <img src="/eidpalm-logo-v2.svg" alt="Eid Palm" className="h-10 md:h-12 w-auto drop-shadow-[0_1px_1.5px_rgba(0,0,0,.7)]" />
          <span className="sr-only">Eid Palm</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((n) => (
            <a key={n.href} href={n.href}
               className={n.label === "Preorder" ? "text-sm font-medium text-[var(--accent-gold)] hover:text-[var(--foreground)] transition-colors"
                                                  : "text-sm text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors"}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Language" className="rounded-xl p-2 text-[var(--muted-fg)] hover:text-[var(--foreground)]">
            <Languages className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Grain() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-overlay"
         style={{
           backgroundImage:
             "radial-gradient(transparent 0, rgba(0,0,0,.07) 100%), url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27128%27 height=%27128%27><filter id=%27n%27><feTurbulence baseFrequency=%270.8%27 type=%27fractalNoise%27 numOctaves=%272%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.25%27/></svg>')",
           backgroundSize: "cover, 128px 128px",
         }}/>
  );
}

/* ---------- Showcase ---------- */
type Tile = { src: string; title: string; caption: string };
function Showcase() {
  const tiles: Tile[] = [
    { src: "/tile-1.mp4", title: "Zena Collection", caption: "Hover to play" },
    { src: "/tile-2.mp4", title: "PalmMena App", caption: "Hover to play" },
    { src: "/tile-3.mp4", title: "Sizes & Builds", caption: "Hover to play" },
  ];
  return (
    <Section id="showcase" className="relative bg-[var(--background)] py-20 text-[var(--foreground)]">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-3xl font-bold md:text-5xl">Showcase</h2>
        <span className="text-sm text-[var(--muted-fg)]">Hover to play</span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiles.map((t, i) => (
          <div key={i} className="group">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
              <VideoCard src={t.src} className="h-full w-full" />
            </div>
            <div className="mt-3 text-sm">
              <div className="font-medium">{t.title}</div>
              <div className="text-[var(--muted-fg)]">{t.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Story (with modal CTA) ---------- */
function Story() {
  const [open, setOpen] = useState(false);
  return (
    <Section id="story" className="relative overflow-hidden bg-[var(--background)] py-28 text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(245,158,11,0.12),transparent_60%)]" />
      <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <p className="text-sm uppercase tracking-wider text-[var(--accent-gold)]">The Legend</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">From desert myth to modern ritual</h2>
          <p className="mt-4 text-[var(--muted-fg)]">
            Born from a treasure unearthed in a sandstorm, the Eid Palm brings a radiant beam of celebration into your
            space. It’s the centerpiece where families gather, stories glow, and traditions evolve.
          </p>
          <button onClick={() => setOpen(true)}
                  className="mt-4 inline-block rounded-2xl px-5 py-3 text-[var(--muted-fg)] ring-1 ring-[var(--border)] hover:bg-[var(--surface)]">
            Learn more
          </button>
        </div>
        <div className="md:col-span-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
            <video className="h-full w-full object-cover" src="/legend-teaser-v2.mp4" poster="/legend-teaser-fallback.jpg" autoPlay muted loop playsInline />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/20 ring-1 ring-[var(--ring)]" />
          </div>
        </div>
      </div>

      <Modal title="The origin" open={open} onClose={() => setOpen(false)}>
        <p>
          A short brand story goes here. Replace with the real copy. You can add photos, bullet points,
          and a preorder link if you’d like.
        </p>
      </Modal>
    </Section>
  );
}

/* ---------- Features (mosaic only) ---------- */
function Features() {
  return (
    <Section id="features" className="bg-[var(--background)] py-24 text-[var(--foreground)]">
      <h2 className="text-3xl font-bold md:text-5xl">Design that celebrates</h2>
      <p className="mt-3 max-w-2xl text-[var(--muted-fg)]">
        Elegant by day, radiant by night. Engineered with safe materials and a timeless silhouette.
        Make Eid the center of your space — beautifully.
      </p>
      <div className="mt-8">
        <FeatureMosaic count={8} />
      </div>
    </Section>
  );
}

/* ---------- Votes (separate section; taller cards) ---------- */
function VotesSection() {
  return (
    <Section id="votes" className="bg-[var(--background)] py-24 text-[var(--foreground)]">
      <h2 className="text-3xl font-bold md:text-5xl">Vote your favorite design</h2>
      <p className="mt-2 text-sm text-[var(--muted-fg)]">Tap the heart — votes are public.</p>

      {/* Scoped CSS to adjust the third-party card layout without touching anything else */}
      <style>{`
        #votes .ep-votes-scope img,
        #votes .ep-votes-scope video{
          aspect-ratio: 4 / 5;
          object-fit: contain;
          background: black;
          width: 100%;
          height: auto;
        }
        #votes .ep-votes-scope .absolute.left-3.top-3,
        #votes .ep-votes-scope .absolute.top-3.left-3{
          display: none !important; /* hide small label chips */
        }
      `}</style>

      <div className="mt-8 ep-votes-scope">
        <DesignVotes />
      </div>
    </Section>
  );
}

/* ---------- Preorder ---------- */
function Preorder() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [open, setOpen] = useState(false);
  const FORM_ENDPOINT = "https://formspree.io/f/movnalpw";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_subject", "Eid Palm Preorder");
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) { setStatus("success"); form.reset(); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  return (
    <Section id="preorder" className="relative overflow-hidden bg-[var(--background)] py-24 text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_60%_40%,rgba(245,158,11,0.10),transparent_60%)]" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-bold md:text-5xl">Preorder Eid Palm</h2>
          <p className="mt-3 max-w-prose text-[var(--muted-fg)]">Be among the first to welcome the Eid Palm into your home. Limited early batch with special Zena set.</p>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-2 max-w-xl" noValidate>
            <input name="name" placeholder="Full name" required autoComplete="name" className="rounded-xl bg-[var(--surface)]/70 text-[var(--foreground)] placeholder-[color:color-mix(in_oklab,var(--foreground)_55%,transparent)] px-4 py-3 outline-none border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent-gold)]/50" />
            <input name="country" placeholder="Country" autoComplete="country-name" className="rounded-xl bg-[var(--surface)]/70 text-[var(--foreground)] placeholder-[color:color-mix(in_oklab,var(--foreground)_55%,transparent)] px-4 py-3 outline-none border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent-gold)]/50" />
            <input name="email" type="email" placeholder="Email address" required autoComplete="email" className="rounded-xl bg-[var(--surface)]/70 text-[var(--foreground)] placeholder-[color:color-mix(in_oklab,var(--foreground)_55%,transparent)] px-4 py-3 outline-none border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent-gold)]/50" />
            <input name="phone" type="tel" inputMode="tel" placeholder="Phone number" autoComplete="tel" className="rounded-xl bg-[var(--surface)]/70 text-[var(--foreground)] placeholder-[color:color-mix(in_oklab,var(--foreground)_55%,transparent)] px-4 py-3 outline-none border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent-gold)]/50" />
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
            <button type="submit" disabled={status==="loading"} aria-busy={status==="loading"} className="sm:col-span-2 rounded-xl px-5 py-3 font-medium bg-[var(--accent-gold)] text-black hover:brightness-110 disabled:opacity-60">
              {status==="loading" ? "Sending..." : "Reserve now"}
            </button>
            <div aria-live="polite" aria-atomic="true" className="sm:col-span-2 min-h-[1.25rem]">
              {status==="success" && <p className="text-xs text-emerald-400">Thanks! We’ll email you when preorders open.</p>}
              {status==="error" && <p className="text-xs text-red-400">Sorry—something went wrong. Please try again.</p>}
            </div>
            <p className="text-xs text-[var(--muted-fg)] sm:col-span-2">We’ll only use your email to notify you about preorder availability.</p>
          </form>
          <button onClick={() => setOpen(true)} className="mt-4 inline-block rounded-2xl px-5 py-3 text-[var(--muted-fg)] ring-1 ring-[var(--border)] hover:bg-[var(--surface)]">
            Learn more
          </button>
        </div>
        <div className="md:col-span-5">
          <div className="aspect-[4/3] w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)]" />
        </div>
      </div>
      <Modal title="Preorder details" open={open} onClose={() => setOpen(false)}>
        <p>Put preorder terms, shipping windows, or FAQ here. Same modal component for re-use.</p>
      </Modal>
    </Section>
  );
}

/* ---------- Footer with modal links ---------- */
function Footer() {
  const [about, setAbout] = useState<null|"vision"|"leaders"|"privacy">(null);
  return (
    <footer id="contact" className="bg-white text-neutral-900 border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:py-10 grid grid-cols-1 gap-6 items-start md:grid-cols-3">
        <div className="flex items-center">
          <img src="/eidpalm-logo-v2.svg" alt="Eid Palm logo" className="h-24 md:h-32 lg:h-40 w-auto select-none" loading="lazy" decoding="async" />
        </div>
        <div className="md:justify-self-center self-start">
          <h3 className="font-semibold mb-2">Get in touch</h3>
          <div className="space-y-1 text-sm">
            <a href="mailto:halla@eidpalm.com" className="hover:underline">halla@eidpalm.com</a>
            <div>+971 55 516 6112</div>
          </div>
        </div>
        <div className="md:justify-self-end self-start">
          <h3 className="font-semibold mb-2">Links</h3>
          <ul className="space-y-1 text-sm">
            <li><button onClick={() => setAbout("vision")} className="hover:underline">Vision &amp; Mission</button></li>
            <li><button onClick={() => setAbout("leaders")} className="hover:underline">Leadership</button></li>
            <li><button onClick={() => setAbout("privacy")} className="hover:underline">Privacy Policy</button></li>
          </ul>
          <div className="mt-3 flex items-center gap-3 text-neutral-600">
            <a href="https://instagram.com/eidpalm" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-neutral-900"><Instagram className="h-5 w-5" /></a>
            <a href="https://www.linkedin.com/company/eidpalm" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-neutral-900"><Linkedin className="h-5 w-5" /></a>
            <a href="https://facebook.com/eidpalm" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-neutral-900"><Facebook className="h-5 w-5" /></a>
            <a href="https://x.com/eidpalm" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:text-neutral-900"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-3 text-xs text-neutral-600">© {new Date().getFullYear()} Culture Element LLC</div>
      </div>

      <Modal title={
        about==="vision" ? "Vision & Mission" : about==="leaders" ? "Leadership" : "Privacy Policy"
      } open={about!==null} onClose={() => setAbout(null)}>
        {about==="vision" && <p>Short statement about the Eid Palm vision and mission.</p>}
        {about==="leaders" && <p>Founder / team bios in short form.</p>}
        {about==="privacy" && <p>High-level privacy summary. Link to full policy if needed.</p>}
      </Modal>
    </footer>
  );
}

/* ---------- Page ---------- */
export default function EidPalmLanding() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent-gold)]/40 selection:text-[var(--foreground)]">
      <Grain />
      <Header />

      <section id="hero" className="relative isolate aspect-[16/9] w-full overflow-hidden edge-slant-bottom" aria-label="Eid Palm Hero">
        <video className="absolute inset-0 h-full w-full object-cover z-0" src="/teaser-v2.mp4" poster="/teaser-fallback.jpg" autoPlay muted loop playsInline />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-black/70 via-black/25 to-transparent" />
        <div className="relative z-20 mx-auto max-w-screen-xl px-6 md:px-10 py-12 sm:py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
            Unforgettable Moments &amp; More
          </h1>
        </div>
      </section>

      <Marquee items={[
        "Celebrate","Heritage","Modern","Togetherness","Elegant","Play","Educational","Roots",
        "Interactive","Joyful","Community","Modular","Colorful","Secure","Traditional","Personalized",
        "Ambient","Pride","Interchangeable","Legacy","Fun","Sustainable"
      ]} />

      <Story />
      <Showcase />
      <Features />
      <VotesSection />
      <Preorder />
      <Footer />

      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>
    </main>
  );
}
