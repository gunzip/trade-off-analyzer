import { describe, it, expect } from "vitest";
import { encodeState, decodeState } from "./stateEncoding";
import type { AppState } from "../types";

describe("stateEncoding", () => {
  const mockState: AppState = {
    mp: 16,
    ms: 8,
    d: [{ id: "d1", name: "Test Dim", score: 5 }],
    a: [{ id: "a1", source: "d1", target: "d2" }],
  };

  describe("encodeState", () => {
    it("encodes state to base64 string", () => {
      const encoded = encodeState(mockState);
      expect(typeof encoded).toBe("string");
      expect(encoded.length).toBeGreaterThan(0);
    });

    it("handles encoding errors gracefully", () => {
      const circular: any = {};
      circular.self = circular;
      const result = encodeState(circular as AppState);
      expect(result).toBe("");
    });
  });

  describe("decodeState", () => {
    it("decodes base64 string back to state", () => {
      const encoded = encodeState(mockState);
      const decoded = decodeState(encoded);
      expect(decoded).toEqual(mockState);
    });

    it("returns null for empty hash", () => {
      const result = decodeState("");
      expect(result).toBeNull();
    });

    it("returns null for invalid base64", () => {
      const result = decodeState("invalid");
      expect(result).toBeNull();
    });

    it("strips leading # from hash", () => {
      const encoded = encodeState(mockState);
      const decoded = decodeState("#" + encoded);
      expect(decoded).toEqual(mockState);
    });
  });

  describe("round trip", () => {
    it("encode and decode preserves data", () => {
      const encoded = encodeState(mockState);
      const decoded = decodeState(encoded);
      expect(decoded).toEqual(mockState);
    });
  });
});
