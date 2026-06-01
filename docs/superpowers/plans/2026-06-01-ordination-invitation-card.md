# Ordination Invitation Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Next.js web invitation for a Buddhist ordination ceremony (งานบวช) that opens like a letter — a closed envelope the guest taps to reveal the invitation message, ordinand photo, and two-day schedule.

**Architecture:** All copy and schedule data live in one typed file (`data/invitation.ts`). A server component (`app/page.tsx`) passes that data into a client `Envelope` component that owns a `closed → opening → open` state machine and runs the open animation with `motion`. Presentational `Letter` and `Schedule` components render the content. Minimal-modern visual theme (off-white + muted gold) defined as Tailwind v4 theme tokens.

**Tech Stack:** Next.js 16.2.6 (App Router), React 19, TypeScript, Tailwind CSS v4, `motion` (animation), Vitest + React Testing Library (component tests). Deploy: Vercel.

> **Note for implementer:** This Next.js version (16.2.6) has breaking changes vs. older releases. When unsure about `next/font`, `next/image`, metadata, or config APIs, consult `node_modules/next/dist/docs/` rather than relying on memory.

---

## File Structure

- `data/invitation.ts` — Create. Typed content: ordinand name, parents, venue, invitation text, photo path, two-day schedule. Single source of all copy.
- `app/globals.css` — Modify. Replace boilerplate with Tailwind v4 import + invitation theme tokens (colors, fonts). Remove dark-mode auto-switching.
- `app/layout.tsx` — Modify. Load Thai fonts via `next/font/google`, set page metadata + Open Graph tags, apply theme to `<html>`/`<body>`.
- `app/page.tsx` — Modify. Replace boilerplate; import invitation data and render `<Envelope>`.
- `components/Schedule.tsx` — Create. Presentational two-day timeline. Pure (no fonts/images).
- `components/Letter.tsx` — Create. Letter content: invitation text → photo (`next/image`) → `<Schedule>`.
- `components/Envelope.tsx` — Create. `"use client"`. Owns open state + `motion` open animation; respects reduced motion; renders `<Letter>` once opening.
- `public/nak.jpg` — Add. Ordinand photo (placeholder until the real file is dropped in).
- `vitest.config.ts` — Create. Vitest + jsdom + React plugin config.
- `vitest.setup.ts` — Create. Imports `@testing-library/jest-dom`.
- `package.json` — Modify. Add `test` script + dependencies.

---

## Task 1: Install dependencies and set up the test harness

**Files:**
- Modify: `package.json` (scripts + deps via install)
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `components/__tests__/sanity.test.tsx`

- [ ] **Step 1: Install runtime + dev dependencies**

```bash
npm install motion
npm install -D vitest@^3 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react
```

Expected: installs succeed; `motion` appears under `dependencies`, the rest under `devDependencies` in `package.json`.

- [ ] **Step 2: Create the Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
```

- [ ] **Step 3: Create the Vitest setup file**

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add the test script**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write a sanity test to prove the harness works**

Create `components/__tests__/sanity.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

function Hello() {
  return <p>hello</p>;
}

