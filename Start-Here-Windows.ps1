# One-click bootstrap for eShaman (Windows)
param(
  [string]$RepoName = "eShaman",
  [string]$Owner = "gabrielj12",
  [string]$Visibility = "private",
  [string]$FirebaseProjectId = "eshaman-prod"
)

Write-Host "== eShaman Bootstrap ==" -ForegroundColor Cyan
Write-Host "Repo: $Owner/$RepoName (private)"

function Need($cmd, $installMsg, $wingetId) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    Write-Host "$installMsg" -ForegroundColor Yellow
    if ($wingetId -ne "") {
      try {
        winget install --id $wingetId -e --source winget
      } catch {
        Write-Host "Failed to install $cmd via winget. Install manually, then re-run." -ForegroundColor Red
        exit 1
      }
    } else {
      exit 1
    }
  }
}

# Relax policy for this session
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force | Out-Null

# Ensure winget exists
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  Write-Host "winget is required (Windows 10/11 App Installer). Install from Microsoft Store and re-run." -ForegroundColor Red
  exit 1
}

# Prereqs
Need "git" "Installing Git..." "Git.Git"
Need "node" "Installing Node.js LTS..." "OpenJS.NodeJS.LTS"
Need "gh" "Installing GitHub CLI..." "GitHub.cli"
Need "stripe" "Installing Stripe CLI..." "Stripe.StripeCLI"

# pnpm via corepack
try {
  corepack enable
  corepack prepare pnpm@9 --activate
} catch {
  Write-Host "Failed to enable pnpm via corepack; install manually if needed." -ForegroundColor Yellow
}

# Firebase CLI via npm
if (-not (Get-Command firebase -ErrorAction SilentlyContinue)) {
  npm i -g firebase-tools
}

# Login flows (interactive)
Write-Host "`n== GitHub auth ==" -ForegroundColor Cyan
try { gh auth status } catch { gh auth login }

Write-Host "`n== Stripe auth ==" -ForegroundColor Cyan
stripe login

Write-Host "`n== Firebase auth ==" -ForegroundColor Cyan
firebase login

# Create/push repo
Write-Host "`n== Creating GitHub repo and pushing code ==" -ForegroundColor Cyan
& "scripts/create_github_repo.ps1" -RepoName $RepoName -Visibility $Visibility -Owner $Owner

# Secrets prompt (if missed earlier)
$secrets = @(
  "OPENAI_API_KEY",
  "STRIPE_SECRET_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_SERVICE_ACCOUNT_JSON"
)

$remote = git remote get-url origin
if ($remote -match "github.com[:/](.+)/(.+?)(\.git)?$") {
  $repo = "$($Matches[1])/$($Matches[2])"
  foreach ($k in $secrets) {
    $current = gh secret list -R $repo | Select-String "^\s*$k\s"
    if (-not $current) {
      $val = Read-Host "Enter value for $k (leave blank to skip)"
      if ($val) { echo $val | gh secret set $k -R $repo -b- }
    }
  }
}

# Firebase project setup/deploy
Write-Host "`n== Firebase setup ==" -ForegroundColor Cyan
$pidInput = Read-Host "Firebase Project ID (default: $FirebaseProjectId)"
if ($pidInput) { $FirebaseProjectId = $pidInput }
& "scripts/setup_firebase.ps1" -ProjectId $FirebaseProjectId

# Stripe products/prices
Write-Host "`n== Stripe products & prices ==" -ForegroundColor Cyan
& "scripts/setup_stripe.ps1" -ProductBasic "eShaman Basic" -ProductPro "eShaman Pro" -BasicPriceMonthlyCents 990 -ProPriceMonthlyCents 1990

Write-Host "`nAll done. Push a test commit to trigger CI/CD." -ForegroundColor Green
