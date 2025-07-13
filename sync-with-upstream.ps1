# sync-with-upstream.ps1
# PowerShell script to sync your fork with the upstream repository

Write-Host "🔄 Syncing with upstream repository..." -ForegroundColor Cyan

# Fetch latest changes from upstream
Write-Host "📥 Fetching latest changes from upstream..." -ForegroundColor Yellow
git fetch upstream

# Switch to main branch
Write-Host "🔀 Switching to main branch..." -ForegroundColor Yellow
git checkout main

# Merge upstream changes
Write-Host "🔗 Merging upstream changes..." -ForegroundColor Yellow
git merge upstream/main

# Push updated main to your fork
Write-Host "📤 Pushing updated main to your fork..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ Sync complete! Your fork is now up to date with the main repository." -ForegroundColor Green
