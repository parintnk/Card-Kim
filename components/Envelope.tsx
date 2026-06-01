"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Invitation } from "@/data/invitation";
import Letter from "@/components/Letter";

type OpenState = "closed" | "open";

export default function Envelope({ invitation }: { invitation: Invitation }) {
  const [state, setState] = useState<OpenState>("closed");
  const reduceMotion = useReducedMotion();

  const open = () => setState("open");

  if (state === "open") {
    return (
      <main className="flex min-h-full w-full justify-center bg-cream">
        <motion.div
          initial={reduceMotion ? false : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <Letter invitation={invitation} />
        </motion.div>
      </main>
    );
  }

  return (
    <main className="flex min-h-full w-full items-center justify-center bg-cream px-6">
      <motion.button
        type="button"
        onClick={open}
        aria-label="เปิดการ์ดเชิญ"
        className="group relative flex h-52 w-80 max-w-full cursor-pointer flex-col items-center justify-center rounded-md border border-line bg-white shadow-md outline-none focus-visible:ring-2 focus-visible:ring-gold"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold-deep">
          ❀
        </div>
        <p className="mt-4 font-serif text-lg text-ink">งานอุปสมบท</p>
        <p className="mt-6 font-sans text-xs uppercase tracking-[0.3em] text-muted">
          แตะเพื่อเปิด
        </p>
      </motion.button>
    </main>
  );
}
