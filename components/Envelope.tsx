"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { Invitation } from "@/data/invitation";
import Letter from "@/components/Letter";

const FLAP_CLIP = "polygon(0 0, 100% 0, 50% 100%)";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
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
 * Full-screen overlay that plays the opening, then removes itself:
 * seal lifts → flap unfolds and fades → letter glides up → scene fades to the letter.
 */
function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: PAGE_BG }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.45, duration: 0.55, ease: "easeIn" }}
      onAnimationComplete={onDone}
    >
      <div className="relative h-52 w-80 max-w-[78vw]" style={{ perspective: 1100 }}>
        {/* body */}
        <motion.div
          className="absolute inset-0 rounded-md border border-line bg-white shadow-[0_22px_55px_-24px_rgba(120,100,50,0.4)]"
          style={{ zIndex: 10 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
        />

        {/* letter gliding up out of the pocket (behind the front panel) */}
        <motion.div
          className="absolute left-1/2 top-3 flex h-44 w-64 max-w-[68vw] -translate-x-1/2 flex-col items-center justify-start gap-2 rounded-sm border border-line bg-white pt-8 shadow"
          style={{ zIndex: 15 }}
          initial={{ y: 12 }}
          animate={{ y: -172 }}
          transition={{ type: "spring", stiffness: 75, damping: 15, delay: 0.6 }}
        >
          <Masthead />
        </motion.div>

        {/* front pocket — keeps the letter tucked until it clears the top edge */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-md border-x border-b border-line bg-linear-to-b from-[#fcfaf4] to-[#f6efe1]"
          style={{ zIndex: 20 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
        />

        {/* flap lifts open AND fades, so it never occludes the rising letter */}
        <motion.div
          className="absolute left-0 top-0 h-[58%] w-full origin-top border-b border-line bg-linear-to-b from-[#f7f2e7] to-[#eee5d3]"
          style={{ clipPath: FLAP_CLIP, zIndex: 30 }}
          initial={{ rotateX: 0, opacity: 1 }}
          animate={{ rotateX: -160, opacity: 0 }}
          transition={{ delay: 0.25, duration: 0.85, ease: EASE_OUT }}
        >
          <motion.div
            className="absolute left-1/2 top-[42%] -translate-x-1/2"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0.5, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.45, ease: "easeIn" }}
          >
            <Seal />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Envelope({ invitation }: { invitation: Invitation }) {
  const [opened, setOpened] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const reduceMotion = useReducedMotion();

  if (!opened) {
    return (
      <main className="flex min-h-dvh w-full items-center justify-center px-6">
        <motion.button
          type="button"
          onClick={() => setOpened(true)}
          aria-label="เปิดการ์ดเชิญ"
          className="flex cursor-pointer flex-col items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ClosedEnvelope />
          <p className="mt-7 font-serif text-lg text-ink">งานอุปสมบท</p>
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.35em] text-muted">
            แตะเพื่อเปิด
          </p>
        </motion.button>
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full">
      <Letter invitation={invitation} start={introDone || !!reduceMotion} />

      <AnimatePresence>
        {!reduceMotion && !introDone && (
          <EnvelopeIntro key="intro" onDone={() => setIntroDone(true)} />
        )}
      </AnimatePresence>
    </main>
  );
}
