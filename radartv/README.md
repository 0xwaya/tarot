# RadarTV Prototype

Presentation-ready Next.js prototype that unifies the Deibis Romero personal brand with the El Radar TV media identity.

## What is included

- A shared landing page that explains the unified brand strategy
- A premium Deibis Romero experience focused on biography, services, booking, and EPK flow
- An El Radar TV experience focused on live access, programming structure, and clip surfaces
- A persistent global player wired to the currently exposed public live audio stream
- SEO baseline with metadata, structured data, robots, and sitemap

## Tech

- Next.js App Router
- TypeScript
- Local content seed files for fast iteration

## Run locally

```bash
npm install
npm run dev
```

## WhatsApp quick setup

Set the public WhatsApp number in Chilean format to enable direct chat in the widget:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=569XXXXXXXX
```

## Production validation

```bash
npm run build
```

## Notes

- The live audio player uses the current public MP3 stream exposed by the existing Deibis site.
- The current sound gallery pages do not expose direct clip files, so the clip grid links back to the legacy gallery and YouTube surfaces until exportable assets are available.
- This is intentionally a one-day presentation build, not the full CMS and dual-domain production architecture.
