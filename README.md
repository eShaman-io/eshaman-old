# eShaman — Spiritual AI App

A production-ready **eShaman** spiritual AI application with complete setup automation.

## What’s inside
- **Next.js 14** app with TypeScript for the Oracle chat, rituals, and authentication
- **Firebase Authentication** integration for user management  
- **OpenAI API** integration for spiritual guidance and oracle readings
- **Stripe** integration for subscription billing
- **Automated setup scripts** for Windows and macOS/Linux
- **Complete documentation** and quickstart guides

## Quick start
```bash
# 1) Clone and install dependencies
pnpm install

# 2) Copy environment file and fill in your API keys
cp .env.example .env

# 3) Start development server
pnpm dev
```

### Scripts
- `pnpm dev` – Start Next.js development server
- `pnpm build` – Build the application
- `pnpm start` – Start production server
- `pnpm lint` – Lint the code
- `pnpm typecheck` – Type check the code

### Setup your API keys
Edit `.env` file with your API keys:
- **OpenAI API Key** for oracle functionality
- **Stripe keys** for subscription billing
- **Firebase config** for authentication


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
