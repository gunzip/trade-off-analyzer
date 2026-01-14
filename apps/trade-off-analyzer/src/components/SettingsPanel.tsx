import { Settings, Plus, Trash2 } from "lucide-react";
import { Card } from "./Card";
import type { Dimension } from "../types";

type SettingsPanelProps = {
  maxPoints: number;
  maxScorePerDim: number;
  dimensions: Dimension[];
  onMaxPointsChange: (value: number) => void;
  onMaxScorePerDimChange: (value: number) => void;
  onAddDimension: () => void;
  onRemoveDimension: (id: string) => void;
  onUpdateDimensionName: (id: string, name: string) => void;
};

export const SettingsPanel = ({
  maxPoints,
  maxScorePerDim,
  dimensions,
  onMaxPointsChange,
  onMaxScorePerDimChange,
  onAddDimension,
  onRemoveDimension,
  onUpdateDimensionName,
}: SettingsPanelProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Settings className="w-5 h-5 text-indigo-600" />
        Model Parameters
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Total Points Budget
          </label>
          <input
            type="number"
            value={maxPoints}
            onChange={(e) => onMaxPointsChange(parseInt(e.target.value) || 0)}
            className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Max per Dimension
          </label>
          <input
            type="number"
            value={maxScorePerDim}
            onChange={(e) =>
              onMaxScorePerDimChange(parseInt(e.target.value) || 0)
            }
            className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center border-b border-slate-100 pb-2">
        <h4 className="font-semibold text-slate-700">Metrics List</h4>
        <button
          onClick={onAddDimension}
          className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-100 font-medium flex items-center gap-1 transition-colors"
        >
          <Plus size={14} /> Add Metric
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {dimensions.map((dim) => (
          <div key={dim.id} className="flex gap-2 items-center group">
            <input
              type="text"
              value={dim.name}
              onChange={(e) => onUpdateDimensionName(dim.id, e.target.value)}
              className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none transition-all"
            />
            <button
              onClick={() => onRemoveDimension(dim.id)}
              className="text-slate-300 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
              title="Remove dimension"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};
