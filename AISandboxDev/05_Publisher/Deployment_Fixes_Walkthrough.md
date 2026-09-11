# AI Sandbox Deployment Walkthrough & Documentation

This document serves as a historical record of the deployment process, the specific blockers encountered during the migration from a local Windows build to Cloudflare Pages (via GitHub), and exactly how each issue was resolved. 

It is highly recommended to keep these notes for future reference in case the project is migrated or rebuilt on edge infrastructure.

## 1. Initial Strategy & Pivot

**Initial Objective:** Deploy the prototype using a PowerShell script (`publish_from_gitlab.ps1`) that ran `@cloudflare/next-on-pages` locally on Windows and uploaded the assets directly to Cloudflare via `wrangler`.
**Blocker:** The `@cloudflare/next-on-pages` CLI relies on Vercel's build architecture, which has known incompatibilities and random failures when executed on a native Windows environment. 
**Solution:** We pivoted to using **Cloudflare Pages Native Git Integration**. We pushed the source code directly to a GitHub repository (`FaldyMaul/SecurityAI`) and allowed Cloudflare's linux-based internal CI/CD to run the builds automatically.

## 2. Component & TypeScript Fixes

Before the build could succeed remotely, several lingering TypeScript errors from `@legion-ui-kit/react-core` inside `03_Frontend` needed to be resolved:

* **Skeleton Component:** `LegionSkeleton` was not properly exported from the library. 
  * *Fix:* Created a custom fallback `Skeleton` component using native `<div>` and CSS pulse animations.
* **Input Component:** The library did not export an `Input` component, but rather a `TextField`.
  * *Fix:* Updated `Input.tsx` to wrap the `TextField` component and properly mapped the properties (`variant` -> `status`, `errorText` -> `caption`, etc.).
* **Card Props (SummaryTile):** Invalid properties (`size="md"`, `shadow`, `padding`) were being passed.
  * *Fix:* Switched to the supported `elevation` properties (`elevation-1`, `elevation-2`) matching the Legion UI schema.

## 3. Git Submodule Conflict

**Blocker:** When initializing the GitHub repository, an older temporary folder (`05_Publisher/ai-sandbox-repo`) created from a GitLab clone retained its hidden `.git` folder. GitHub interpreted this as a locked submodule, causing Cloudflare's initial clone step to fatally crash (`fatal: No url found for submodule path`).
**Solution:** Removed the broken nested git cache tracking without deleting the actual files using:
`git rm --cached 05_Publisher/ai-sandbox-repo`

## 4. Build Configuration Fixes

Once the code cloned properly, the Cloudflare build crashed because of pathing and output directory issues.

* **Root Directory Set Up:** The Next.js code did not sit at the repository root; it was nested.
  * *Fix:* Set the **Root directory** in Cloudflare Pages settings to `03_Frontend`.
* **Output Directory Mismatch:** The project's `next.config.ts` was utilizing a `distDir: '.next-cache'` override (initially added to prevent Windows file-lock issues). Cloudflare's `@cloudflare/next-on-pages` exclusively hunts for a `.next` folder.
  * *Fix:* Removed the `distDir` entirely since the build runs safely on Linux in Cloudflare, allowing Next.js to successfully output to standard `.next`.
* **Build Command Adjustments:** Next.js must be explicitly packaged for Edge networks.
  * *Fix:* Changed Cloudflare's build command from `npm run build` to `npx @cloudflare/next-on-pages` to compile worker assets.

## 5. Next.js 15 & Edge Runtime Compatibility

**Blocker:** Cloudflare Pages operates entirely on Edge Runtime (Workers), but Next.js heavily relies on Node.js. If Next.js compiles dynamic pages into Node.js logic, Cloudflare refuses to deploy them. 
We initially placed `export const runtime = 'edge';` in the absolute root `layout.tsx`. However, this triggered a severe framework bug: the dynamic `getLocale()` from `next-intl` forced Next.js to generate its internal hidden `_not-found` fallback page dynamically. Because it was dynamic, Cloudflare demanded it be Edge compatible, but Next.js physically prevents `_not-found` from inheriting Edge instructions.

**The Definitive Solution:**
1. Made the absolute root `layout.tsx` **100% static** by removing the async `getLocale()` fetch logic.
2. Removed `export const runtime = 'edge';` from the root.
3. Moved `export const runtime = 'edge';` down one level into `src/app/[locale]/layout.tsx`. 

*Result:* All real Application views successfully inherited Edge compliance, but the buggy root `_not-found` safely generated as a pure static page, bypassing Cloudflare's restriction algorithm perfectly.

## 6. Node.js Compatibility Flag

**Blocker:** After deployment, the live URL showed a `no nodejs_compat compatibility flag set` error because Next.js utilizes internal Node APIs (like `Buffer`) inside its bundled edge workers.
**Solution:** Added `nodejs_compat` to the project's Compatibility Flags within the Cloudflare settings, and re-triggered the deployment, which solved the issue instantly.

## Summary of Active Services

* **Domain:** `aisandbox.1ai.my.id`
* **Edge Host:** Cloudflare Pages
* **Repo Source:** `github.com/FaldyMaul/SecurityAI` (Branch: `v0.2`)
* **Mock Handling:** MSW is currently enabled via `NEXT_PUBLIC_MSW_ENABLED=true` bypassing back-end dependency. 
