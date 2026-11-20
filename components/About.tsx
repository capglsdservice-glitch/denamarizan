"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { assets } from "@/lib/assets";
import { site } from "@/lib/site";
import Button from "./ui/Button";
import { FloatingHeart } from "./ui/Decor";
import ImageSlot from "./ui/ImageSlot";
import { Lines, Reveal, ease } from "./ui/Reveal";

/** EDITABLE: replace with Dena's authentic story. */
const copy = {
  lead: "Because starting over doesn't mean starting from scratch.",
  body: [
    "Dating after divorce can feel like entering a completely different world. But this chapter isn't about settling, repeating old patterns, or accepting less than you deserve.",
    "It's about knowing what you want, trusting yourself, and making room for something better.",
  ],
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-6">
          <motion.div style={{ y }} className="relative mx-auto max-w-[520px] lg:max-w-none">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2, ease }}
              className="relative aspect-[4/5] overflow-hidden rounded-tl-[160px] rounded-br-[160px]"
            >
              <ImageSlot asset={assets.aboutPortrait} sizes="(min-width:1024px) 45vw, 90vw" className="h-full w-full" />
            </motion.div>
            <div aria-hidden="true" className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-tl-[160px] rounded-br-[160px] bg-blush" />
            <FloatingHeart className="-left-5 top-10 text-cherry" size={28} />
            <p className="absolute -bottom-10 left-4 font-serif text-lg italic text-burgundy sm:text-xl">— xo, Dena</p>
          </motion.div>
        </div>

        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow mb-6 text-cherry">About Dena</p></Reveal>
          <Lines
            lines={["Meet Dena.", "Your Next-Chapter", "Bestie."]}
            italicLines={[2]}
            className="font-serif text-display-lg text-burgundy"
          />
          <Reveal delay={0.15}>
            <p className="mt-10 font-serif text-2xl italic leading-snug text-cherry sm:text-3xl">{copy.lead}</p>
          </Reveal>
          {copy.body.map((p, i) => (
            <Reveal key={i} delay={0.2 + i * 0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.4} className="mt-10">
            <Button href={site.instagram} external variant="solid">Get to Know Me</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
