import type { Dimension, Antithesis } from "../types";

export const DEFAULT_MAX_POINTS = 16;
export const DEFAULT_MAX_SCORE_PER_DIM = 8;

export const DEFAULT_DIMENSIONS: Dimension[] = [
  { id: "d1", name: "Next Delivery", score: 0 },
  { id: "d2", name: "Portability", score: 0 },
  { id: "d3", name: "Cloud Savings", score: 0 },
  { id: "d4", name: "Security", score: 0 },
  { id: "d5", name: "Future Agility", score: 0 },
  { id: "d6", name: "UX & Reliability", score: 0 },
];

export const DEFAULT_ANTITHESES: Antithesis[] = [
  { id: "a1", source: "d1", target: "d2" },
  { id: "a3", source: "d1", target: "d3" },
  { id: "a5", source: "d1", target: "d4" },
  { id: "a7", source: "d1", target: "d5" },
  { id: "a9", source: "d2", target: "d5" },
  { id: "a11", source: "d1", target: "d6" },
  { id: "a13", source: "d2", target: "d6" },
];
