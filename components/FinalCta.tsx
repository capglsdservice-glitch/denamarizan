"use client";

import { site } from "@/lib/site";
import Button from "./ui/Button";
import { FloatingHeart } from "./ui/Decor";
import { Lines, Reveal } from "./ui/Reveal";

export default function FinalCta() {
  return (
    <section id="connect" className="grain relative isolate overflow-hidden bg-burgundy py-28 text-center text-ivory sm:py-40">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cherry/25 blur-3xl" />
      <FloatingHeart className="left-[8%] top-20 text-rose" size={34} />
      <FloatingHeart className="right-[12%] top-32 text-champagne/80" size={22} delay={1} rotate={12} fill={false} />
      <FloatingHeart className="bottom-24 left-[16%] text-champagne/70" size={20} delay={2} rotate={-10} fill={false} />
      <FloatingHeart className="bottom-16 right-[8%] text-rose" size={28} delay={0.6} rotate={8} />

      <div className="container-x">
        <Reveal><p className="eyebrow mb-8 text-champagne">Let&apos;s talk</p></Reveal>
        <Lines
          lines={["You're Not Starting Over.", "You're Starting Smarter."]}
          italicLines={[1]}
          className="mx-auto max-w-5xl font-serif text-display-lg [&>span:nth-child(2)]:text-champagne"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-ivory/85">Your next chapter is waiting. Let&apos;s make it a good one.</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-12">
          <Button href={site.instagram} external variant="light">Connect with Dena</Button>
          <p className="mt-6 text-sm text-ivory/60">The best way to reach Dena right now is a message on Instagram.</p>
        </Reveal>
      </div>
    </section>
  );
}
