"use client";

import { useState } from "react";
import type { Invitation } from "@/data/invitation";
import Letter from "@/components/Letter";

const FLAP_CLIP = "polygon(0 0, 100% 0, 50% 100%)";
const PAGE_BG =
  "radial-gradient(125% 85% at 50% 0%, #fdfbf7 0%, #faf9f6 52%, #f3eee3 100%)";

/** Wax seal medallion (double gold ring). */
function Seal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-white shadow-sm ${className}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
        ❀
      </div>
    </div>
  );
}

/** The masthead shared by the rising mini-letter and the real letter, for continuity. */
function Masthead() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-lg text-gold-deep">❀</span>
      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
        ขอเรียนเชิญ
      </p>
      <p className="font-serif text-base text-ink">งานอุปสมบท</p>
    </div>
  );
}

/** Static sealed envelope shown before opening. */
function ClosedEnvelope() {
  return (
    <div className="relative h-52 w-80 max-w-[78vw]">
      <div className="absolute inset-0 rounded-md border border-line bg-white shadow-[0_22px_55px_-24px_rgba(120,100,50,0.4)]" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-md border-x border-b border-line bg-linear-to-b from-[#fcfaf4] to-[#f6efe1]" />
      <div
        className="absolute left-0 top-0 h-[58%] w-full border-b border-line bg-linear-to-b from-[#f7f2e7] to-[#eee5d3]"
        style={{ clipPath: FLAP_CLIP }}
      />
      <Seal className="absolute left-1/2 top-[42%] -translate-x-1/2" />
    </div>
  );
}

/**
 * Full-screen overlay that plays the opening, then fades away (all CSS):
 * seal lifts → flap unfolds and fades → letter glides up → scene fades to the letter.
 */
function EnvelopeIntro() {
  return (
    <div
      className="env-intro fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: PAGE_BG }}
      aria-hidden
    >
      <div className="relative h-52 w-80 max-w-[78vw]" style={{ perspective: 1100 }}>
        <div className="env-body absolute inset-0 rounded-md border border-line bg-white shadow-[0_22px_55px_-24px_rgba(120,100,50,0.4)]" />

        <div
          className="env-letter absolute left-1/2 top-3 flex h-44 w-64 max-w-[68vw] flex-col items-center gap-2 rounded-sm border border-line bg-white pt-8 shadow"
          style={{ zIndex: 15 }}
        >
          <Masthead />
        </div>

        <div
          className="env-pocket absolute inset-x-0 bottom-0 h-[55%] rounded-b-md border-x border-b border-line bg-linear-to-b from-[#fcfaf4] to-[#f6efe1]"
          style={{ zIndex: 20 }}
        />

        <div
          className="env-flap absolute left-0 top-0 h-[58%] w-full origin-top border-b border-line bg-linear-to-b from-[#f7f2e7] to-[#eee5d3]"
          style={{ clipPath: FLAP_CLIP, zIndex: 30 }}
        >
          <div className="env-seal absolute left-1/2 top-[42%] -translate-x-1/2">
            <Seal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Envelope({ invitation }: { invitation: Invitation }) {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return (
      <main className="flex min-h-dvh w-full items-center justify-center px-6">
        <button
          type="button"
          onClick={() => setOpened(true)}
          aria-label="เปิดการ์ดเชิญ"
          className="env-btn cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
        >
          <div className="idle-float flex flex-col items-center">
            <ClosedEnvelope />
            <p className="mt-7 font-serif text-lg text-ink">งานอุปสมบท</p>
            <p className="mt-3 font-sans text-xs uppercase tracking-[0.35em] text-muted">
              แตะเพื่อเปิด
            </p>
          </div>
        </button>
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full">
      <Letter invitation={invitation} />
      <EnvelopeIntro />
    </main>
  );
}
