import { useState, useMemo } from "react";
import type { Dimension, Antithesis, AppState } from "../types";
import { decodeState } from "../utils/stateEncoding";
import {
  DEFAULT_MAX_POINTS,
  DEFAULT_MAX_SCORE_PER_DIM,
  DEFAULT_DIMENSIONS,
  DEFAULT_ANTITHESES,
} from "../utils/constants";

export const useAppState = () => {
  // Initialize from URL if available
  const initialConfig = useMemo(() => {
    if (typeof window !== "undefined") {
      return decodeState(window.location.hash);
    }
    return null;
  }, []);

  // Global constraints
  const [maxPoints, setMaxPoints] = useState(
    initialConfig?.mp ?? DEFAULT_MAX_POINTS
  );
  const [maxScorePerDim, setMaxScorePerDim] = useState(
    initialConfig?.ms ?? DEFAULT_MAX_SCORE_PER_DIM
  );

  // Metrics
  const [dimensions, setDimensions] = useState<Dimension[]>(
    initialConfig?.d || DEFAULT_DIMENSIONS
  );

  // Conflicts
  const [antitheses, setAntitheses] = useState<Antithesis[]>(
    initialConfig?.a || DEFAULT_ANTITHESES
  );

  // Computed values
  const totalUsed = useMemo(
    () => dimensions.reduce((acc, curr) => acc + curr.score, 0),
    [dimensions]
  );

  const pointsRemaining = maxPoints - totalUsed;

  const chartData = dimensions.map((d) => ({
    subject: d.name,
    A: d.score,
    fullMark: maxScorePerDim,
  }));

  // Dimension operations
  const handleScoreChange = (dimId: string, newValue: number) => {
    const currentDimIndex = dimensions.findIndex((d) => d.id === dimId);
    const currentDim = dimensions[currentDimIndex];
    const delta = newValue - currentDim.score;

    if (delta === 0) return;

    let newDimensions = dimensions.map((d) => ({ ...d }));

    if (delta < 0) {
      newDimensions[currentDimIndex].score = Math.max(0, newValue);
      setDimensions(newDimensions);
      return;
    }

    let remainingDelta = delta;
    const currentTotal = dimensions.reduce((acc, d) => acc + d.score, 0);
    const availableGlobal = maxPoints - currentTotal;

    if (availableGlobal > 0) {
      const pointsFromBudget = Math.min(availableGlobal, remainingDelta);
      remainingDelta -= pointsFromBudget;
    }

    if (remainingDelta > 0) {
      const enemies = antitheses
        .filter((a) => a.source === dimId || a.target === dimId)
        .map((a) => (a.source === dimId ? a.target : a.source));

      if (enemies.length > 0) {
        enemies.forEach((enemyId) => {
          if (remainingDelta <= 0) return;

          const enemyIndex = newDimensions.findIndex((d) => d.id === enemyId);
          if (enemyIndex === -1) return;

          const enemy = newDimensions[enemyIndex];
          const pointsToSteal = Math.min(enemy.score, remainingDelta);

          if (pointsToSteal > 0) {
            newDimensions[enemyIndex].score = Math.max(
              0,
              enemy.score - pointsToSteal
            );
            remainingDelta -= pointsToSteal;
          }
        });
      }
    }

    const actualIncrease = delta - remainingDelta;
    newDimensions[currentDimIndex].score = Math.max(
      0,
      currentDim.score + actualIncrease
    );

    newDimensions = newDimensions.map((d) => ({
      ...d,
      score: Math.max(0, d.score),
    }));

    setDimensions(newDimensions);
  };

  const addDimension = () => {
    const newId = `d${Date.now()}`;
    setDimensions([...dimensions, { id: newId, name: "New Metric", score: 0 }]);
  };

  const removeDimension = (id: string) => {
    setDimensions(dimensions.filter((d) => d.id !== id));
    setAntitheses(antitheses.filter((a) => a.source !== id && a.target !== id));
  };

  const updateDimensionName = (id: string, name: string) => {
    setDimensions(dimensions.map((d) => (d.id === id ? { ...d, name } : d)));
  };

  const resetScores = () => {
    setDimensions(dimensions.map((d) => ({ ...d, score: 0 })));
  };

  // Antithesis operations
  const addAntithesis = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    const exists = antitheses.find(
      (a) =>
        (a.source === sourceId && a.target === targetId) ||
        (a.source === targetId && a.target === sourceId)
    );
    if (!exists) {
      setAntitheses([
        ...antitheses,
        { id: `a${Date.now()}`, source: sourceId, target: targetId },
      ]);
    }
  };

  const removeAntithesis = (id: string) => {
    setAntitheses(antitheses.filter((a) => a.id !== id));
  };

  const getAppState = (): AppState => ({
    mp: maxPoints,
    ms: maxScorePerDim,
    d: dimensions,
    a: antitheses,
  });

  const getEnemiesForDimension = (dimId: string): string[] => {
    return antitheses
      .filter((a) => a.source === dimId || a.target === dimId)
      .map((a) => {
        const enemyId = a.source === dimId ? a.target : a.source;
        return dimensions.find((d) => d.id === enemyId)?.name || "";
      })
      .filter(Boolean);
  };

  return {
    // State
    maxPoints,
    maxScorePerDim,
    dimensions,
    antitheses,
    initialConfig,
    // Computed
    totalUsed,
    pointsRemaining,
    chartData,
    // Setters
    setMaxPoints,
    setMaxScorePerDim,
    // Operations
    handleScoreChange,
    addDimension,
    removeDimension,
    updateDimensionName,
    resetScores,
    addAntithesis,
    removeAntithesis,
    getAppState,
    getEnemiesForDimension,
  };
};
