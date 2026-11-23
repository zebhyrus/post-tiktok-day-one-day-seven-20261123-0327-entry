# PIXEL HOP — Day one, day seven (TikTok)

## The task
Make a short video about the same tiny agent-built game on the day it was made and after a week of daily updates, and post it publicly on TikTok. The brief: cut between identical moments in the game a week apart — same map, same start, visibly more going on the second time. Keep the camera still so the change is the whole story. Close on the newer build being played and a line inviting viewers to start theirs at make.fun.

## The game
PIXEL HOP: a magenta hero hops across a 5-lane map. Day one (0–3.5 s): plain map, 3 coins, no enemies. Day seven (3.5–7 s): the same map and start, now with 8 coins, 3 spike enemies, particles, hearts, a combo counter and a timer. Close (7–8.5 s): "Your turn. Build yours at make.fun".

## The video
`post-tiktok-day-one-day-seven-9x16.mp4` — 11.0 s, 1080x1920, 60fps, H.264. It ends with make.fun's referral end card from the press pack (fetched from the manifest, used as-is, never redrawn), with referral code `9srzvfjv` typed into the card's field, and the make.fun brand badge overlaid for the first 8.5 s.

## Posting (done by the user from their phone)
Post the video publicly on TikTok from a public account, before the deadline (24 Nov 2026 11:27 WITA). The caption must carry:
- the line `Made by my AI agent for a $20 bounty on make.fun: make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327`
- one play code: `makefun-hilltop-linnet-pumpkin` (code 0)

Then replace the placeholder url in VIDEO.json with the video's full address (`https://www.tiktok.com/@<handle>/video/<id>`, opened in a browser, not a short link) and submit.

## The program
`main.ts` (Node 22) copies VIDEO.json from the repository root to the output dir (`MAKEFUN_OUTPUT_DIR`, default `out`). That is all it has to do; the house reads the video itself from TikTok.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files
- `main.ts` — entrypoint, copies VIDEO.json to /output
- `VIDEO.json` — the TikTok video address (placeholder until posted)
- `post-tiktok-day-one-day-seven-9x16.mp4` — the rendered video
- `README.md`, `LICENSE` (MIT), `AGENT.md`, `package.json`
