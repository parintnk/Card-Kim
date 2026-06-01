"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { Invitation } from "@/data/invitation";
import Letter from "@/components/Letter";

const FLAP_CLIP = "polygon(0 0, 100% 0, 50% 100%)";

/** Static sealed envelope shown before opening. */
function ClosedEnvelope() {
  return (
    <div className="relative h-52 w-80 max-w-[78vw]">
      {/* body + front pocket */}
      <div className="absolute inset-0 rounded-md border border-line bg-white shadow-md" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-md border-x border-b border-line bg-[#fbf9f4]" />
      {/* closed flap */}
      <div
        className="absolute left-0 top-0 h-[58%] w-full border-b border-line bg-[#f3efe6]"
        style={{ clipPath: FLAP_CLIP }}
      />
      {/* wax seal at the flap tip */}
      <div className="absolute left-1/2 top-[46%] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-white text-gold-deep shadow-sm">
        ❀
      </div>
    </div>
  );
}

/** Full-screen overlay that plays the envelope opening, then removes itself. */
function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.0, duration: 0.55, ease: "easeInOut" }}
      onAnimationComplete={onDone}
    >
      <div className="relative h-52 w-80 max-w-[78vw]" style={{ perspective: 900 }}>
        {/* body */}
        <div className="absolute inset-0 rounded-md border border-line bg-white shadow-md" />

        {/* the letter rising out of the envelope (behind the front pocket) */}
        <motion.div
          className="absolute left-1/2 top-3 flex h-44 w-64 max-w-[68vw] -translate-x-1/2 flex-col items-center gap-2 rounded-sm border border-line bg-white pt-7 shadow"
          style={{ zIndex: 1 }}
          initial={{ y: 10 }}
          animate={{ y: -150 }}
          transition={{ delay: 1.05, duration: 0.85, ease: "easeOut" }}
        >
          <span className="text-lg text-gold-deep">❀</span>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
            ขอเรียนเชิญ
          </p>
          <p className="font-serif text-base text-ink">งานอุปสมบท</p>
        </motion.div>

        {/* front pocket — hides the letter until it clears the top */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-md border-x border-b border-line bg-[#fbf9f4]"
          style={{ zIndex: 2 }}
        />

        {/* flap that swings open */}
        <motion.div
          className="absolute left-0 top-0 h-[58%] w-full origin-top border-b border-line bg-[#f3efe6]"
          style={{ clipPath: FLAP_CLIP, zIndex: 3 }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 175 }}
          transition={{ delay: 0.45, duration: 0.7, ease: "easeInOut" }}
        >
          <div className="absolute left-1/2 top-[46%] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-white text-gold-deep shadow-sm">
            ❀
          </div>
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
      <main className="flex min-h-full w-full items-center justify-center bg-cream px-6">
        <motion.button
          type="button"
          onClick={() => setOpened(true)}
          aria-label="เปิดการ์ดเชิญ"
          className="flex cursor-pointer flex-col items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ClosedEnvelope />
          <p className="mt-6 font-serif text-lg text-ink">งานอุปสมบท</p>
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.3em] text-muted">
            แตะเพื่อเปิด
          </p>
        </motion.button>
      </main>
    );
  }

  return (
    <main className="relative min-h-full w-full bg-cream">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduceMotion ? { duration: 0 } : { delay: 1.85, duration: 0.7, ease: "easeOut" }
        }
        className="w-full"
      >
        <Letter invitation={invitation} />
      </motion.div>

      <AnimatePresence>
        {!reduceMotion && !introDone && (
          <EnvelopeIntro key="intro" onDone={() => setIntroDone(true)} />
        )}
      </AnimatePresence>
    </main>
  );
}
