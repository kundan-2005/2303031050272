# Run Postman collection with newman and save responses for screenshotting
# Requires: newman (npm install -g newman)
# Usage: .\run_postman_newman.ps1

$collection = "postman/notification_collection.postman_collection.json"
$outDir = "screenshots/postman_outputs"
if (-Not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

Write-Host "Running Postman collection with newman..."
newman run $collection --env-var "baseUrl=http://localhost:4000" --reporters cli,json --reporter-json-export "$outDir/result.json"

Write-Host "Saved JSON result to $outDir/result.json. Open it or screenshot the terminal output for submission."