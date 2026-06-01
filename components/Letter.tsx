"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Invitation } from "@/data/invitation";
import Schedule from "@/components/Schedule";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-10 bg-linear-to-r from-transparent to-gold/60" />
      <span className="text-xs text-gold-deep">❀</span>
      <span className="h-px w-10 bg-linear-to-l from-transparent to-gold/60" />
    </div>
  );
}

export default function Letter({
  invitation,
  start = true,
}: {
  invitation: Invitation;
  start?: boolean;
}) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: reduce ? {} : { delayChildren: 0.15, staggerChildren: 0.13 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: 0.8, ease: EASE_OUT },
    },
  };

  return (
    <div className="flex min-h-dvh w-full items-center justify-center px-4 py-3">
      <motion.article
        variants={container}
        initial="hidden"
        animate={start ? "show" : "hidden"}
        className="relative flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border border-gold/25 bg-white/80 px-6 py-5 text-center shadow-[0_24px_70px_-28px_rgba(120,100,50,0.45)] backdrop-blur-sm sm:gap-4 sm:py-7"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1.5 rounded-xl border border-gold/15"
        />

        <motion.div variants={item} className="flex flex-col items-center gap-1.5">
          <span className="text-xl text-gold-deep">❀</span>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-muted">
            ขอเรียนเชิญ
          </p>
          <h1 className="font-serif text-2xl leading-tight text-ink">งานอุปสมบท</h1>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-md border border-gold/40 p-1 shadow-[0_8px_26px_-10px_rgba(184,147,47,0.4)]"
        >
          <div className="relative h-28 w-24 overflow-hidden rounded-sm sm:h-32 sm:w-28">
            <Image
              src={invitation.photo}
              alt={`รูป${invitation.nakName}`}
              fill
              sizes="112px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col items-center gap-0.5">
          <h2 className="font-serif text-lg text-ink">{invitation.nakName}</h2>
          <p className="font-sans text-xs text-muted">{invitation.parents}</p>
          <p className="font-sans text-xs text-muted">{invitation.templeOrVenue}</p>
        </motion.div>

        <motion.p
          variants={item}
          className="max-w-68 font-sans text-[11.5px] leading-5 text-ink/85"
        >
          {invitation.invitationText}
        </motion.p>

        <motion.div variants={item} className="w-full">
          <Divider />
        </motion.div>

        <motion.div variants={item} className="w-full">
          <Schedule days={invitation.schedule} />
        </motion.div>
      </motion.article>
    </div>
  );
}
