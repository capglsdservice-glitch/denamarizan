import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy — Dena Marizan", robots: { index: false } };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <a href="/" className="link-underline eyebrow text-cherry">← Back to home</a>
      <h1 className="mt-8 font-serif text-5xl text-burgundy">Privacy Policy</h1>
      <p className="mt-6 rounded border border-cherry/30 bg-blush/40 p-4 text-sm">
        PLACEHOLDER: this page needs a real privacy policy reviewed by Dena or her legal advisor before launch, especially once the newsletter is connected.
      </p>
      <p className="mt-6 leading-relaxed text-ink/80">
        This site currently does not store any information you type into the newsletter form, because no signup service is connected yet.
        Links to Instagram ({site.handle}) are governed by Instagram&apos;s own privacy policy.
      </p>
    </main>
  );
}
