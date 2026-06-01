import type { ScheduleDay } from "@/data/invitation";

export default function Schedule({ days }: { days: ScheduleDay[] }) {
  return (
    <div className="flex flex-col gap-10">
      {days.map((day) => (
        <section key={day.date} className="flex flex-col gap-4">
          <h3 className="text-center font-serif text-lg text-ink">{day.date}</h3>
          <ul className="mx-auto flex w-full max-w-xs flex-col gap-3">
            {day.events.map((event) => (
              <li
                key={`${event.time}-${event.title}`}
                className="flex items-baseline gap-3 border-b border-line pb-2"
              >
                <span className="w-24 shrink-0 font-sans text-sm tracking-wide text-gold-deep">
                  {event.time}
                </span>
                <span className="font-sans text-sm text-ink">{event.title}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
