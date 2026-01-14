import type { Dimension, Antithesis } from "../types";

export const DEFAULT_MAX_POINTS = 25;
export const DEFAULT_MAX_SCORE_PER_DIM = 10;

export const DEFAULT_DIMENSIONS: Dimension[] = [
  { id: "d1", name: "Scalability", score: 5 },
  { id: "d2", name: "Dev Velocity", score: 8 },
  { id: "d3", name: "Portability", score: 4 },
  { id: "d4", name: "Cloud Costs", score: 2 },
  { id: "d5", name: "Security", score: 6 },
];

export const DEFAULT_ANTITHESES: Antithesis[] = [
  { id: "a1", source: "d1", target: "d4" },
  { id: "a2", source: "d2", target: "d5" },
];
