import type { Dimension, Antithesis } from "../types";

export const DEFAULT_MAX_POINTS = 25;
export const DEFAULT_MAX_SCORE_PER_DIM = 10;

export const DEFAULT_DIMENSIONS: Dimension[] = [
  { id: "d1", name: "Next Delivery", score: 5 },
  { id: "d2", name: "Portability", score: 5 },
  { id: "d3", name: "Cloud Savings", score: 5 },
  { id: "d4", name: "Security", score: 5 },
  { id: "d5", name: "Future Agility", score: 5 },
  { id: "d6", name: "UX & Reliability", score: 5 },
];

export const DEFAULT_ANTITHESES: Antithesis[] = [
  { id: "a1", source: "d1", target: "d2" },
  { id: "a2", source: "d2", target: "d1" },
  { id: "a3", source: "d1", target: "d3" },
  { id: "a4", source: "d3", target: "d1" },
  { id: "a5", source: "d1", target: "d4" },
  { id: "a6", source: "d4", target: "d1" },
  { id: "a7", source: "d1", target: "d5" },
  { id: "a8", source: "d5", target: "d1" },
  { id: "a9", source: "d2", target: "d5" },
  { id: "a10", source: "d5", target: "d2" },
  { id: "a11", source: "d1", target: "d6" },
  { id: "a12", source: "d6", target: "d1" },
  { id: "a13", source: "d2", target: "d6" },
  { id: "a14", source: "d6", target: "d2" },
];
