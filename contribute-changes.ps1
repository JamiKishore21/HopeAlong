# contribute-changes.ps1
# PowerShell script to prepare your changes for contribution

param(
    [Parameter(Mandatory=$true)]
    [string]$BranchName,
    
    [Parameter(Mandatory=$true)]
    [string]$CommitMessage
)

Write-Host "🚀 Preparing contribution: $BranchName" -ForegroundColor Cyan

# Create and switch to feature branch
Write-Host "🌿 Creating feature branch: $BranchName" -ForegroundColor Yellow
git checkout -b $BranchName

# Add all changes
Write-Host "📁 Adding changes..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $CommitMessage

# Push to your fork
Write-Host "📤 Pushing to your fork..." -ForegroundColor Yellow
git push -u origin $BranchName

Write-Host "✅ Ready for Pull Request!" -ForegroundColor Green
Write-Host "🔗 Go to: https://github.com/KhadirShaikL21/HopeAlongL21/compare/$BranchName...JamiKishore21:HopeAlong:main" -ForegroundColor Cyan
