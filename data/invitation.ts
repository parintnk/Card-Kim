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
  invitationText: string;
  photo: string;
  schedule: ScheduleDay[];
};

// Placeholder copy — edit these fields with the real details before sharing.
export const invitation: Invitation = {
  nakName: "นาค [ชื่อ-นามสกุล]",
  parents: "บุตรของ คุณพ่อ [ชื่อ] · คุณแม่ [ชื่อ]",
  templeOrVenue: "ณ [ชื่อวัด/สถานที่]",
  invitationText:
    "ด้วยความตั้งใจที่จะอุปสมบททดแทนพระคุณบิดามารดา จึงขอเรียนเชิญท่านผู้มีเกียรติ ร่วมเป็นสักขีพยานและอนุโมทนาบุญในงานอุปสมบทครั้งนี้",
  photo: "/nak.jpg",
  schedule: [
    {
      date: "วันที่ 12",
      events: [
        { time: "15:00", title: "โกนผม" },
        { time: "17:00–18:30", title: "รับประธานอาหาร" },
        { time: "19:00", title: "ฉลองไตร" },
      ],
    },
    {
      date: "วันที่ 13",
      events: [
        { time: "10:00", title: "รับประทานอาหาร" },
        { time: "11:00", title: "เริ่มแห่นาค" },
        { time: "12:30", title: "เริ่มพิธีบวช" },
      ],
    },
  ],
};
