Steps to test takeoffbeautyclinic.com locally


1) Run the script (Administrator PowerShell):

   PowerShell -ExecutionPolicy Bypass -File .\setup_local_domain.ps1

   - To also generate a self-signed certificate and export a PFX, run:

   PowerShell -ExecutionPolicy Bypass -File .\setup_local_domain.ps1 -CreateCert

   The PFX will be exported to `C:\Users\<you>\\takeoffbeautyclinic.com.pfx` with password `changeit`.

2) Start the local HTTP server (already started earlier):

   python -m http.server 8000

3a) Test without TLS (quick):

   Open: http://takeoffbeautyclinic.com:8000  (because hosts maps the hostname to localhost)

3b) Test with TLS (optional, more steps):

   - You can bind the created certificate to port 443 using `netsh` (requires admin):

     netsh http add sslcert ipport=0.0.0.0:443 certhash=<thumbprint> appid={00112233-4455-6677-8899-AABBCCDDEEFF}

    - Then point a local HTTPS-capable server to use that cert, or run a small HTTPS server using the PFX (tools like IIS, http.sys bindings, or a custom Python server with SSL)

Notes:
- Editing the hosts file and binding certs require Administrator privileges.
- Browsers will show a certificate warning for self-signed certs. Use `mkcert` or a trusted cert for a clean experience.
- If you want, I can try to bind the cert and start an HTTPS server now, but I will need you to confirm you want me to proceed and be aware admin elevation is required.
