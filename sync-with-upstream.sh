#!/bin/bash
# sync-with-upstream.sh
# Script to sync your fork with the upstream repository

echo "🔄 Syncing with upstream repository..."

# Fetch latest changes from upstream
echo "📥 Fetching latest changes from upstream..."
git fetch upstream

# Switch to main branch
echo "🔀 Switching to main branch..."
git checkout main

# Merge upstream changes
echo "🔗 Merging upstream changes..."
git merge upstream/main

# Push updated main to your fork
echo "📤 Pushing updated main to your fork..."
git push origin main

echo "✅ Sync complete! Your fork is now up to date with the main repository."
