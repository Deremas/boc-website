# Deploy to cPanel (GitHub Actions)

Pushing to `main` (or `master`) builds a static site and uploads `dist/` to cPanel over FTPS.

## One-time GitHub secrets

Repo → **Settings → Secrets and variables → Actions** → **Secrets**

| Secret | Purpose |
|---|---|
| `FTP_USERNAME` | FTP username from cPanel |
| `FTP_PASSWORD` | FTP password from cPanel |

Host is fixed as `ftp.blueoceancreatives.com` → `public_html/` over FTPS.

## Contact form config (once on the server)

Do **not** put Resend / Telegram / Turnstile keys in GitHub. On the server, create `public_html/api/config.php` from `api/config.example.php` (cPanel File Manager or a one-time FTP upload). Deploys never overwrite that file.

## What the workflow does

1. `npm ci`
2. `npm run build:cpanel` — static Astro build (no Vercel adapter)
3. Uploads `dist/` with [FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action)

Contact form on cPanel uses `api/contact.php` (rewritten from `/api/contact` via `.htaccess`).

## Manual run

Actions → **Deploy to cPanel** → **Run workflow**.

## Local cPanel build check

```bash
npm run build:cpanel
```

Output is in `dist/`. Do not commit `api/config.php`.
