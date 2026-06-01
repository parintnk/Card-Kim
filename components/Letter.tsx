import Image from "next/image";
import type { CSSProperties } from "react";
import type { Invitation } from "@/data/invitation";
import Schedule from "@/components/Schedule";

/** Stagger index for the CSS reveal-up animation. */
const at = (i: number) => ({ "--i": i }) as CSSProperties;

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-10 bg-linear-to-r from-transparent to-gold/60" />
      <span className="text-xs text-gold-deep">❀</span>
      <span className="h-px w-10 bg-linear-to-l from-transparent to-gold/60" />
    </div>
  );
}

export default function Letter({ invitation }: { invitation: Invitation }) {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center px-4 py-3">
      <article className="relative flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border border-gold/25 bg-white/80 px-6 py-5 text-center shadow-[0_24px_70px_-28px_rgba(120,100,50,0.45)] backdrop-blur-sm sm:gap-4 sm:py-7">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1.5 rounded-xl border border-gold/15"
        />

        <div className="reveal-item flex flex-col items-center gap-1.5" style={at(0)}>
          <span className="text-xl text-gold-deep">❀</span>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-muted">
            ขอเรียนเชิญ
          </p>
          <h1 className="font-serif text-2xl leading-tight text-ink">งานอุปสมบท</h1>
        </div>

        <div
          className="reveal-item rounded-md border border-gold/40 p-1 shadow-[0_8px_26px_-10px_rgba(184,147,47,0.4)]"
          style={at(1)}
        >
          <div className="relative h-36 w-24 overflow-hidden rounded-sm sm:h-40 sm:w-28">
            <Image
              src={invitation.photo}
              alt={`รูป${invitation.nakName}`}
              fill
              sizes="(min-width: 640px) 112px, 96px"
              className="object-cover object-[center_22%]"
              priority
            />
          </div>
        </div>

        <div className="reveal-item flex flex-col items-center gap-0.5" style={at(2)}>
          <h2 className="font-serif text-lg text-ink">{invitation.nakName}</h2>
          <p className="font-sans text-xs text-muted">{invitation.parents}</p>
          <p className="font-sans text-xs text-muted">{invitation.templeOrVenue}</p>
        </div>

        <p
          className="reveal-item max-w-68 font-sans text-[11.5px] leading-5 text-ink/85"
          style={at(3)}
        >
          {invitation.invitationText}
        </p>

        <div className="reveal-item w-full" style={at(4)}>
          <Divider />
        </div>

        <div className="reveal-item w-full" style={at(5)}>
          <Schedule days={invitation.schedule} />
        </div>
      </article>
    </div>
  );
}
