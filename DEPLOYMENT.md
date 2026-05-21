# Deployment

This repository is configured to deploy the static site to GitHub Pages with a custom domain.

## How it works

- `CNAME` contains `takeoffbeautyclinic.com`.
- `.github/workflows/deploy.yml` runs on every push to `main`.
- It uses `peaceiris/actions-gh-pages@v4` to publish the repo root to the `gh-pages` branch.
- GitHub Pages should serve the site from the `gh-pages` branch with the custom domain.

## Steps to publish

1. Commit and push the current changes to `main`:

   ```powershell
   git add .
   git commit -m "Deploy site to takeoffbeautyclinic.com"
   git push origin main
   ```

2. Wait for the GitHub Actions workflow to complete.

3. In your GitHub repository settings, enable Pages from the `gh-pages` branch.

4. Set the custom domain to `takeoffbeautyclinic.com` if GitHub does not do it automatically.

## DNS

Set a DNS A record for `takeoffbeautyclinic.com` to GitHub Pages:

- `@` → `185.199.108.153`
- `@` → `185.199.109.153`
- `@` → `185.199.110.153`
- `@` → `185.199.111.153`

If you also want `www.takeoffbeautyclinic.com`, add a CNAME:

- `www` → `takeoffbeautyclinic.com`

## Verification

After DNS propagation, the site should be available at:

- `https://takeoffbeautyclinic.com`
