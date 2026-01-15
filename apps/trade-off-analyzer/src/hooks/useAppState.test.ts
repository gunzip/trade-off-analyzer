import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAppState } from "@/hooks/useAppState";
import { act } from "react";

// Mock window.location
const mockLocation = {
  hash: "",
};

Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

describe("useAppState", () => {
  beforeEach(() => {
    mockLocation.hash = "";
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current.maxPoints).toBe(16);
    expect(result.current.maxScorePerDim).toBe(8);
    expect(result.current.dimensions).toHaveLength(6);
    expect(result.current.antitheses).toHaveLength(7);
  });

  it("calculates totalUsed correctly", () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.handleScoreChange("d1", 5);
    });

    expect(result.current.totalUsed).toBe(5);
  });

  it("calculates pointsRemaining correctly", () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current.pointsRemaining).toBe(16); // 16 - 0

    act(() => {
      result.current.handleScoreChange("d1", 5);
    });

    expect(result.current.pointsRemaining).toBe(11); // 16 - 5
  });

  it("adds a dimension", () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.addDimension();
    });

    expect(result.current.dimensions).toHaveLength(7);
    expect(result.current.dimensions[6].name).toBe("New Metric");
  });

  it("removes a dimension", () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.removeDimension("d1");
    });

    expect(result.current.dimensions).toHaveLength(5);
    expect(
      result.current.dimensions.find((d) => d.id === "d1")
    ).toBeUndefined();
  });
});
