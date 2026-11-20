"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery, type GalleryItem } from "@/lib/assets";
import { site } from "@/lib/site";
import Button from "./ui/Button";
import ImageSlot from "./ui/ImageSlot";
import { Lines, Reveal, ease } from "./ui/Reveal";

const variantFor = (k: GalleryItem["kind"]) => (k === "Portrait" ? "portrait" : k === "Lifestyle" ? "scene" : k === "Dating advice" || k === "Inspiration" ? "quote" : "portrait") as "portrait" | "scene" | "quote";

export default function Gallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpenIdx(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpenIdx((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), []);

  return (
    <section id="insights" className="relative bg-blush/50 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal><p className="eyebrow mb-6 text-cherry">Dating insights</p></Reveal>
            <Lines lines={["A Little Dena,", "A Lot of Dating Truth."]} italicLines={[1]} className="font-serif text-display-lg text-burgundy" />
          </div>
          <Reveal><Button href={site.instagram} external variant="outline">Follow Dena on Instagram</Button></Reveal>
        </div>

        <ul className="mt-16 columns-2 gap-4 sm:gap-6 lg:columns-4">
          {gallery.map((g, i) => (
            <Reveal as="li" key={g.id} delay={(i % 4) * 0.07} className="mb-4 break-inside-avoid sm:mb-6">
              <button
                type="button"
                onClick={(e) => { triggerRef.current = e.currentTarget; setOpenIdx(i); }}
                aria-haspopup="dialog"
                aria-label={`Open ${g.kind}: ${g.title}`}
                className="group relative block w-full overflow-hidden text-left"
              >
                <div className={`${g.aspect} w-full transition-transform duration-[900ms] ease-out group-hover:scale-105`}>
                  <ImageSlot
                    asset={{ src: g.src, alt: g.title, caption: g.kind, tone: g.tone }}
                    variant={variantFor(g.kind)}
                    showHint={false}
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="h-full w-full"
                  />
                </div>
                {g.kind === "Reel" && (
                  <span aria-hidden="true" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-burgundy">
                    <Play size={14} fill="currentColor" />
                  </span>
                )}
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-burgundy/80 via-burgundy/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="eyebrow text-ivory">{g.kind}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink/60">
          Placeholder tiles. Add Dena&apos;s real images and post links in <code className="rounded bg-ivory px-1.5 py-0.5">lib/assets.ts</code>.
        </p>
      </div>

      <AnimatePresence>
        {openIdx !== null && <Lightbox key="lb" item={gallery[openIdx]} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({ item, onClose, onStep }: { item: GalleryItem; onClose: () => void; onStep: (d: number) => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const href = item.postUrl ?? site.instagram;

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.kind}: ${item.title}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
        className="relative grid max-h-[92svh] w-full max-w-4xl overflow-auto bg-ivory md:grid-cols-2"
      >
        <div className="relative min-h-[280px] md:min-h-[520px]">
          <ImageSlot
            asset={{ src: item.src, alt: item.title, caption: item.kind, tone: item.tone }}
            variant={variantFor(item.kind)}
            sizes="(min-width:768px) 45vw, 90vw"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="eyebrow text-cherry">{item.kind}</p>
          <h3 className="mt-4 font-serif text-3xl text-burgundy sm:text-4xl">{item.title}</h3>
          <p className="mt-4 leading-relaxed text-ink/75">{item.note}</p>
          <div className="mt-8">
            <Button href={href} external magnetic={false} variant="solid">
              {item.postUrl ? "View this post on Instagram" : "See Dena on Instagram"}
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <button type="button" onClick={() => onStep(-1)} aria-label="Previous item" className="flex h-11 w-11 items-center justify-center rounded-full border border-burgundy/30 text-burgundy transition-colors hover:bg-burgundy hover:text-ivory"><ChevronLeft size={18} /></button>
            <button type="button" onClick={() => onStep(1)} aria-label="Next item" className="flex h-11 w-11 items-center justify-center rounded-full border border-burgundy/30 text-burgundy transition-colors hover:bg-burgundy hover:text-ivory"><ChevronRight size={18} /></button>
          </div>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-burgundy transition-colors hover:bg-burgundy hover:text-ivory"
        >
          <X size={18} />
        </button>
      </motion.div>
    </motion.div>
  );
}
