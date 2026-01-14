import { useRef } from "react";
import { Unlink, Plus, Trash2 } from "lucide-react";
import { Card } from "./Card";
import type { Dimension, Antithesis } from "../types";

type ConflictMappingPanelProps = {
  dimensions: Dimension[];
  antitheses: Antithesis[];
  onAddAntithesis: (sourceId: string, targetId: string) => void;
  onRemoveAntithesis: (id: string) => void;
};

export const ConflictMappingPanel = ({
  dimensions,
  antitheses,
  onAddAntithesis,
  onRemoveAntithesis,
}: ConflictMappingPanelProps) => {
  const sourceRef = useRef<HTMLSelectElement>(null);
  const targetRef = useRef<HTMLSelectElement>(null);

  const handleAddConflict = () => {
    if (!sourceRef.current || !targetRef.current) return;
    
    const sourceId = sourceRef.current.value;
    const targetId = targetRef.current.value;
    onAddAntithesis(sourceId, targetId);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Unlink className="w-5 h-5 text-orange-500" />
        Conflict Mapping
      </h3>

      <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6 text-sm text-orange-800">
        Define dimensions that are inherently opposed. Increasing one will
        attempt to decrease the other if the budget is empty.
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2 items-end bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="w-full md:flex-1">
            <label className="text-xs text-slate-500 mb-1 block">
              Dimension A
            </label>
            <select
              ref={sourceRef}
              className="w-full p-2 border border-slate-300 rounded-md text-sm bg-white"
            >
              {dimensions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-slate-400 pb-2 font-bold hidden md:block">
            VS
          </div>
          <div className="w-full md:flex-1">
            <label className="text-xs text-slate-500 mb-1 block">
              Dimension B
            </label>
            <select
              ref={targetRef}
              className="w-full p-2 border border-slate-300 rounded-md text-sm bg-white"
            >
              {dimensions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddConflict}
            className="w-full md:w-auto bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors shadow-sm"
          >
            <Plus size={20} className="mx-auto" />
          </button>
        </div>

        <div className="space-y-2 mt-4">
          <h4 className="font-semibold text-slate-700 text-sm">
            Active Conflicts
          </h4>
          {antitheses.length === 0 && (
            <p className="text-slate-400 italic text-sm py-4">
              No conflicts defined yet.
            </p>
          )}
          {antitheses.map((ant) => {
            const sourceName =
              dimensions.find((d) => d.id === ant.source)?.name || "???";
            const targetName =
              dimensions.find((d) => d.id === ant.target)?.name || "???";
            return (
              <div
                key={ant.id}
                className="flex justify-between items-center bg-white border border-slate-200 p-3 rounded-lg shadow-sm hover:border-orange-200 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-700">
                    {sourceName}
                  </span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold">
                    VS
                  </span>
                  <span className="font-medium text-slate-700">
                    {targetName}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveAntithesis(ant.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
