export type Dimension = {
  id: string;
  name: string;
  score: number;
};

export type Antithesis = {
  id: string;
  source: string;
  target: string;
};

export type AppState = {
  mp: number;
  ms: number;
  d: Dimension[];
  a: Antithesis[];
};

export type TabType = "simulation" | "config";

export type ShareWarningType = "preview" | "error" | null;

export type ChartDataPoint = {
  subject: string;
  A: number;
  fullMark: number;
};
