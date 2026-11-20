"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck } from "lucide-react";
import { site } from "@/lib/site";
import Button from "./ui/Button";
import { Lines, Reveal } from "./ui/Reveal";

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 0.7, 0.2, 1], onUpdate: (v) => setVal(v) });
    return () => c.stop();
  }, [inView, to, reduce]);

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

export default function SocialProof() {
  return (
    <section id="proof" className="relative overflow-hidden bg-burgundy py-24 text-ivory sm:py-32">
      <div aria-hidden="true" className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cherry/30 blur-3xl" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow mb-6 text-champagne">The community</p></Reveal>
          <Lines
            lines={["90K+ Women Are", "Here for the", "Next Chapter."]}
            italicLines={[2]}
            className="font-serif text-display-lg"
          />
          <Reveal delay={0.2} className="mt-10">
            <Button href={site.instagram} external variant="light">Join the Community</Button>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-serif text-[clamp(5rem,15vw,11rem)] leading-none text-champagne">
              <Counter to={site.followers.value} decimals={1} suffix={site.followers.suffix} />
            </p>
            <p className="eyebrow mt-2 text-ivory/80">{site.followers.label}</p>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 divide-y divide-ivory/15 border-y border-ivory/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { k: "Verified", v: "Instagram account", icon: true },
              { k: "Post-Divorce", v: "Dating Coach", icon: false },
              { k: "Women 40+", v: "Her community", icon: false },
            ].map((s, i) => (
              <Reveal as="li" key={s.k} delay={0.1 * i} className="px-0 py-5 sm:px-5">
                <p className="flex items-center gap-2 font-serif text-xl italic">
                  {s.k}
                  {s.icon && <BadgeCheck size={18} className="text-champagne" aria-hidden="true" />}
                </p>
                <p className="mt-1 text-sm text-ivory/70">{s.v}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
