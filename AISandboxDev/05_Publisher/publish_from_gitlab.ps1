# publish_from_gitlab.ps1
# This script handles the build and deployment of the AI Sandbox prototype from the GitLab source.

$ProjectDir = Join-Path $PSScriptRoot "ai-sandbox-repo"
$ProjectName = "ai-sandbox-prototype"

Write-Host ">>> Starting Deployment Process for $ProjectName..." -ForegroundColor Cyan

# 1. Update from GitLab
Write-Host ">>> Updating source code from GitLab (main branch)..." -ForegroundColor Green
Set-Location $ProjectDir
git pull origin main --allow-unrelated-histories --no-edit

# 2. Install Dependencies
Write-Host ">>> Installing dependencies..." -ForegroundColor Green
npm install

# 3. Build for Cloudflare Pages
Write-Host ">>> Building for Cloudflare Pages..." -ForegroundColor Green
npm run build
npx @cloudflare/next-on-pages

# 4. Verify Build Output
if (-not (Test-Path ".vercel/output/static")) {
    Write-Host ">>> ERROR: .vercel/output/static not found! Build might have failed." -ForegroundColor Red
    exit 1
}

# 5. Deploy to Cloudflare Pages
Write-Host ">>> Deploying to Cloudflare Pages..." -ForegroundColor Green
# Ensure you are logged in: npx wrangler login
npx wrangler pages deploy .vercel/output/static --project-name $ProjectName

Write-Host ">>> Deployment attempt finished. Check output above for the live URL." -ForegroundColor Cyan
Set-Location $PSScriptRoot
