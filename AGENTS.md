<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Birthday journey architecture
- Use TanStack file routes for the eleven chapters and React, Vite, TypeScript, Tailwind v4, and Framer Motion; preserve the platform router instead of adding a competing router.
- Keep shared birthday UI in `src/components/birthday` and pure dates, PIN, and puzzle logic in `src/lib/birthday.ts` so rules can be tested independently.
- Treat personal photos as optional local paths with honest empty-state frames; never generate replacement personal photos.
- Store only the non-sensitive puzzle completion flag in browser session storage; this personal website has no accounts or database, and the flag is a playful navigation gate, not a security boundary.
- Shuffle the sliding puzzle through legal moves from its solved state to guarantee solvability.
