import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Schedule from "@/components/Schedule";
import type { ScheduleDay } from "@/data/invitation";

const days: ScheduleDay[] = [
  {
    date: "วันที่ 12",
    events: [
      { time: "15:00", title: "โกนผม" },
      { time: "19:00", title: "ฉลองไตร" },
    ],
  },
  {
    date: "วันที่ 13",
    events: [{ time: "11:00", title: "เริ่มแห่นาค" }],
  },
];

describe("Schedule", () => {
  it("renders every day heading", () => {
    render(<Schedule days={days} />);
    expect(screen.getByText("วันที่ 12")).toBeInTheDocument();
    expect(screen.getByText("วันที่ 13")).toBeInTheDocument();
  });

  it("renders every event time and title", () => {
    render(<Schedule days={days} />);
    expect(screen.getByText("15:00")).toBeInTheDocument();
    expect(screen.getByText("โกนผม")).toBeInTheDocument();
    expect(screen.getByText("19:00")).toBeInTheDocument();
    expect(screen.getByText("ฉลองไตร")).toBeInTheDocument();
    expect(screen.getByText("11:00")).toBeInTheDocument();
    expect(screen.getByText("เริ่มแห่นาค")).toBeInTheDocument();
  });
});
