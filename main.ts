// main.ts — entrypoint for post-tiktok-day-one-day-seven-20261123-0327
//
// The entry is a TikTok video about the same tiny agent-built game,
// PIXEL HOP, on the day it was made and after a week of daily updates.
// This program does the one job the competition asks of it: it copies
// VIDEO.json from the repository root into the make.fun output dir,
// after checking the file is there and its url has the shape of a
// TikTok video address. The house reads the video itself from TikTok;
// nothing this program writes about the video is scored.
//
// Run it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)));
const VIDEO_JSON_NAME = "VIDEO.json";

// A TikTok video address: https://www.tiktok.com/@<handle>/video/<digits>
const TIKTOK_VIDEO_URL = /^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/]+\/video\/\d+$/;

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "out";
}

function readVideoEntry(): { url: string } {
  const path = join(REPO_ROOT, VIDEO_JSON_NAME);
  if (!existsSync(path)) {
    throw new Error(`missing ${VIDEO_JSON_NAME} in the repository root`);
  }
  const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as { url?: unknown }).url !== "string"
  ) {
    throw new Error(`${VIDEO_JSON_NAME} must be an object with a url string`);
  }
  return parsed as { url: string };
}

function isTikTokVideoUrl(url: string): boolean {
  return TIKTOK_VIDEO_URL.test(url);
}

function checkUrlShape(url: string): void {
  if (!isTikTokVideoUrl(url)) {
    throw new Error(
      `VIDEO.json url is not a TikTok video address: ${url}`,
    );
  }
}

function main(): void {
  const entry = readVideoEntry();
  checkUrlShape(entry.url);
  const out = outputDir();
  mkdirSync(out, { recursive: true });
  copyFileSync(
    join(REPO_ROOT, VIDEO_JSON_NAME),
    join(out, VIDEO_JSON_NAME),
  );
  console.log(`copied ${VIDEO_JSON_NAME} to ${out}/`);
  console.log(`video: ${entry.url}`);
}

main();
