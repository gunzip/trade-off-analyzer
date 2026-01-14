import { RefreshCcw } from "lucide-react";
import { Card } from "./Card";

type BudgetDashboardProps = {
  pointsRemaining: number;
  maxPoints: number;
  totalUsed: number;
  onReset: () => void;
};

export const BudgetDashboard = ({
  pointsRemaining,
  maxPoints,
  totalUsed,
  onReset,
}: BudgetDashboardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-indigo-100">Point Budget</h3>
        <RefreshCcw
          className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          onClick={onReset}
          aria-label="Reset all scores"
        />
      </div>
      <div className="text-4xl font-bold mb-1">{pointsRemaining}</div>
      <div className="text-indigo-200 text-sm mb-4">
        available points out of {maxPoints}
      </div>

      <div className="w-full bg-indigo-900/30 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            pointsRemaining < maxPoints * 0.2 ? "bg-red-400" : "bg-emerald-400"
          }`}
          style={{
            width: `${Math.min(100, (totalUsed / maxPoints) * 100)}%`,
          }}
        ></div>
      </div>
    </Card>
  );
};