describe("test harness", () => {
  it("renders a component", () => {
    render(<Hello />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run the test to verify the harness passes**

Run: `npm test`
Expected: PASS — 1 passing test.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts components/__tests__/sanity.test.tsx
git commit -m "chore: add motion dependency and vitest test harness"
```

---

## Task 2: Theme tokens and global styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with the invitation theme**

Overwrite `app/globals.css` entirely:

```css
@import "tailwindcss";

:root {
  --cream: #faf9f6;
  --ink: #1a1a1a;
  --muted: #8a8a8a;
  --gold: #c2b280;
  --gold-deep: #b8932f;
  --line: #e6e1d6;
}

@theme inline {
  --color-cream: var(--cream);
  --color-ink: var(--ink);
  --color-muted: var(--muted);
  --color-gold: var(--gold);
  --color-gold-deep: var(--gold-deep);
  --color-line: var(--line);
  --font-sans: var(--font-noto-sans-thai);
  --font-serif: var(--font-noto-serif-thai);
}

html,
body {
  height: 100%;
}

body {
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

Note: this is light-theme only by design — no `prefers-color-scheme` dark block. The font CSS variables (`--font-noto-sans-thai`, `--font-noto-serif-thai`) are provided by `next/font` in Task 3.

- [ ] **Step 2: Verify the app still builds**

Run: `npm run build`
Expected: build succeeds (page still renders the old boilerplate — that's fine, replaced in Task 6).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add minimal-modern invitation theme tokens"
```

---

## Task 3: Fonts, metadata, and layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx with Thai fonts + metadata**

Overwrite `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
});

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-noto-serif-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "การ์ดเชิญงานอุปสมบท",
  description: "ขอเรียนเชิญร่วมเป็นเกียรติในงานอุปสมบท",
  openGraph: {
    title: "การ์ดเชิญงานอุปสมบท",
    description: "ขอเรียนเชิญร่วมเป็นเกียรติในงานอุปสมบท",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${notoSansThai.variable} ${notoSerifThai.variable} antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build succeeds with fonts**

Run: `npm run build`
Expected: build succeeds; no font import errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: load Thai fonts and set invitation metadata"
```

---

## Task 4: Invitation content data file

**Files:**
- Create: `data/invitation.ts`
- Test: `data/__tests__/invitation.test.ts`

- [ ] **Step 1: Write the failing test for the data shape**

Create `data/__tests__/invitation.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { invitation } from "@/data/invitation";

describe("invitation data", () => {
  it("has the two ceremony days with their events", () => {
    expect(invitation.schedule).toHaveLength(2);

    const day12 = invitation.schedule[0];
    expect(day12.date).toBe("วันที่ 12");
    expect(day12.events).toEqual([
      { time: "15:00", title: "โกนผม" },
      { time: "17:00–18:30", title: "รับประธานอาหาร" },
      { time: "19:00", title: "ฉลองไตร" },
    ]);

    const day13 = invitation.schedule[1];
    expect(day13.date).toBe("วันที่ 13");
    expect(day13.events).toEqual([
      { time: "10:00", title: "รับประทานอาหาร" },
      { time: "11:00", title: "เริ่มแห่นาค" },
      { time: "12:30", title: "เริ่มพิธีบวช" },
    ]);
  });

  it("exposes the photo and core copy fields", () => {
    expect(invitation.photo).toBe("/nak.jpg");
    expect(invitation.nakName.length).toBeGreaterThan(0);
    expect(invitation.invitationText.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run data/__tests__/invitation.test.ts`
Expected: FAIL — cannot resolve `@/data/invitation`.

- [ ] **Step 3: Create the data file**

Create `data/invitation.ts`:

```ts
export type ScheduleEvent = {
  time: string;
  title: string;
};

export type ScheduleDay = {
  date: string;
  events: ScheduleEvent[];
};

export type Invitation = {
  nakName: string;
  parents: string;
  templeOrVenue: string;
  invitationText: string;
  photo: string;
  schedule: ScheduleDay[];
};

// Placeholder copy — edit these fields with the real details before sharing.
export const invitation: Invitation = {
  nakName: "นาค [ชื่อ-นามสกุล]",
  parents: "บุตรของ คุณพ่อ [ชื่อ] · คุณแม่ [ชื่อ]",
  templeOrVenue: "ณ [ชื่อวัด/สถานที่]",
  invitationText:
    "ด้วยความตั้งใจที่จะอุปสมบททดแทนพระคุณบิดามารดา จึงขอเรียนเชิญท่านผู้มีเกียรติ ร่วมเป็นสักขีพยานและอนุโมทนาบุญในงานอุปสมบทครั้งนี้",
  photo: "/nak.jpg",
  schedule: [
    {
      date: "วันที่ 12",
      events: [
        { time: "15:00", title: "โกนผม" },
        { time: "17:00–18:30", title: "รับประธานอาหาร" },
        { time: "19:00", title: "ฉลองไตร" },
      ],
    },
    {
      date: "วันที่ 13",
      events: [
        { time: "10:00", title: "รับประทานอาหาร" },
        { time: "11:00", title: "เริ่มแห่นาค" },
        { time: "12:30", title: "เริ่มพิธีบวช" },
      ],
    },
  ],
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run data/__tests__/invitation.test.ts`
Expected: PASS — 2 passing tests.

- [ ] **Step 5: Commit**

```bash
git add data/invitation.ts data/__tests__/invitation.test.ts
git commit -m "feat: add typed invitation content and schedule data"
```

---

## Task 5: Schedule component

**Files:**
- Create: `components/Schedule.tsx`
- Test: `components/__tests__/Schedule.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/__tests__/Schedule.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Schedule from "@/components/Schedule";
import type { ScheduleDay } from "@/data/invitation";

const days: ScheduleDay[] = [
  {
    date: "วันที่ 12",
    events: [
      { time: "15:00", title: "โกนผม" },
      { time: "19:00", title: "ฉลองไตร" },
    ],
  },
  {
    date: "วันที่ 13",
    events: [{ time: "11:00", title: "เริ่มแห่นาค" }],
  },
];

describe("Schedule", () => {
  it("renders every day heading", () => {
    render(<Schedule days={days} />);
    expect(screen.getByText("วันที่ 12")).toBeInTheDocument();
    expect(screen.getByText("วันที่ 13")).toBeInTheDocument();
  });

  it("renders every event time and title", () => {
    render(<Schedule days={days} />);
    expect(screen.getByText("15:00")).toBeInTheDocument();
    expect(screen.getByText("โกนผม")).toBeInTheDocument();
    expect(screen.getByText("19:00")).toBeInTheDocument();
    expect(screen.getByText("ฉลองไตร")).toBeInTheDocument();
    expect(screen.getByText("11:00")).toBeInTheDocument();
    expect(screen.getByText("เริ่มแห่นาค")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/__tests__/Schedule.test.tsx`
Expected: FAIL — cannot resolve `@/components/Schedule`.

- [ ] **Step 3: Implement the Schedule component**

Create `components/Schedule.tsx`:

```tsx
import type { ScheduleDay } from "@/data/invitation";

export default function Schedule({ days }: { days: ScheduleDay[] }) {
  return (
    <div className="flex flex-col gap-10">
      {days.map((day) => (
        <section key={day.date} className="flex flex-col gap-4">
          <h3 className="text-center font-serif text-lg text-ink">{day.date}</h3>
          <ul className="mx-auto flex w-full max-w-xs flex-col gap-3">
            {day.events.map((event) => (
              <li
                key={`${event.time}-${event.title}`}
                className="flex items-baseline gap-3 border-b border-line pb-2"
              >
                <span className="w-24 shrink-0 font-sans text-sm tracking-wide text-gold-deep">
                  {event.time}
                </span>
                <span className="font-sans text-sm text-ink">{event.title}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/__tests__/Schedule.test.tsx`
Expected: PASS — 2 passing tests.

- [ ] **Step 5: Commit**

```bash
git add components/Schedule.tsx components/__tests__/Schedule.test.tsx
git commit -m "feat: add two-day schedule timeline component"
```

---

## Task 6: Letter component

**Files:**
- Create: `components/Letter.tsx`
- Test: `components/__tests__/Letter.test.tsx`

- [ ] **Step 1: Write the failing test (mocking next/image)**

Create `components/__tests__/Letter.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// next/image needs a plain stub in jsdom.
vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img src={props.src} alt={props.alt} />
  ),
}));

import Letter from "@/components/Letter";
import { invitation } from "@/data/invitation";

describe("Letter", () => {
  it("renders the invitation text and the ordinand name", () => {
    render(<Letter invitation={invitation} />);
    expect(screen.getByText(invitation.nakName)).toBeInTheDocument();
    expect(
      screen.getByText(invitation.invitationText)
    ).toBeInTheDocument();
  });

  it("renders the photo with descriptive alt text", () => {
    render(<Letter invitation={invitation} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", invitation.photo);
    expect(img.getAttribute("alt")?.length).toBeGreaterThan(0);
  });

  it("renders all schedule events from the data", () => {
    render(<Letter invitation={invitation} />);
    expect(screen.getByText("โกนผม")).toBeInTheDocument();
    expect(screen.getByText("เริ่มพิธีบวช")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/__tests__/Letter.test.tsx`
Expected: FAIL — cannot resolve `@/components/Letter`.

- [ ] **Step 3: Implement the Letter component**

Create `components/Letter.tsx`:

```tsx
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/__tests__/Letter.test.tsx`
Expected: PASS — 3 passing tests.

- [ ] **Step 5: Commit**

```bash
git add components/Letter.tsx components/__tests__/Letter.test.tsx
git commit -m "feat: add letter content component"
```

---

## Task 7: Envelope component (open interaction)

**Files:**
- Create: `components/Envelope.tsx`
- Test: `components/__tests__/Envelope.test.tsx`

The Envelope owns the `closed → opening → open` state. On open it animates the flap and slides the letter out using `motion`. We test behavior (content reveals on activation), not animation frames.

- [ ] **Step 1: Write the failing behavioral test**

Create `components/__tests__/Envelope.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img src={props.src} alt={props.alt} />
  ),
}));

import Envelope from "@/components/Envelope";
import { invitation } from "@/data/invitation";

describe("Envelope", () => {
  it("shows the open prompt and hides letter content before opening", () => {
    render(<Envelope invitation={invitation} />);
    expect(screen.getByText("แตะเพื่อเปิด")).toBeInTheDocument();
    expect(screen.queryByText(invitation.invitationText)).not.toBeInTheDocument();
  });

  it("reveals the letter content after the envelope is activated", async () => {
    const user = userEvent.setup();
    render(<Envelope invitation={invitation} />);

    await user.click(screen.getByRole("button", { name: /เปิดการ์ดเชิญ/ }));

    expect(await screen.findByText(invitation.invitationText)).toBeInTheDocument();
    expect(screen.getByText("เริ่มพิธีบวช")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/__tests__/Envelope.test.tsx`
Expected: FAIL — cannot resolve `@/components/Envelope`.

- [ ] **Step 3: Implement the Envelope component**

Create `components/Envelope.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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
          transition={{ duration: 0.6, ease: "easeOut" }}
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
```

Note: The DOM keeps a simple two-state model (`closed`/`open`) for testability and reduced-motion safety; the visual "flap opening + slide" is expressed through the `motion` transition on the letter and the idle hover on the closed card. If you want a richer flap-rotation animation, layer it in during the manual visual pass (Task 9) without changing the tested behavior (prompt visible when closed, letter content present when open).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/__tests__/Envelope.test.tsx`
Expected: PASS — 2 passing tests.

- [ ] **Step 5: Commit**

```bash
git add components/Envelope.tsx components/__tests__/Envelope.test.tsx
git commit -m "feat: add envelope open interaction with reduced-motion support"
```

---

## Task 8: Wire up the page and add the photo

**Files:**
- Modify: `app/page.tsx`
- Add: `public/nak.jpg`

- [ ] **Step 1: Replace page.tsx**

Overwrite `app/page.tsx`:

```tsx
import Envelope from "@/components/Envelope";
import { invitation } from "@/data/invitation";

export default function Home() {
  return <Envelope invitation={invitation} />;
}
```

- [ ] **Step 2: Add a placeholder photo**

Place a portrait image at `public/nak.jpg` (the real ordinand photo will replace it later). If no image is available yet, copy any existing portrait or generate a solid placeholder so `next/image` has a file to serve:

```bash
# Example placeholder if no photo is ready (1 x 1 transparent-ish file is fine for layout):
# Replace public/nak.jpg with the real photo before sharing the link.
ls public/nak.jpg || echo "ADD public/nak.jpg before running the app"
```

Expected: `public/nak.jpg` exists.

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: PASS — all tests across data + components green.

- [ ] **Step 4: Build to confirm no type/lint errors**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx public/nak.jpg
git commit -m "feat: render invitation envelope on home page"
```

---

## Task 9: Manual visual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: server starts at http://localhost:3000.

- [ ] **Step 2: Verify on a mobile viewport**

Open http://localhost:3000 in the browser, switch to a mobile width (~390px). Confirm:
- Closed envelope is centered with a gentle idle motion and "แตะเพื่อเปิด" prompt.
- Tapping/clicking opens the letter; content slides in.
- Letter shows: heading → photo → name/parents/venue → invitation text → both schedule days with all events.
- Colors match the off-white + gold theme; Thai text renders in the loaded fonts (no fallback boxes).

- [ ] **Step 3: Verify reduced-motion**

In the browser/OS, enable "reduce motion" and reload. Confirm the idle bounce is gone and the letter appears without the slide-in (instant/opacity only).

- [ ] **Step 4: Fix any visual issues found**

If the open interaction feels too plain, enhance the `motion` animation in `components/Envelope.tsx` (e.g., add a flap rotation element) — keep the closed-prompt / open-content behavior intact so Task 7 tests still pass. Re-run `npm test` after any change.

- [ ] **Step 5: Final commit (if changes were made)**

```bash
git add -A
git commit -m "polish: refine envelope open animation"
```

---

## Self-Review Notes

- **Spec coverage:** opening message → Letter (Task 6); schedule → Schedule (Task 5) + data (Task 4); photo → Letter `next/image` (Task 6); envelope-open core interaction → Envelope (Task 7); minimal-modern theme → Tasks 2–3; reduced-motion + keyboard/tap a11y → Task 7 (`useReducedMotion`, `<button>` with `aria-label`, focus ring); OG/metadata → Task 3; mobile-first verification → Task 9; out-of-scope items (map/RSVP/calendar/music) intentionally absent.
- **Placeholders:** copy fields in `data/invitation.ts` are intentional, documented placeholders for the user to edit; not plan-level TODOs. `public/nak.jpg` is flagged for replacement with the real photo.
- **Type consistency:** `Invitation`, `ScheduleDay`, `ScheduleEvent` defined in Task 4 and consumed unchanged in Tasks 5–8; `Schedule` takes `days`, `Letter`/`Envelope` take `invitation`; same prop names used in tests and implementations.
