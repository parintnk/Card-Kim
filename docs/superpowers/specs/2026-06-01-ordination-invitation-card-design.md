# Ordination Invitation Card — Design Spec

**Date:** 2026-06-01
**Status:** Approved (design), pending implementation plan

## Purpose

A single-page web invitation for a Buddhist ordination ceremony (งานบวช), sent to
guests (primarily via LINE / mobile). The experience should feel like opening a
letter: visitors see a closed envelope, tap to open it, and the letter slides out
revealing the invitation message, the ordinand's (นาค) photo, and the two-day
schedule.

## Scope

In scope:
- Opening invitation message (Thai, placeholder copy to start)
- Two-day schedule (วันที่ 12 / วันที่ 13)
- Ordinand photo
- Envelope-open animation as the core interaction

Out of scope (YAGNI — explicitly excluded for now):
- Map / venue directions
- RSVP / attendance form
- Add-to-calendar
- Background music
- Per-guest personalization

## Stack

- Next.js 16.2.6 (App Router) — **note: this Next.js version has breaking changes;
  consult `node_modules/next/dist/docs/` before writing code**
- React 19, TypeScript
- Tailwind CSS v4
- `motion` (animation library) — verify current API for Next 16 / React 19 via
  context7 before implementing
- Deploy target: Vercel

## Visual Direction

Style "B — Minimal Modern":
- Background: warm off-white `#faf9f6`
- Accent: muted gold `#c2b280` (deeper gold `#b8932f` for fine detail)
- Text: near-black `#1a1a1a`, grey for secondary text
- Fonts: Thai-readable, light weights — Noto Sans Thai (body), Noto Serif Thai or a
  light display face (headings), loaded via `next/font`
- Hairline dividers, generous whitespace
- Minimal Buddhist motif (thin circle with a lotus/dharma mark), used sparingly
- Mobile-first; centered with a max-width on desktop

## Architecture & File Layout

- `data/invitation.ts` — single source of all text content + schedule, typed.
  All copy is placeholder and edited here, not in components.
- `app/page.tsx` — server component; imports invitation data, renders the client
  invitation experience.
- `app/layout.tsx` — fonts, global styles, page metadata + Open Graph tags so the
  link preview looks good when shared on LINE / social.
- `app/globals.css` — Tailwind import + theme tokens (colors, fonts).
- `components/Envelope.tsx` — **client component**. Owns the open/close state and
  orchestrates the opening animation. Renders the closed envelope and, on open, the
  Letter.
- `components/Letter.tsx` — the letter content: invitation message → photo →
  schedule. Receives data via props.
- `components/Schedule.tsx` — renders the two-day timeline (time + title rows
  grouped by date).
- `public/nak.jpg` — ordinand photo (served via `next/image`).

### Content model (`data/invitation.ts`)

```ts
export const invitation = {
  nakName: string,          // placeholder
  parents: string,          // placeholder
  templeOrVenue: string,    // placeholder
  invitationText: string,   // placeholder opening message
  photo: string,            // "/nak.jpg"
  schedule: Array<{
    date: string,           // e.g. "วันที่ 12"
    events: Array<{ time: string, title: string }>
  }>
}
```

Initial schedule data (from the provided note):
- **วันที่ 12**: 15:00 โกนผม · 17:00–18:30 รับประธานอาหาร · 19:00 ฉลองไตร
- **วันที่ 13**: 10:00 รับประทานอาหาร · 11:00 เริ่มแห่นาค · 12:30 เริ่มพิธีบวช

## Interaction / Animation Flow

State machine: `closed → opening → open` (managed in `Envelope.tsx`).

1. **closed** — Closed envelope centered on screen, with a "แตะเพื่อเปิด" hint and a
   gentle idle motion to invite interaction.
2. **opening** — On tap (or Enter key): envelope flap rotates open (rotateX), the
   letter slides up and out (translateY + slight scale), envelope fades/recedes.
   Driven by `motion` variants / sequence.
3. **open** — Letter is fully presented; content (invitation text, photo, schedule)
   is scrollable. Once open it stays open (no reopen needed).

## Accessibility & Robustness

- Respect `prefers-reduced-motion`: skip the animation and present the letter
  immediately (or with a minimal fade).
- Envelope is operable by tap and keyboard (focusable, opens on Enter/Space) with an
  appropriate aria-label.
- Photo uses `next/image` with alt text.
- Static content site — no runtime data fetching or error states beyond image load.

## Testing

Proportional to scope (a static visual page):
- Primary: manual visual verification by running the app (envelope opens, content
  renders, looks right on mobile width).
- Optional lightweight check: a render test confirming the Letter renders all
  schedule entries from the data file.

## Open Items / Notes

- Final copy (nakName, parents, temple/venue, invitation message) is placeholder;
  user will edit `data/invitation.ts` later.
- Exact `motion` import paths/API to be confirmed via context7 at implementation
  time.
- Heading font choice (serif vs light display) to be finalized during build by
  visual check.
