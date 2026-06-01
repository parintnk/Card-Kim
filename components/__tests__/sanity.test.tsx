import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

function Hello() {
  return <p>hello</p>;
}

describe("test harness", () => {
  it("renders a component", () => {
    render(<Hello />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
