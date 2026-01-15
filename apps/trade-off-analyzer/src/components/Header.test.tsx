import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  const defaultProps = {
    copied: false,
    activeTab: "simulation" as const,
    onShare: vi.fn(),
    onTabChange: vi.fn(),
  };

  it("renders the title", () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText("Trade-off Analyzer")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Header {...defaultProps} />);
    expect(
      screen.getByText(
        "Visualize architectural compromises and manage project constraints."
      )
    ).toBeInTheDocument();
  });

  it("calls onTabChange when title is clicked", () => {
    const mockOnTabChange = vi.fn();
    render(<Header {...defaultProps} onTabChange={mockOnTabChange} />);

    fireEvent.click(screen.getByText("Trade-off Analyzer"));
    expect(mockOnTabChange).toHaveBeenCalledWith("simulation");
  });

  it("renders share button", () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument();
  });

  it("calls onShare when share button is clicked", () => {
    const mockOnShare = vi.fn();
    render(<Header {...defaultProps} onShare={mockOnShare} />);

    fireEvent.click(screen.getByRole("button", { name: /share/i }));
    expect(mockOnShare).toHaveBeenCalled();
  });

  it("shows copied state when copied is true", () => {
    render(<Header {...defaultProps} copied={true} />);
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });
});
