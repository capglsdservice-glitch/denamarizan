export const toneMap = {
  blush: { bg: "#F8DDE3", mid: "#EFB9C4", deep: "#D98C9D", ink: "#702D43" },
  rose: { bg: "#E9A9B5", mid: "#D98C9D", deep: "#B8667A", ink: "#FFF9F3" },
  champagne: { bg: "#F4E3CF", mid: "#E9CDAF", deep: "#D3AE86", ink: "#702D43" },
  burgundy: { bg: "#702D43", mid: "#8C3F58", deep: "#4F1E30", ink: "#FFF9F3" },
  cherry: { bg: "#C7475B", mid: "#D96A7B", deep: "#9E2F43", ink: "#FFF9F3" },
} as const;
export type Tone = keyof typeof toneMap;
