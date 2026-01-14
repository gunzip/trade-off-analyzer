import { Target, Link2 } from "lucide-react";
import { Card } from "./Card";
import type { Dimension } from "../types";

type MetricsSlidersProps = {
  dimensions: Dimension[];
  maxScorePerDim: number;
  onScoreChange: (dimId: string, newValue: number) => void;
  getEnemies: (dimId: string) => string[];
};

export const MetricsSliders = ({
  dimensions,
  maxScorePerDim,
  onScoreChange,
  getEnemies,
}: MetricsSlidersProps) => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
        <Target className="w-4 h-4 text-indigo-500" />
        Adjust Metrics
      </h3>
      <div className="space-y-5 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
        {dimensions.map((dim) => {
          const enemies = getEnemies(dim.id);

          return (
            <div key={dim.id} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700 flex items-center gap-2">
                  {dim.name}
                  {enemies.length > 0 && (
                    <span
                      className="text-orange-500 cursor-help"
                      title={`Conflicts with: ${enemies.join(", ")}`}
                    >
                      <Link2 size={14} />
                    </span>
                  )}
                </span>
                <span
                  className={`font-bold transition-colors ${
                    dim.score >= maxScorePerDim * 0.8
                      ? "text-indigo-600"
                      : "text-slate-600"
                  }`}
                >
                  {dim.score}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={maxScorePerDim}
                value={dim.score}
                onChange={(e) => onScoreChange(dim.id, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
              />
              {enemies.length > 0 && (
                <div className="text-[10px] text-orange-600/80 italic truncate uppercase tracking-tight">
                  Conflicts: {enemies.join(", ")}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
