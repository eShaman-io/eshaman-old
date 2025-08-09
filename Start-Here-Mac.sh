#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-eShaman}"
OWNER="${2:-gabrielj12}"
VISIBILITY="${3:-private}"
FIREBASE_PROJECT_ID="${4:-eshaman-prod}"

echo "== eShaman Bootstrap (macOS/Linux) =="

need() { command -v "$1" >/dev/null 2>&1 || return 1; }

if [[ "$OSTYPE" == "darwin"* ]]; then
  if ! need brew; then
    echo "Homebrew is required: https://brew.sh" && exit 1
  fi
  brew install git gh stripe
  if ! need node; then brew install node@20 && brew link --overwrite node@20; fi
  corepack enable || true
  corepack prepare pnpm@9 --activate || true
else
  echo "Install prerequisites manually on Linux: git, node (>=20), gh, stripe CLI, firebase-tools"
fi

if ! need firebase; then npm i -g firebase-tools; fi

echo "== GitHub auth =="
gh auth status >/dev/null 2>&1 || gh auth login

echo "== Stripe auth =="
stripe login

echo "== Firebase auth =="
firebase login

echo "== Create repo & push =="
./scripts/create_github_repo.sh "$REPO_NAME" "$VISIBILITY" "eShaman — spiritual AI app monorepo" "$OWNER"

REPO="$(git remote get-url origin | sed -E 's#.*github.com[:/](.+/.+?)(\.git)?$#\1#')"

for k in OPENAI_API_KEY STRIPE_SECRET_KEY NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY STRIPE_WEBHOOK_SECRET FIREBASE_PROJECT_ID FIREBASE_SERVICE_ACCOUNT_JSON; do
  if ! gh secret list -R "$REPO" | grep -q "^$k"; then
    read -p "Enter value for $k (blank to skip): " v || true
    if [ -n "$v" ]; then printf "%s" "$v" | gh secret set "$k" -R "$REPO" -b-; fi
  fi
done

echo "== Firebase setup =="
./scripts/setup_firebase.sh "$FIREBASE_PROJECT_ID"

echo "== Stripe products & prices =="
./scripts/setup_stripe.sh "eShaman Basic" "eShaman Pro" 990 1990

echo "All done. Push a test commit to trigger CI/CD."
