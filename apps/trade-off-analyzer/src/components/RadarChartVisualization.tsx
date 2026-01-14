import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Card } from "./Card";
import type { ChartDataPoint } from "../types";

type RadarChartVisualizationProps = {
  chartData: ChartDataPoint[];
  maxScorePerDim: number;
};

export const RadarChartVisualization = ({
  chartData,
  maxScorePerDim,
}: RadarChartVisualizationProps) => {
  return (
    <Card className="h-full p-6 flex flex-col items-center justify-center min-h-[500px]">
      <h3 className="text-lg font-semibold text-slate-700 mb-4 w-full text-center">
        Architectural Balance
      </h3>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#475569", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, maxScorePerDim]}
              stroke="#cbd5e1"
            />
            <Radar
              name="Project Profile"
              dataKey="A"
              stroke="#4f46e5"
              strokeWidth={3}
              fill="#6366f1"
              fillOpacity={0.4}
            />
            <RechartsTooltip />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-indigo-500"></span> Current
          Profile
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full border border-slate-300"></span>{" "}
          Axis Max: {maxScorePerDim}
        </div>
      </div>
    </Card>
  );
};
