export type ScheduleEvent = {
  time: string;
  title: string;
};

export type ScheduleDay = {
  date: string;
  events: ScheduleEvent[];
};

export type Invitation = {
  nakName: string;
  parents: string;
  templeOrVenue: string;
  mapUrl: string;
  invitationText: string;
  blessing: string;
  photo: string;
  schedule: ScheduleDay[];
};

// Edit these fields with the real details. nakName is still a placeholder.
export const invitation: Invitation = {
  nakName: "นาค ณัฏฐ์เดช คืนตัก",
  parents: "บุตรของ คุณพ่อสุวัจชัย คืนตัก · คุณแม่โสภิญญา เทียนโชติ",
  templeOrVenue: "ณ วัดหนองกุ่มสุมังคลาราม จ.ประจวบคีรีขันธ์",
  mapUrl:
    "https://www.google.com/maps?q=VQ48+79C+%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%A1%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%A1+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5+%E0%B8%AD%E0%B9%88%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%A7%E0%B8%9A%E0%B8%84%E0%B8%B5%E0%B8%A3%E0%B8%B5%E0%B8%82%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C+%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%A7%E0%B8%9A%E0%B8%84%E0%B8%B5%E0%B8%A3%E0%B8%B5%E0%B8%82%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C+77210&ftid=0x30fe83a143d8e1ff:0x2bd44bede1cae9c8",
  invitationText:
    "ด้วยความตั้งใจที่จะอุปสมบททดแทนพระคุณบิดามารดา จึงขอเรียนเชิญท่านผู้มีเกียรติ ร่วมเป็นสักขีพยานและอนุโมทนาบุญในงานอุปสมบทครั้งนี้",
  blessing: "ขออานิสงห์แห่งการอุปสมบทจงบังเกิดแก่ทุกท่าน\nด้วยเทอญ",
  photo: "/nak.jpg",
  schedule: [
    {
      date: "วันที่ 12",
      events: [
        { time: "15:00", title: "ปลงผมนาค" },
        { time: "17:00–18:30", title: "รับประธานอาหาร" },
        { time: "19:00", title: "พระสงฆ์เจริญพระพุทธมนต์ฉลองไตร" },
      ],
    },
    {
      date: "วันที่ 13",
      events: [
        { time: "10:00", title: "รับประทานอาหาร" },
        { time: "11:00", title: "นำนาคเข้าสู่โบสถ์" },
        { time: "12:30", title: "เริ่มพิธีบวช" },
      ],
    },
  ],
};
