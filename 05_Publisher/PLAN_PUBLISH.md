# Deployment Plan - AI Sandbox Frontend

This document outlines the strategy for publishing the prototype to `aisandbox.1ai.my.id`.

## Target Architecture

- **Domain**: `aisandbox.1ai.my.id`
- **Root Domain**: `1ai.my.id` (managed in Cloudflare)
- **Hosting**: Cloudflare Pages
- **Source**: `ssh://git@gitlab.playcourt.id:31022/ai-platform/ai-sandbox.git`
- **Framework**: Next.js 15.2.0

## Deployment Strategy: GitLab + Cloudflare Pages

We will clone the repository locally and use the Wrangler CLI to deploy to Cloudflare Pages. This ensures we use the secure company source while maintaining control over the deployment process.

### Steps to Deploy

1. **Clone Repository**
   ```bash
   git clone ssh://git@gitlab.playcourt.id:31022/ai-platform/ai-sandbox.git
   cd ai-sandbox
   ```

2. **Build and Deploy**
   - Run `npm install` and `npm run build`.
   - Use `wrangler pages deploy` to upload the build to Cloudflare.

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
