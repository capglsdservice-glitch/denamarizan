"use client";

import { motion } from "motion/react";
import { assets } from "@/lib/assets";
import ImageSlot from "./ui/ImageSlot";
import { Lines, Reveal, ease } from "./ui/Reveal";

const blocks = [
  { n: "01", title: "Know Your Worth", text: "Understand what you deserve and stop making excuses for the wrong people.", asset: assets.philosophy1, variant: "portrait" as const },
  { n: "02", title: "Date With Intention", text: "Be confident about your standards, expectations, and what you actually want.", asset: assets.philosophy2, variant: "scene" as const },
  { n: "03", title: "Choose Differently", text: "Recognize patterns, make better decisions, and approach relationships with a fresh perspective.", asset: assets.philosophy3, variant: "quote" as const },
];

/** Three deliberately different compositions (not a card grid). */
export default function Philosophy() {
  return (
    <section id="approach" className="relative overflow-hidden bg-blush/50 py-24 sm:py-32">
      <div className="container-x">
        <Reveal><p className="eyebrow mb-6 text-cherry">My approach</p></Reveal>
        <Lines
          lines={["New Chapter.", "New Standards.", "Better Choices."]}
          italicLines={[1]}
          className="font-serif text-display-lg text-burgundy"
        />

        <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-32">
          {/* 01 — image left, text right, oversized number */}
          <Block {...blocks[0]} layout="a" />
          {/* 02 — text left, image right, offset */}
          <Block {...blocks[1]} layout="b" />
          {/* 03 — full-width burgundy band */}
          <Block {...blocks[2]} layout="c" />
        </div>
      </div>
    </section>
  );
}

type BlockProps = (typeof blocks)[number] & { layout: "a" | "b" | "c" };

function Block({ n, title, text, asset, variant, layout }: BlockProps) {
  const img = (cls: string) => (
    <motion.div
      initial={{ clipPath: "inset(12% 12% 12% 12%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease }}
      className={`group relative overflow-hidden ${cls}`}
    >
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-105">
        <ImageSlot asset={asset} variant={variant} showHint={false} sizes="(min-width:1024px) 40vw, 90vw" className="h-full w-full" />
      </div>
    </motion.div>
  );

  if (layout === "a") {
    return (
      <article className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">{img("aspect-[4/5] rounded-t-[999px]")}</div>
        <div className="relative lg:col-span-7 lg:pl-10">
          <Reveal className="relative">
            <span aria-hidden="true" className="block font-serif text-[clamp(5rem,10vw,8rem)] italic leading-none text-rose/60">{n}</span>
            <h3 className="font-serif text-display-md text-burgundy">{title}</h3>
            <p className="mt-5 max-w-lg text-xl leading-relaxed text-ink/80">{text}</p>
          </Reveal>
        </div>
      </article>
    );
  }

  if (layout === "b") {
    return (
      <article className="grid items-center gap-10 lg:grid-cols-12">
        <div className="relative order-2 lg:order-1 lg:col-span-6 lg:col-start-2">
          <Reveal className="relative">
            <span aria-hidden="true" className="block font-serif text-[clamp(5rem,10vw,8rem)] leading-none text-champagne">{n}</span>
            <h3 className="font-serif text-display-md italic text-cherry">{title}</h3>
            <p className="mt-5 max-w-lg text-xl leading-relaxed text-ink/80">{text}</p>
          </Reveal>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9 lg:translate-y-12">{img("aspect-square rounded-full")}</div>
      </article>
    );
  }

  return (
    <article className="relative grid items-center gap-8 overflow-hidden bg-burgundy text-ivory lg:grid-cols-12 lg:gap-0">
      <div className="p-8 sm:p-14 lg:col-span-7 lg:p-20">
        <span aria-hidden="true" className="font-serif text-6xl italic text-champagne">{n}</span>
        <Reveal>
          <h3 className="mt-2 font-serif text-display-md">{title}</h3>
          <p className="mt-5 max-w-lg text-xl leading-relaxed text-ivory/85">{text}</p>
        </Reveal>
      </div>
      <div className="lg:col-span-5">{img("aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]")}</div>
    </article>
  );
}
