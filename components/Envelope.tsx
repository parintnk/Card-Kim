"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { Invitation } from "@/data/invitation";
import Letter from "@/components/Letter";

const FLAP_CLIP = "polygon(0 0, 100% 0, 50% 100%)";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** The masthead shared by the rising mini-letter and the real letter, for continuity. */
function Masthead({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className={compact ? "text-lg text-gold-deep" : "text-xl text-gold-deep"}>❀</span>
      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
        ขอเรียนเชิญ
      </p>
      <p className={`font-serif text-ink ${compact ? "text-base" : "text-2xl"}`}>
        งานอุปสมบท
      </p>
    </div>
  );
}

/** Static sealed envelope shown before opening. */
function ClosedEnvelope() {
  return (
    <div className="relative h-52 w-80 max-w-[78vw]">
      <div className="absolute inset-0 rounded-md border border-line bg-white shadow-md" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-md border-x border-b border-line bg-[#fbf9f4]" />
      <div
        className="absolute left-0 top-0 h-[58%] w-full border-b border-line bg-[#f3efe6]"
        style={{ clipPath: FLAP_CLIP }}
      />
      <div className="absolute left-1/2 top-[46%] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-white text-gold-deep shadow-sm">
        ❀
      </div>
    </div>
  );
}

/**
 * Full-screen overlay that plays the opening, then removes itself:
 * seal lifts → flap unfolds and fades → letter springs up → scene fades to the letter.
 */
function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.0, duration: 0.35, ease: "easeIn" }}
      onAnimationComplete={onDone}
    >
      <div className="relative h-52 w-80 max-w-[78vw]" style={{ perspective: 1000 }}>
        {/* body */}
        <motion.div
          className="absolute inset-0 rounded-md border border-line bg-white shadow-md"
          style={{ zIndex: 10 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        />

        {/* letter springing up out of the pocket (behind the front panel) */}
        <motion.div
          className="absolute left-1/2 top-3 flex h-44 w-64 max-w-[68vw] -translate-x-1/2 flex-col items-center justify-start gap-2 rounded-sm border border-line bg-white pt-8 shadow"
          style={{ zIndex: 15 }}
          initial={{ y: 12 }}
          animate={{ y: -168 }}
          transition={{ type: "spring", stiffness: 130, damping: 17, delay: 0.42 }}
        >
          <Masthead compact />
        </motion.div>

        {/* front pocket — keeps the letter tucked until it clears the top edge */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-md border-x border-b border-line bg-[#fbf9f4]"
          style={{ zIndex: 20 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        />

        {/* flap lifts open AND fades, so it never occludes the rising letter */}
        <motion.div
          className="absolute left-0 top-0 h-[58%] w-full origin-top border-b border-line bg-[#f3efe6]"
          style={{ clipPath: FLAP_CLIP, zIndex: 30 }}
          initial={{ rotateX: 0, opacity: 1 }}
          animate={{ rotateX: -165, opacity: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: EASE_OUT }}
        >
          <motion.div
            className="absolute left-1/2 top-[46%] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-white text-gold-deep shadow-sm"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeIn" }}
          >
            ❀
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
      <main className="flex min-h-full w-full items-center justify-center bg-cream px-6">
        <motion.button
          type="button"
          onClick={() => setOpened(true)}
          aria-label="เปิดการ์ดเชิญ"
          className="flex cursor-pointer flex-col items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
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
        initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { delay: 0.95, duration: 0.45, ease: "easeOut" }
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
