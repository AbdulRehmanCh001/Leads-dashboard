# ICR Dashboard (`dashboard1`)

Next.js App Router dashboard matching the ICR Figma UI, styled with **Tailwind CSS v4** (same approach as `client/`).

## Run

```bash
cd dashboard1
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack (aligned with `client/`)

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 via `@tailwindcss/postcss`
- `clsx` + `tailwind-merge` (`cn` in `src/lib/utils.ts`)
- Design tokens in `src/app/globals.css` (`@theme inline`)

## Structure

```
dashboard1/
  postcss.config.mjs
  src/
    app/globals.css      # @import "tailwindcss" + ICR tokens
    lib/utils.ts         # cn()
    components/dashboard # Sidebar, TopBar, Summary, Portfolio, Workload, Register
    components/icons
  public/assets          # logo + sidebar icons
  reference/             # original Locofy HTML/CSS extract
```
# Leads-dashboard
