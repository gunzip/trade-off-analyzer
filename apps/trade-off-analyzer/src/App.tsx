import { useState } from "react";
import type { TabType } from "./types";
import { useAppState, useShareLogic } from "./hooks";
import {
  Header,
  ShareWarnings,
  RadarChartVisualization,
  BudgetDashboard,
  MetricsSliders,
  InfoPanel,
  SettingsPanel,
  ConflictMappingPanel,
} from "./components";

/**
 * Trade-off Analyzer
 * A professional tool to visualize and manage architectural project trade-offs.
 * Features:
 * - Global Budget Management
 * - Antithetic (Conflict) Constraints
 * - URL State Persistence (Shareable configurations)
 */

const App = () => {
  // UI State
  const [activeTab, setActiveTab] = useState<TabType>("simulation");

  // Custom hooks for state management
  const {
    maxPoints,
    maxScorePerDim,
    dimensions,
    antitheses,
    initialConfig,
    totalUsed,
    pointsRemaining,
    chartData,
    setMaxPoints,
    setMaxScorePerDim,
    handleScoreChange,
    addDimension,
    removeDimension,
    updateDimensionName,
    resetScores,
    addAntithesis,
    removeAntithesis,
    getAppState,
    getEnemiesForDimension,
  } = useAppState();

  const { copied, shareWarning, handleShare, setShareWarning, resetToDefaults } =
    useShareLogic();

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header
          copied={copied}
          activeTab={activeTab}
          onShare={() => handleShare(getAppState())}
          onTabChange={setActiveTab}
        />

        <ShareWarnings
          shareWarning={shareWarning}
          initialConfig={!!initialConfig}
          onDismissWarning={() => setShareWarning(null)}
          onResetDefaults={resetToDefaults}
        />

        {activeTab === "simulation" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Visualization */}
            <div className="lg:col-span-2">
              <RadarChartVisualization
                chartData={chartData}
                maxScorePerDim={maxScorePerDim}
              />
            </div>

            {/* Right: Controls */}
            <div className="lg:col-span-1 space-y-6">
              <BudgetDashboard
                pointsRemaining={pointsRemaining}
                maxPoints={maxPoints}
                totalUsed={totalUsed}
                onReset={resetScores}
              />

              <MetricsSliders
                dimensions={dimensions}
                maxScorePerDim={maxScorePerDim}
                onScoreChange={handleScoreChange}
                getEnemies={getEnemiesForDimension}
              />

              <InfoPanel />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SettingsPanel
              maxPoints={maxPoints}
              maxScorePerDim={maxScorePerDim}
              dimensions={dimensions}
              onMaxPointsChange={setMaxPoints}
              onMaxScorePerDimChange={setMaxScorePerDim}
              onAddDimension={addDimension}
              onRemoveDimension={removeDimension}
              onUpdateDimensionName={updateDimensionName}
            />

            <ConflictMappingPanel
              dimensions={dimensions}
              antitheses={antitheses}
              onAddAntithesis={addAntithesis}
              onRemoveAntithesis={removeAntithesis}
            />
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default App;
