<#
setup_local_domain.ps1
Run as Administrator. Adds hosts entry for takeoffbeautyclinic.com and (optionally)
creates a self-signed certificate exported to your user profile as a PFX.

Usage (run in an elevated PowerShell):
  PowerShell -ExecutionPolicy Bypass -File .\setup_local_domain.ps1
#>

param(
    [string]$Domain = "takeoffbeautyclinic.com",
    [switch]$CreateCert  # pass -CreateCert to generate and export a self-signed cert
)

$hostsPath = "$env:WinDir\System32\drivers\etc\hosts"
$entry = "127.0.0.1`t $Domain"

try {
    if (-not (Select-String -Path $hostsPath -Pattern $Domain -Quiet)) {
        Add-Content -Path $hostsPath -Value $entry
        Write-Output "[OK] Added hosts entry: $entry"
    }
    else {
        Write-Output "[SKIP] Hosts entry already exists."
    }
}
catch {
    Write-Error "Failed to update hosts file. Run PowerShell as Administrator. $_"
    exit 1
}

if ($CreateCert) {
    try {
        Write-Output "Creating self-signed certificate for $Domain..."
        $cert = New-SelfSignedCertificate -DnsName $Domain -CertStoreLocation "cert:\LocalMachine\My" -NotAfter (Get-Date).AddYears(5)
        $thumb = $cert.Thumbprint -replace "\s+",""
        $pfxPath = "$env:USERPROFILE\\$Domain.pfx"
        $pwd = ConvertTo-SecureString -String "changeit" -Force -AsPlainText
        Export-PfxCertificate -Cert "cert:\LocalMachine\My\$thumb" -FilePath $pfxPath -Password $pwd
        Write-Output "[OK] Exported PFX to: $pfxPath (password: changeit)"
        Write-Output "Next: bind the cert to port 443 or use the PFX with your local server. Example netsh command (run as admin):"
        Write-Output "  netsh http add sslcert ipport=0.0.0.0:443 certhash=$thumb appid={00112233-4455-6677-8899-AABBCCDDEEFF}"
    }
    catch {
        Write-Error "Certificate creation/export failed: $_"
        exit 1
    }
}
else {
    Write-Output "To create a self-signed cert as well, re-run with -CreateCert"
}

Write-Output "Done. Start (or restart) your local server and open https://$Domain or http://$Domain:8000 for testing."
