# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important:** This project runs Next.js 16 (not 14). APIs, file conventions, and behaviours differ from older versions. Read `node_modules/next/dist/docs/` when in doubt. React version is 19.

## Scope rules
- Ne lis pas node_modules, .next, ou src/lib/mock-admin.ts sauf si explicitement demandé
- Travaille uniquement sur les fichiers mentionnés dans la commande
- Avant toute modification multi-fichiers, liste les fichiers concernés et attends confirmation

---

## Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Type-check + production build (run this to catch errors)
npm run lint      # ESLint
npm run start     # Serve production build
```

There are no tests. `npm run build` is the primary validation step — always run it after making changes.

---

## Architecture

### Route groups

```
src/app/
  page.tsx                  # Landing page (light theme, public)
  layout.tsx                # Root layout — sets fonts, includes nothing else
  (app)/                    # Authenticated app shell
    layout.tsx              # Sidebar + Topbar + BottomNav + LoadingBar + ToastProvider
    dashboard, bibliotheque, communaute, live, profil/…
    ia/                     # Lolo IA section
      page.tsx              # IA mode picker (hub)
      questions/page.tsx    # Chat with Lolo IA (state: level + historyOpen)
      swing/page.tsx        # Swing analysis (mobile + desktop layout)
      strategie/page.tsx    # Strategy hub → Discussion or Reconnaissance
  admin/                    # Coach mode (Laurent only)
    layout.tsx              # AdminSidebar (includes mobile bottom nav)
    page.tsx, activite/, membres/, questions/, videos/
  auth/
    layout.tsx              # Centered card on dark-green gradient
    connexion/              # Login: page.tsx + ConnexionForm.tsx + actions.ts
    inscription/            # Signup: page.tsx + InscriptionForm.tsx + actions.ts
  api/
    ia/route.ts             # POST — Lolo IA chat (Anthropic SDK, mode: discuter|strategie)
    ia/analyse/route.ts     # POST — general IA analysis
    ia/swing-analyse-structured/route.ts  # POST — vision swing analysis → JSON scorecard
```

### App shell layout pattern

The `(app)/layout.tsx` uses a **fixed viewport, no browser scroll** pattern:
```
h-screen overflow-hidden
  Sidebar (desktop, left)
  div md:ml-60 h-full flex flex-col
    Topbar
    main flex-1 min-h-0 overflow-y-auto   ← each page scrolls here
  BottomNav (mobile)
```

All `(app)` pages must use `h-full` (never `h-screen`) and avoid `min-h-screen`. IA pages in particular use `flex flex-col h-full` with `flex-1 min-h-0 overflow-hidden` for their own inner scroll zones.

### Auth

Session is a simple `ls_session` cookie set by the server action in `connexion/actions.ts`. There is no Supabase or JWT yet — this is mock auth. The middleware (if any) checks for this cookie. After a successful login/signup, `sessionStorage.setItem("ls_loading", "1")` is set client-side so `LoadingBar` (in the app layout) shows a 5-second entry animation.

### AI integration

Three API routes call Anthropic (`claude-sonnet-4-6`):
- `/api/ia` — general chat. Accepts `{ messages, mode, playerProfile, extraContext }`. `mode` changes the system prompt.
- `/api/ia/analyse` — general analysis endpoint.
- `/api/ia/swing-analyse-structured` — vision endpoint. Accepts base64 image, returns JSON `{ globalScore, clubType, metrics: { posture, rotation, impact, suivi }, summary }`. Falls back to hardcoded data on parse error.

In-app, the chat modules (`QuestionsModule`, `StrategieModule`) currently use **mock responses** (`IA_RESPONSES_DISCUTER` from `ia/data.ts`) — they do not call the API routes. The API routes exist for when real calls are wired up.

`ANTHROPIC_API_KEY` must be in `.env.local`.

### Data / mock state

All player data is mock. The central mock is `MOCK_PROFILE` (a `PlayerProfile`) in `src/app/(app)/ia/data.ts`. Admin mock data lives in `src/lib/mock-admin.ts`. There is no database connection yet.

---

## Design system

Three distinct visual themes coexist:

**Landing page (dark gold theme)** — `src/app/page.tsx` + `src/components/landing/`:
- Background: `#0F2318` (page), `#1B3A2A` (cards), `#0A1A10` (footer)
- Primary text: `#F5F0E8` — body: `rgba(245,240,232,0.72)` — muted labels: `#7A8A7A`
- Accent/CTA: `#C9A84C` (gold) — CTA button text: `#0F2318`
- Card borders: `1px solid #2A4A35` — highlight borders: `1px solid #C9A84C`
- CSS card classes NOT used here — all inline `style={}` props

**App shell (light theme)** — auth pages and the main `(app)/` shell:
- Background: `#EEF2E8`
- Primary text: `#0D1A09`
- Accent/CTA: `#7BBF25` (lime)
- Gold: `#C9A84C`
- CSS card classes: `.card-white`, `.card-white-sm`, `.card-dark-green`, `.card-lime-tinted`

**Dark green theme** — all IA / Lolo screens (`ia/` subtree):
- Background: `#071009` / `#0a1a0a` / `#0d200d` / `#0f2a0a`
- Borders: `0.5px solid #1e3a1e`
- Primary text: `#e8f0ea` — labels: `#c0dd97` — secondary: `#7ab84a` — muted: `#4a6855`
- CTA buttons: `background: #3a6a1a`, text `#c0dd97`
- LS avatar: `background: #1a3a0a`, `border: 1px solid #3a6a1a`

Tailwind is used for layout/spacing utilities only. All colors are applied via inline `style={}` props — do not introduce Tailwind color classes for new screens.

Fonts: `--font-sans` (Geist) and `--font-serif` (Playfair Display), set on `<html>` via CSS variables. Use `className="font-serif"` for headings.

---

## Key components

- `src/lib/utils.ts` — exports `cn()` (clsx + tailwind-merge)
- `src/components/ui/Toast.tsx` — `ToastProvider` + `useToast()` hook for in-app notifications
- `src/components/LoadingBar.tsx` — 5s animated entry bar, triggered by `sessionStorage("ls_loading")`
- `src/components/landing/AppMockup.tsx` — phone mockup component used on landing page; accepts `screen: "video" | "ia" | "parcours" | "community"`
- `src/app/(app)/ia/components/QuestionsModule.tsx` — the main Lolo IA chat UI. Inline history sidebar (Framer Motion width animation), conversation management, file attachments, quick chips, markdown renderer
- `src/app/(app)/ia/components/SwingDesktopLayout.tsx` — two-panel desktop layout for swing video upload + analysis
