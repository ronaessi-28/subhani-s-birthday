# For Suhani, with love

A complete eleven-chapter birthday website for Suhani Jain’s 24th birthday, October 14, 2026.

## Run locally

Requires Node.js 22+ and npm.

```sh
npm install
npm run dev
npm run build
```

`npm run test` runs the automated rule and routing checks. Built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and TanStack Start / TanStack Router (the project’s integrated router, rather than React Router). No account, paid API, or database is required.

## Add your nineteen photos

No personal photos were attached to the request. Until supplied, the galleries show honest empty photo frames, not stock replacements. Add the original photos to `public/images/`, preserving their order:

- Photos 1–7: `suhani-1.jpg` through `suhani-7.jpg`.
- Photos 8–18: `couple-ghibli-1.jpg` through `couple-ghibli-11.jpg`.
- Photo 19: `us-birthday-cake.jpg`.

Photos are displayed without altering faces. The “Ghibli-inspired” gallery uses the images you supply; no transformation is applied. The puzzle uses its own generated cake illustration, never a personal photo.

For media uploaded through Lovable, use `lovable-assets create --file /tmp/photo.jpg --filename suhani-1.jpg > src/assets/suhani-1.jpg.asset.json`, then use the pointer’s `.url` as the image source. Repeat in original order. Local `public/images/` paths remain the default for a standalone checkout.

## Optional music

Add your own licensed song to `public/audio/our-song.mp3`. The music button starts playback only after being pressed. If the file is missing, the button quietly indicates that the song has not been added. Music does not autoplay; it pauses when changing chapters.

## Chapters

`/` → `/secret-pin` → `/magical-gift` → `/birthday` → `/her-gallery` → `/every-mood` → `/my-letter` → `/our-gallery` → `/seven-reasons` → `/birthday-puzzle` → `/final-surprise`.

The secret PIN is **143** (a playful surprise, not security). The countdown targets midnight October 14, 2027, in India (UTC+05:30). The cake puzzle is shuffled by legal moves and is always solvable. Completing it unlocks the final page for the current browser tab session; direct visits before completion show a locked page. Restarting allows another puzzle without erasing a previously earned unlock.

The letter preserves “Sunday, October 10” exactly as provided, without guessing a year or adding invented memories. You can adjust the personal wording in `src/lib/letter.ts`. Colors, typography, animation, and phone layouts are defined centrally in `src/styles.css`. Every chapter has individual page and social metadata.

Accessibility includes labeled controls, keyboard gallery navigation (arrows and Escape), reduced-motion support, and touch-friendly controls. This is a personal surprise website, not a secure vault: PIN and puzzle checks run in the browser.
