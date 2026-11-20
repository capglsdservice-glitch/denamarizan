"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BadgeCheck } from "lucide-react";
import { assets } from "@/lib/assets";
import { site } from "@/lib/site";
import Button from "./ui/Button";
import { FloatingHeart, RotatingBadge } from "./ui/Decor";
import ImageSlot from "./ui/ImageSlot";
import { Lines, ease } from "./ui/Reveal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const shapeY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 40]);

  return (
    <section id="home" ref={ref} className="grain relative isolate min-h-[100svh] overflow-hidden bg-ivory pt-28 sm:pt-32">
      {/* organic background shapes */}
      <motion.div style={{ y: shapeY }} aria-hidden="true" className="absolute -right-40 -top-32 -z-10 h-[620px] w-[620px] rounded-[58%_42%_55%_45%/48%_56%_44%_52%] bg-blush" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-32 -z-10 h-[420px] w-[420px] rounded-[45%_55%_40%_60%/55%_45%_55%_45%] bg-champagne/50" />

      <div className="container-x grid min-h-[calc(100svh-7rem)] items-center gap-10 pb-16 lg:grid-cols-12">
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-7">
          
          <Lines
            as="h1"
            inView={false}
            delay={1.5}
            lines={["Your Ex Was", "a Chapter.", "Not the Whole Story."]}
            italicLines={[2]}
            className="font-serif text-display-xl text-burgundy [&>span:nth-child(3)]:text-cherry"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.8, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl"
          >
            Ready to get back out there? Let&apos;s make sure your next love story is a whole lot better than the last.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 0.8, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="#approach" variant="solid" arrow={false}>Discover My Approach</Button>
            <Button href={site.instagram} variant="outline" external>Follow Me on Instagram</Button>
          </motion.div>
        </motion.div>

        {/* portrait */}
        <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:max-w-none">
          <motion.div
            style={{ y: imgY }}
            className="relative"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ delay: 1.7, duration: 1.2, ease }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] shadow-[0_40px_80px_-30px_rgba(112,45,67,.45)]"
            >
              <ImageSlot asset={assets.heroPortrait} showHint={false} priority sizes="(min-width:1024px) 40vw, 90vw" className="h-full w-full" />
            </motion.div>
            {/* offset outline arch */}
            <div aria-hidden="true" className="absolute left-5 top-5 -z-10 aspect-[4/5] w-full rounded-t-[999px] border border-burgundy/40" />

            <RotatingBadge text="POST-DIVORCE DATING COACH • WOMEN 40+ • " className="absolute -left-6 bottom-10 text-burgundy sm:-left-12" />
            <FloatingHeart className="-right-3 top-16 text-cherry" size={30} />
            <FloatingHeart className="-left-4 top-1/3 text-rose" size={18} delay={1.2} rotate={-12} />
            <FloatingHeart className="right-6 bottom-4 text-burgundy/70" size={20} delay={2.4} rotate={10} fill={false} />
          </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#proof"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-burgundy md:flex"
      >
        <span className="eyebrow">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-burgundy/20">
          <motion.span
            className="absolute left-0 top-0 block h-5 w-px bg-burgundy"
            animate={reduce ? undefined : { y: [-20, 48] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
