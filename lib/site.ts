/**
 * Central, editable content + links for the whole site.
 * Anything marked PLACEHOLDER should be replaced with Dena's verified details.
 */
export const site = {
  name: "Dena Marizan",
  title: "Dena Marizan — Post-Divorce Dating Coach for Women 40+",
  description:
    "Your next chapter deserves a better love story. Dena Marizan is a post-divorce dating coach helping women 40+ date with confidence and intention.",
  url: "https://www.denamarizan.com", // PLACEHOLDER: replace with the real domain
  instagram: "https://www.instagram.com/denamarizan/",
  handle: "@denamarizan",
  contactEmail: "hello@example.com", // PLACEHOLDER
  followers: { value: 90.7, suffix: "K", label: "Instagram followers" },
  stats: { following: 465, posts: 70 },
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About Dena", href: "#about" },
  { label: "My Approach", href: "#approach" },
  { label: "Dating Insights", href: "#insights" },
  { label: "Work With Me", href: "#work" },
];

/** Newsletter integration point. Set NEXT_PUBLIC_NEWSLETTER_ENDPOINT to a real POST endpoint. */
export const newsletterEndpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || "";
