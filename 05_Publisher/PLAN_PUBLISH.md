# Deployment Plan - AI Sandbox Frontend

This document outlines the strategy for publishing the prototype to `aisandbox.1ai.my.id`.

## Target Architecture

- **Domain**: `aisandbox.1ai.my.id`
- **Root Domain**: `1ai.my.id` (managed in Cloudflare)
- **Hosting**: Cloudflare Pages (supports Next.js SSR/ISR natively)
- **Framework**: Next.js 15.2.0

## Deployment Strategy: Cloudflare Pages

We will use the `@cloudflare/next-on-pages` approach for maximum compatibility with Cloudflare's edge runtime.

### Steps to Deploy

1. **Local Build Check**
   ```bash
   cd AISandboxDev/03_Frontend
   npm install
   npm run build
   ```

2. **Cloudflare Integration**
   - Create a new Pages project via the Cloudflare Dashboard or Wrangler CLI.
   - Project Name: `ai-sandbox-prototype`

3. **Subdomain Setup**
   - In Cloudflare DNS, add a CNAME:
     - **Name**: `aisandbox`
     - **Target**: `ai-sandbox-prototype.pages.dev`
     - **Proxy**: Enabled (Orange Cloud)

4. **Environment Variables**
   The following variables must be configured in the Cloudflare Pages environment:
   - `NEXT_PUBLIC_API_URL`: (Endpoint for Moonshot API if applicable)
   - Other production secrets.

### Automation Script (`publish_to_cloudflare.ps1`)

We will create a script in this directory to handle the build and deployment process.

```powershell
# Pseudocode for publish_to_cloudflare.ps1
# 1. CD to 03_Frontend
# 2. npm install (if needed)
# 3. npm run build
# 4. npx wrangler pages deploy .next --project-name ai-sandbox-prototype
```

## Maintenance

Once deployed, updates to the `v0.1` branch can be automatically synced if Cloudflare Pages is connected to GitHub, or manually deployed using the provided script.
