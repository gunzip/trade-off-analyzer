import "@testing-library/jest-dom";

// Mock ResizeObserver for Recharts
globalThis.ResizeObserver = class ResizeObserver {
  constructor(cb: any) {
    this.cb = cb;
  }
  cb: any;
  observe() {}
  unobserve() {}
  disconnect() {}
};
