"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { newsletterEndpoint } from "@/lib/site";
import { FloatingHeart } from "./ui/Decor";
import { Lines, Reveal } from "./ui/Reveal";

type Status = "idle" | "loading" | "success" | "error" | "unconfigured";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("firstName") || "").trim();
    const email = String(data.get("email") || "").trim();

    const next: typeof errors = {};
    if (name.length < 2) next.name = "Please enter your first name.";
    if (!emailRe.test(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("idle");
      (form.querySelector(next.name ? "[name=firstName]" : "[name=email]") as HTMLElement | null)?.focus();
      return;
    }

    // INTEGRATION POINT: set NEXT_PUBLIC_NEWSLETTER_ENDPOINT (Kit, Mailchimp proxy, Beehiiv, your API route…)
    // It receives POST JSON: { firstName, email }
    if (!newsletterEndpoint) {
      setStatus("unconfigured");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(newsletterEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: name, email }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setServerMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const field = "w-full border-0 border-b border-burgundy/40 bg-transparent px-0 py-3 text-lg text-ink placeholder:text-ink/40 focus:border-cherry focus:outline-none focus:ring-0";

  return (
    <section id="newsletter" className="relative overflow-hidden bg-champagne/40 py-24 sm:py-32">
      <FloatingHeart className="left-[8%] top-16 text-rose" size={26} />
      <FloatingHeart className="right-[10%] bottom-20 text-cherry/70" size={34} delay={1.5} rotate={14} />
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow mb-6 text-cherry">The newsletter</p></Reveal>
          <Lines lines={["Your Next", "Chapter", "Starts Here."]} italicLines={[2]} className="font-serif text-display-lg text-burgundy" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-xl leading-relaxed text-ink/80">
              A little confidence, a little perspective, and a whole lot of better dating energy.
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="bg-ivory p-8 shadow-[0_30px_60px_-30px_rgba(112,45,67,.35)] sm:p-12" aria-describedby={`${id}-status`}>
            <div className="space-y-8">
              <div>
                <label htmlFor={`${id}-name`} className="eyebrow text-burgundy">First name</label>
                <input
                  id={`${id}-name`} name="firstName" type="text" autoComplete="given-name" className={field} placeholder="Your first name"
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined}
                />
                {errors.name && <p id={`${id}-name-err`} className="mt-2 text-sm text-cherry">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="eyebrow text-burgundy">Email address</label>
                <input
                  id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" className={field} placeholder="you@email.com"
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-err` : undefined}
                />
                {errors.email && <p id={`${id}-email-err`} className="mt-2 text-sm text-cherry">{errors.email}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-burgundy px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-cherry disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === "loading" && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>

            <div id={`${id}-status`} role="status" aria-live="polite" className="mt-6 min-h-[3rem]">
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 text-burgundy">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-cherry" aria-hidden="true" /> You&apos;re on the list. Welcome to the next chapter.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 text-cherry">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" /> We couldn&apos;t subscribe you just now ({serverMsg}). Please try again.
                  </motion.p>
                )}
                {status === "unconfigured" && (
                  <motion.p key="un" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 text-ink/80">
                    <AlertCircle size={20} className="mt-0.5 shrink-0 text-burgundy" aria-hidden="true" />
                    Thanks — your details look good, but the newsletter isn&apos;t connected yet, so nothing was saved. Dena&apos;s team needs to add a signup endpoint.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
