# Helper to add, commit, and push screenshots
# Usage: .\commit_screenshots.ps1 "Add real screenshots"
param([string]$message = "Add submission screenshots")

git add screenshots/*
git commit -m $message
git push origin main

Write-Host "Committed and pushed screenshots with message: $message"