import type { ScheduleDay } from "@/data/invitation";

export default function Schedule({ days }: { days: ScheduleDay[] }) {
  return (
    <div className="flex flex-col gap-12">
      {days.map((day) => (
        <section key={day.date} className="flex flex-col gap-5">
          <h3 className="flex items-center justify-center gap-3 font-serif text-lg tracking-wide text-ink">
            <span aria-hidden className="h-px w-6 bg-gold/50" />
            {day.date}
            <span aria-hidden className="h-px w-6 bg-gold/50" />
          </h3>
          <ul className="mx-auto flex w-full max-w-76 flex-col">
            {day.events.map((event, i) => (
              <li
                key={`${event.time}-${event.title}`}
                className={`flex items-baseline gap-4 py-3 ${i > 0 ? "border-t border-line" : ""}`}
              >
                <span className="w-22 shrink-0 text-right font-display text-lg leading-none tracking-wide text-gold-deep">
                  {event.time}
                </span>
                <span className="font-sans text-sm leading-relaxed text-ink">
                  {event.title}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
