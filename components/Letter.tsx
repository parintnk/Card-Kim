"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Invitation } from "@/data/invitation";
import Schedule from "@/components/Schedule";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-12 bg-linear-to-r from-transparent to-gold/60" />
      <span className="text-xs text-gold-deep">❀</span>
      <span className="h-px w-12 bg-linear-to-l from-transparent to-gold/60" />
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
      transition: reduce ? {} : { delayChildren: 0.15, staggerChildren: 0.16 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE_OUT },
    },
  };

  return (
    <motion.article
      variants={container}
      initial="hidden"
      animate={start ? "show" : "hidden"}
      className="mx-auto flex w-full max-w-md flex-col items-center gap-10 px-7 py-16 text-center sm:gap-12 sm:py-24"
    >
      <motion.div variants={item} className="flex flex-col items-center gap-3">
        <span className="text-2xl text-gold-deep">❀</span>
        <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-muted">
          ขอเรียนเชิญ
        </p>
        <h1 className="font-serif text-[28px] leading-tight text-ink sm:text-3xl">
          งานอุปสมบท
        </h1>
      </motion.div>

      <motion.div
        variants={item}
        className="rounded-md border border-gold/40 p-1.5 shadow-[0_10px_40px_-12px_rgba(184,147,47,0.35)]"
      >
        <div className="relative h-52 w-40 overflow-hidden rounded-sm sm:h-56 sm:w-44">
          <Image
            src={invitation.photo}
            alt={`รูป${invitation.nakName}`}
            fill
            sizes="(min-width: 640px) 176px, 160px"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      <motion.div variants={item} className="flex flex-col items-center gap-1.5">
        <h2 className="font-serif text-xl text-ink sm:text-2xl">{invitation.nakName}</h2>
        <p className="font-sans text-sm text-muted">{invitation.parents}</p>
        <p className="font-sans text-sm text-muted">{invitation.templeOrVenue}</p>
      </motion.div>

      <motion.div variants={item}>
        <Divider />
      </motion.div>

      <motion.p
        variants={item}
        className="max-w-sm font-sans text-[15px] leading-8 text-ink/90"
      >
        {invitation.invitationText}
      </motion.p>

      <motion.div variants={item}>
        <Divider />
      </motion.div>

      <motion.div variants={item} className="w-full">
        <Schedule days={invitation.schedule} />
      </motion.div>

      <motion.span variants={item} className="pt-2 text-lg text-gold-deep" aria-hidden>
        ❀
      </motion.span>
    </motion.article>
  );
}
