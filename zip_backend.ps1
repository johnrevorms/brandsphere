$sourceDir = "backend"
$zipFile = "backend_deployment.zip"

if (Test-Path $zipFile) { Remove-Item $zipFile }

Add-Type -AssemblyName System.IO.Compression.FileSystem
$compressionLevel = [System.IO.Compression.CompressionLevel]::Fastest

$zip = [System.IO.Compression.ZipFile]::Open($zipFile, [System.IO.Compression.ZipArchiveMode]::Create)

$items = Get-ChildItem -Path $sourceDir -Recurse | Where-Object { 
    $_.FullName -notmatch '\\\.git\\' -and $_.Name -ne '.env' -and $_.Name -ne '.git' 
}

foreach ($item in $items) {
    if (-not $item.PSIsContainer) {
        $relativePath = $item.FullName.Substring((Get-Item $sourceDir).FullName.Length + 1)
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $item.FullName, $relativePath, $compressionLevel)
    }
}
$zip.Dispose()
Write-Host "Done"
