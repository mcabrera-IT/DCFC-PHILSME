Add-Type -AssemblyName System.Drawing

$assetsPath = Join-Path $PSScriptRoot "src\assets"
$files = @("background.png", "background2.png", "background3.png")

foreach ($f in $files) {
    $fullPath = Join-Path $assetsPath $f
    $absPath = (Resolve-Path $fullPath).Path
    $img = [System.Drawing.Image]::FromFile($absPath)
    Write-Host "$f : original $($img.Width) x $($img.Height)"
    $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
    Write-Host "$f : rotated  $($img.Width) x $($img.Height)"

    # Save to temp then overwrite (can't save over open file)
    $tmpPath = $absPath + ".tmp.png"
    $img.Save($tmpPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $img.Dispose()

    Remove-Item $absPath
    Rename-Item $tmpPath $absPath
    Write-Host "$f : saved OK"
}
