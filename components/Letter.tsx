import Image from "next/image";
import type { Invitation } from "@/data/invitation";
import Schedule from "@/components/Schedule";

export default function Letter({ invitation }: { invitation: Invitation }) {
  return (
    <article className="mx-auto flex w-full max-w-md flex-col items-center gap-8 px-6 py-12 text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl text-gold-deep">❀</span>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted">
          ขอเรียนเชิญ
        </p>
        <h1 className="font-serif text-2xl text-ink">งานอุปสมบท</h1>
      </div>

      <div className="relative h-44 w-36 overflow-hidden rounded-md border border-line shadow-sm">
        <Image
          src={invitation.photo}
          alt={`รูป${invitation.nakName}`}
          fill
          sizes="144px"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <h2 className="font-serif text-xl text-ink">{invitation.nakName}</h2>
        <p className="font-sans text-sm text-muted">{invitation.parents}</p>
        <p className="font-sans text-sm text-muted">{invitation.templeOrVenue}</p>
      </div>

      <div className="h-px w-12 bg-gold" />

      <p className="font-sans text-sm leading-7 text-ink">
        {invitation.invitationText}
      </p>

      <div className="h-px w-12 bg-gold" />

      <Schedule days={invitation.schedule} />
    </article>
  );
}
