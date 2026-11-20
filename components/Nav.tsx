"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import Magnetic from "./ui/Magnetic";
import { ease } from "./ui/Reveal";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlighting
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Mobile menu: lock scroll, close on Escape, return focus
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const lightText = !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-burgundy/10 bg-ivory/90 py-3 backdrop-blur-md" : "bg-transparent py-5"
        }`}
      >
        <nav aria-label="Primary" className="container-x flex items-center justify-between">
          <a href="#home" className={`font-serif text-xl tracking-[0.18em] text-burgundy sm:text-2xl ${open ? "relative z-[70]" : ""}`} aria-label="Dena Marizan — home">
            DENA <span className="italic text-cherry">MARIZAN</span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  aria-current={active === n.href ? "true" : undefined}
                  className={`link-underline text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors ${
                    active === n.href ? "text-cherry" : "text-ink hover:text-burgundy"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Magnetic strength={0.2}>
                <a
                  href="#connect"
                  className="inline-block rounded-full bg-burgundy px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-cherry"
                >
                  Let&apos;s Talk
                </a>
              </Magnetic>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
                open ? "border-ivory/40 text-ivory" : "border-burgundy/30 text-burgundy"
              }`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col justify-center bg-burgundy px-8 text-ivory lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <ul className="space-y-2">
              {nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <motion.a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block font-serif text-4xl italic sm:text-5xl"
                    initial={{ y: "100%" }}
                    animate={{ y: 0, transition: { delay: 0.25 + i * 0.07, duration: 0.7, ease } }}
                    exit={{ y: "100%", transition: { duration: 0.2 } }}
                  >
                    {n.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.7 } }} exit={{ opacity: 0 }}
            >
              <a href="#connect" onClick={() => setOpen(false)} className="rounded-full bg-ivory px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-burgundy">
                Let&apos;s Talk
              </a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-underline text-[0.72rem] uppercase tracking-[0.2em] text-champagne">
                {site.handle}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* keeps lightText referenced for future theming without lint noise */}
      <span hidden data-light={lightText} />
    </>
  );
}
