import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useShareLogic } from "@/hooks/useShareLogic";
import { AppState } from "@/types";

// Mock clipboard API
const mockWriteText = vi.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
});

// Mock document.execCommand
Object.assign(document, {
  execCommand: vi.fn(),
});

describe("useShareLogic", () => {
  const mockConfig: AppState = {
    mp: 16,
    ms: 8,
    d: [],
    a: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset copied state
  });

  it("initializes with default state", () => {
    const { result } = renderHook(() => useShareLogic());

    expect(result.current.copied).toBe(false);
    expect(result.current.shareWarning).toBeNull();
  });

  it("handles share successfully", () => {
    const mockExecCommand = vi.fn().mockReturnValue(true);
    Object.assign(document, { execCommand: mockExecCommand });

    const { result } = renderHook(() => useShareLogic());

    act(() => {
      result.current.handleShare(mockConfig);
    });

    expect(mockExecCommand).toHaveBeenCalledWith("copy");
  });

  it("sets copied to true on successful share", () => {
    const mockExecCommand = vi.fn().mockReturnValue(true);
    Object.assign(document, { execCommand: mockExecCommand });

    const { result } = renderHook(() => useShareLogic());

    act(() => {
      result.current.handleShare(mockConfig);
    });

    expect(result.current.copied).toBe(true);
  });

  it("resets copied after timeout", () => {
    vi.useFakeTimers();
    const mockExecCommand = vi.fn().mockReturnValue(true);
    Object.assign(document, { execCommand: mockExecCommand });

    const { result } = renderHook(() => useShareLogic());

    act(() => {
      result.current.handleShare(mockConfig);
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
    vi.useRealTimers();
  });
});
