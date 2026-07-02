# atualizar-erp.ps1
# Roda esse script sempre que salvar o Excel.
# Funciona mesmo com o arquivo aberto no Excel (copia antes de ler).

$erpPath = "$PSScriptRoot\01_Financeiro\ERP_Guaru_Estudio.xlsx"
$tmpPath = "$PSScriptRoot\01_Financeiro\_erp_tmp.xlsx"
$outPath  = "$PSScriptRoot\erp-data.js"

if (-not (Test-Path $erpPath)) {
    Write-Host "ERRO: arquivo nao encontrado em $erpPath" -ForegroundColor Red
    exit 1
}

# Copia com FileShare.ReadWrite para ler mesmo com Excel aberto
try {
    $src = [System.IO.File]::Open($erpPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
    $dst = [System.IO.File]::Open($tmpPath, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
    $src.CopyTo($dst)
    $src.Close()
    $dst.Close()
} catch {
    Write-Host "ERRO ao copiar arquivo: $_" -ForegroundColor Red
    exit 1
}

$bytes  = [System.IO.File]::ReadAllBytes($tmpPath)
Remove-Item $tmpPath -Force -ErrorAction SilentlyContinue

$base64 = [System.Convert]::ToBase64String($bytes)
$name   = [System.IO.Path]::GetFileName($erpPath)
$ts     = Get-Date -Format "dd/MM/yyyy HH:mm"

$js = "/* Gerado automaticamente por atualizar-erp.ps1 em $ts -- nao edite manualmente */`nwindow.ERP_EMBEDDED = `"$base64`";`nwindow.ERP_NAME = `"$name`";`nwindow.ERP_TS = `"$ts`";"

[System.IO.File]::WriteAllText($outPath, $js, [System.Text.Encoding]::UTF8)
Write-Host "OK - erp-data.js atualizado ($ts)" -ForegroundColor Green
