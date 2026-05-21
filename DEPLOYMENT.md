# Deployment

This repository is configured to deploy the static site to GitHub Pages with a custom domain.

## How it works

- `CNAME` contains `takeoffbeautyclinic.com`.
- `.github/workflows/deploy.yml` runs on every push to `main`.
- It prepares only the website files and uploads them as a GitHub Pages artifact.
- `actions/upload-pages-artifact@v3` uploads the artifact.
- `actions/deploy-pages@v4` publishes that artifact to GitHub Pages.

## Steps to publish

1. Commit and push the current changes to `main`:

   ```powershell
   git add .
   git commit -m "Deploy site to takeoffbeautyclinic.com"
   git push origin main
   ```

2. Wait for the GitHub Actions workflow to complete.

3. Confirm GitHub Pages is configured to deploy from GitHub Actions in repository settings.

4. Ensure the custom domain is set to `takeoffbeautyclinic.com`.

## DNS

For the apex domain `takeoffbeautyclinic.com`, add the following A records at your DNS provider:

- `@` → `185.199.108.153`
- `@` → `185.199.109.153`
- `@` → `185.199.110.153`
- `@` → `185.199.111.153`

If you want `www.takeoffbeautyclinic.com`, also add:

- `www` → `takeoffbeautyclinic.com`

## Notes

- This workflow publishes only the website assets, not repository docs or scripts.
- Current local tests on this machine may resolve `takeoffbeautyclinic.com` to `127.0.0.1` because of a local hosts entry.
- If the custom domain still does not load publicly, the most likely cause is missing DNS records for `takeoffbeautyclinic.com`.

## Verification

After DNS propagation, the site should be available at:

- `https://takeoffbeautyclinic.com`
