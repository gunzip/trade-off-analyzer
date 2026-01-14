import type { AppState } from "../types";

export const encodeState = (state: AppState): string => {
  try {
    const json = JSON.stringify(state);
    const utf8Bytes = new TextEncoder().encode(json);
    const binaryString = String.fromCharCode(...utf8Bytes);
    return btoa(binaryString);
  } catch (e) {
    console.error("Encoding failed", e);
    return "";
  }
};

export const decodeState = (hash: string): AppState | null => {
  try {
    if (!hash) return null;
    const cleanHash = hash.replace(/^#/, "");
    const binaryString = atob(cleanHash);
    const utf8Bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(utf8Bytes);
    return JSON.parse(json);
  } catch (e) {
    console.error("Decoding failed", e);
    return null;
  }
};
