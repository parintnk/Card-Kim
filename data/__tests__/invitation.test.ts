import { describe, it, expect } from "vitest";
import { invitation } from "@/data/invitation";

describe("invitation data", () => {
  it("has the two ceremony days with their events", () => {
    expect(invitation.schedule).toHaveLength(2);

    const day12 = invitation.schedule[0];
    expect(day12.date).toBe("วันที่ 12");
    expect(day12.events).toEqual([
      { time: "15:00", title: "โกนผม" },
      { time: "17:00–18:30", title: "รับประธานอาหาร" },
      { time: "19:00", title: "ฉลองไตร" },
    ]);

    const day13 = invitation.schedule[1];
    expect(day13.date).toBe("วันที่ 13");
    expect(day13.events).toEqual([
      { time: "10:00", title: "รับประทานอาหาร" },
      { time: "11:00", title: "เริ่มแห่นาค" },
      { time: "12:30", title: "เริ่มพิธีบวช" },
    ]);
  });

  it("exposes the photo and core copy fields", () => {
    expect(invitation.photo).toBe("/nak.jpg");
    expect(invitation.nakName.length).toBeGreaterThan(0);
    expect(invitation.invitationText.length).toBeGreaterThan(0);
  });
});
