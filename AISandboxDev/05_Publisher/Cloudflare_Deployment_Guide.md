# Cloudflare Pages Deployment Guide (via GitHub)

This guide provides step-by-step instructions on how to securely and reliably deploy the AI Sandbox prototype (`v0.2` branch) to Cloudflare Pages directly from your GitHub repository.

> [!TIP]
> Deploying directly from GitHub solves the `@cloudflare/next-on-pages` Windows build error by letting Cloudflare's Linux servers handle the build process for you.

## Step 1: Clean Up Previous Attempts

If you see an existing project named `ai-sandbox-prototype` inside Cloudflare that says "No Git connection" or is failing, you should delete it to start fresh and avoid naming conflicts.

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and log in.
2. On the left sidebar, click **Workers & Pages**.
3. Click on the broken `ai-sandbox-prototype` project.
4. Go to **Settings** > **General**.
5. Scroll to the very bottom and click **Delete project**.

## Step 2: Connect to GitHub

1. Return to the **Workers & Pages** menu.
2. Click the blue **Create application** button, and then switch to the **Pages** tab.
3. Click the **Connect to Git** button.
4. Select your **GitHub** account (you may need to authorize Cloudflare to access your GitHub if you haven't already).
5. Select the repository: `FaldyMaul/SecurityAI`.
6. Click **Begin setup**.

## Step 3: Configure Build Settings

This is the most critical step to ensure Next.js compiles correctly on Cloudflare. Set the following details exactly as written:

* **Project name:** `ai-sandbox-prototype` (or whatever naming you prefer).
* **Production branch:** **`v0.2`** *(Make sure you specifically select v0.2 from the dropdown so it uses our latest verified code!)*
* **Framework preset:** Select `Next.js` from the dropdown.
* **Build command:** `npm run build`
* **Build output directory:** `.vercel/output/static`

## Step 4: Add Environment Variables

Scroll down slightly to the **Environment variables (advanced)** section. Click **Add variable** to add these exactly:

| Variable name | Value |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `https://aisandbox.1ai.my.id/api` |
| `NEXT_PUBLIC_MSW_ENABLED` | `true` |

*(Ensure there are no trailing spaces at the ends of the values).*

## Step 5: Save and Deploy

1. Click the **Save and Deploy** button.
2. Cloudflare will automatically start pulling the code from your `v0.2` branch and running `npm run build`.
3. Wait about 2–4 minutes for the green "Success" checkmark. You'll be provided with a `*.pages.dev` link. Click it to verify the frontend works.

## Step 6: Connect Custom Domain (aisandbox.1ai.my.id)

Once the application is successfully deployed and running on the `pages.dev` link:

1. Click on **Continue to project**.
2. Go to the **Custom Domains** tab.
3. Click **Set up a custom domain**.
4. Enter your domain: `aisandbox.1ai.my.id`.
5. Since `1ai.my.id` is managed by your current Cloudflare account, Cloudflare will automatically add the correct CNAME DNS record for you.
6. Click **Activate domain**.

> [!NOTE]
> It may take a couple of minutes for Cloudflare to issue the free SSL certificates for your new subdomain, so if it shows an SSL warning at first, give it 5 minutes and refresh.

---
**Done!** Every time you commit and push to the `v0.2` branch on GitHub in the future, Cloudflare will automatically detect the changes and redeploy your app instantly without you needing to press a single button.
