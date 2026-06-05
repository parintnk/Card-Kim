import { describe, it, expect } from "vitest";
import { invitation } from "@/data/invitation";

describe("invitation data", () => {
  it("has the two ceremony days with their events", () => {
    expect(invitation.schedule).toHaveLength(2);

    const day12 = invitation.schedule[0];
    expect(day12.date).toBe("วันที่ 12");
    expect(day12.events).toEqual([
      { time: "15:00", title: "ปลงผมนาค" },
      { time: "17:00–18:30", title: "รับประธานอาหาร" },
      { time: "19:00", title: "พระสงฆ์เจริญพระพุทธมนต์ฉลองไตร" },
    ]);

    const day13 = invitation.schedule[1];
    expect(day13.date).toBe("วันที่ 13");
    expect(day13.events).toEqual([
      { time: "10:00", title: "ร่วมรับประทานอาหาร" },
      { time: "11:00", title: "นำนาคเข้าสู่โบสถ์" },
      { time: "12:30", title: "เริ่มพิธีบวช" },
    ]);
  });

  it("exposes the date, photo, map link, and core copy fields", () => {
    expect(invitation.photo).toBe("/nak.jpg");
    expect(invitation.eventDate.length).toBeGreaterThan(0);
    expect(invitation.nakName.length).toBeGreaterThan(0);
    expect(invitation.invitationText.length).toBeGreaterThan(0);
    expect(invitation.blessing.length).toBeGreaterThan(0);
    expect(invitation.mapUrl).toMatch(/^https:\/\/www\.google\.com\/maps/);
  });
});
