import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("App", () => {
  it("renders the main application", () => {
    render(<App />);
    expect(screen.getByText("Trade-off Analyzer")).toBeInTheDocument();
  });

  it("renders the header", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the radar chart visualization", () => {
    render(<App />);
    // Assuming the chart has some identifiable text or element
    expect(screen.getByText("Simulation")).toBeInTheDocument();
  });
});