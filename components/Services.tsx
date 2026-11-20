"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Lines, Reveal } from "./ui/Reveal";

/**
 * PLACEHOLDER OFFERS — no real packages, prices or availability have been provided.
 * Replace title/description/cta/href with Dena's verified offers.
 */
const offers = [
  { n: "I", title: "Coaching Program", desc: "Placeholder: describe the group or signature coaching program here — who it's for, and what it helps her do.", cta: "Ask about this", href: "#connect" },
  { n: "II", title: "Private Coaching", desc: "Placeholder: describe one-on-one coaching with Dena here, including how it works.", cta: "Ask about this", href: "#connect" },
  { n: "III", title: "Dating Guidance", desc: "Placeholder: describe focused guidance for dating questions, profiles, boundaries and next steps.", cta: "Ask about this", href: "#connect" },
  { n: "IV", title: "Relationship Resources", desc: "Placeholder: describe guides, downloads or recommended resources Dena shares with her community.", cta: "Ask about this", href: "#connect" },
];

export default function Services() {
  return (
    <section id="work" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div aria-hidden="true" className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-champagne/40 blur-3xl" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <Reveal><p className="eyebrow mb-6 text-cherry">Work with me</p></Reveal>
          <Lines lines={["Let's Make", "Your Next", "Chapter Count."]} italicLines={[2]} className="font-serif text-display-lg text-burgundy" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/75">
              Ways to work with Dena are being finalized. Reach out and ask what&apos;s right for where you are in your chapter.
            </p>
          </Reveal>
        </div>

        <ol className="lg:col-span-7">
          {offers.map((o, i) => (
            <Reveal as="li" key={o.title} delay={i * 0.05}>
              <motion.a
                href={o.href}
                whileHover="hover"
                initial="rest"
                className="group relative flex items-start gap-6 border-t border-burgundy/20 py-9 last:border-b sm:gap-10"
              >
                <motion.span
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-blush/60"
                />
                <span className="w-10 shrink-0 font-serif text-2xl italic text-rose sm:w-14 sm:text-3xl">{o.n}</span>
                <span className="flex-1">
                  <span className="block font-serif text-3xl text-burgundy transition-colors duration-500 group-hover:text-cherry sm:text-4xl">{o.title}</span>
                  <span className="mt-3 block max-w-lg leading-relaxed text-ink/70">{o.desc}</span>
                  <span className="eyebrow mt-5 inline-flex items-center gap-2 text-burgundy">
                    {o.cta}
                    <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                  </span>
                </span>
              </motion.a>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
