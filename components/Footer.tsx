import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink py-16 text-ivory/80">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl tracking-[0.18em] text-ivory">DENA <span className="italic text-rose">MARIZAN</span></p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">Post-Divorce Dating Coach for Women 40+. Your next chapter deserves a better love story.</p>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-underline mt-6 inline-flex items-center gap-2 text-sm text-ivory">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> {site.handle}<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <p className="eyebrow mb-4 text-rose">Explore</p>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="link-underline">{n.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-rose">Contact</p>
          {/* PLACEHOLDER: replace with Dena's real contact email in lib/site.ts */}
          <p className="text-sm">Email: <span className="text-ivory/60">coming soon</span></p>
          <p className="mt-2 text-sm">For now, message Dena on Instagram.</p>
        </div>
      </div>

      <div className="container-x mt-14 flex flex-col gap-3 border-t border-ivory/15 pt-6 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Dena Marizan. All rights reserved.</p>
        <a href="/privacy" className="link-underline">Privacy Policy</a>
      </div>
    </footer>
  );
}
