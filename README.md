# eShaman — Monorepo Starter

A production-ready starter for the **eShaman** spiritual AI app and brand.

## What’s inside
- **apps/oracle-chat** – Next.js 14 app (TypeScript) for the Oracle chat + rituals
- **apps/landing** – Placeholder for Framer site handoff
- **infra/firebase** – Firebase config + Cloud Functions skeleton
- **infra/stripe** – Stripe webhook endpoint skeleton
- **packages/ui** – Shared UI library (shadcn/lucide ready)
- **docs** – Developer handoff + architecture + Notion task list
- **.github/workflows** – CI for installs, lint, type-check, and build

## Quick start
```bash
# 1) Clone and bootstrap
pnpm i --ignore-scripts

# 2) Copy envs from examples and fill secrets
cp apps/oracle-chat/.env.example apps/oracle-chat/.env
cp infra/firebase/functions/.env.example infra/firebase/functions/.env
cp infra/stripe/.env.example infra/stripe/.env

# 3) Dev
pnpm -w run dev
```

### Scripts
- `pnpm dev` – Runs Next dev for oracle-chat
- `pnpm typecheck` – Repo-wide type checking
- `pnpm lint` – Lint source
- `pnpm build` – Build all workspaces

### Notes
- **Landing page** will be built/hosted in Framer; this repo keeps copy assets + tracking docs.
- Use **GitHub Secrets** for environment variables when wiring Actions/CD.


## Auto-create GitHub repo
Use the helper scripts with the **GitHub CLI** (`gh`) installed.

**Windows (PowerShell):**
```powershell
cd scripts
.\create_github_repo.ps1 -RepoName "eShaman" -Visibility "private"
```

**macOS/Linux:**
```bash
cd scripts
./create_github_repo.sh eShaman private
```
You’ll be prompted to log in to GitHub and paste secrets. The script sets branch protection and pushes `main`.


## Firebase
Setup (one time):
```powershell
# Windows
./scripts/setup_firebase.ps1 -ProjectId "eshaman-prod"
```
```bash
# macOS/Linux
./scripts/setup_firebase.sh eshaman-prod
```
Secrets needed in GitHub:
- `FIREBASE_PROJECT_ID` (e.g., `eshaman-prod`)
- `FIREBASE_SERVICE_ACCOUNT_JSON` (paste full JSON)

## Stripe
Create products & monthly prices, and store IDs as secrets:
```powershell
./scripts/setup_stripe.ps1 -ProductBasic "eShaman Basic" -ProductPro "eShaman Pro" -BasicPriceMonthlyCents 990 -ProPriceMonthlyCents 1990
```
```bash
./scripts/setup_stripe.sh "eShaman Basic" "eShaman Pro" 990 1990
```
It writes `STRIPE_PRICE_BASIC` and `STRIPE_PRICE_PRO` secrets automatically.

## Deploy
A workflow `Deploy Firebase (Oracle app + Functions)` runs on push to `main`.
Make sure secrets are set first.
