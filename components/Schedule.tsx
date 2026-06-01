import type { ScheduleDay } from "@/data/invitation";

export default function Schedule({ days }: { days: ScheduleDay[] }) {
  return (
    <div className="grid w-full grid-cols-2 gap-x-4">
      {days.map((day) => (
        <section key={day.date} className="flex flex-col items-center gap-2.5">
          <h3 className="flex items-center gap-2 font-serif text-sm tracking-wide text-ink">
            <span aria-hidden className="h-px w-4 bg-gold/50" />
            {day.date}
            <span aria-hidden className="h-px w-4 bg-gold/50" />
          </h3>
          <ul className="flex flex-col gap-2.5">
            {day.events.map((event) => (
              <li
                key={`${event.time}-${event.title}`}
                className="flex flex-col items-center leading-tight"
              >
                <span className="font-display text-base tracking-wide text-gold-deep">
                  {event.time}
                </span>
                <span className="font-sans text-[11px] text-ink">{event.title}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
