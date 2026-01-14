import { Activity, Share2, Check, Settings } from "lucide-react";
import type { TabType } from "../types";

type HeaderProps = {
  copied: boolean;
  activeTab: TabType;
  onShare: () => void;
  onTabChange: (tab: TabType) => void;
};

export const Header = ({
  copied,
  activeTab,
  onShare,
  onTabChange,
}: HeaderProps) => {
  return (
    <header className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h1
          className="text-3xl font-bold text-indigo-700 flex items-center gap-2 cursor-pointer hover:underline"
          onClick={() => onTabChange("simulation")}
          title="Go to Home"
        >
          <Activity className="w-8 h-8" />
          Trade-off Analyzer
        </h1>
        <p className="text-slate-500 mt-1">
          Visualize architectural compromises and manage project constraints.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onShare}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all shadow-sm border ${
            copied
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
          title="Copy configuration link to clipboard"
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          {copied ? "Copied!" : "Share"}
        </button>

        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          <button
            onClick={() => onTabChange("simulation")}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === "simulation"
                ? "bg-indigo-100 text-indigo-700 shadow-sm"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            Simulation
          </button>
          <button
            onClick={() => onTabChange("config")}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === "config"
                ? "bg-indigo-100 text-indigo-700 shadow-sm"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </button>
        </div>
      </div>
    </header>
  );
};
