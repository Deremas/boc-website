# Blue Ocean Creatives

Corporate website for Blue Ocean Creatives (Blue Pixel Trading PLC).

The content and design source of truth is `docs/BOC_Website_Plan_2026.md`. Do not invent statistics, clients, testimonials, or company facts.

## Stack

- Astro, TypeScript, Tailwind CSS
- React only for the mobile menu, work filter, testimonial carousel, ERP module tabs, and contact form
- Lexend, self-hosted in `public/fonts`

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Local site: http://localhost:4321

## Environment

Copy `.env.example` to `.env`. Production secrets belong in Cloudflare, not in git.

Contact enquiries post to `/api/contact`, then to email (Resend) and Telegram. Cloudflare Turnstile runs when the keys are set.

## Still to drop in

- ERP dashboard screenshot with demo data
- Chekela app screenshots
- Logos still shown as names: Konel, Nova Water, Wow Energy, Fikreselam, Liesak, Evolve
- A portrait of Nathnael Zerihun
- Original post URLs for the creative showcase
