# =============================================================================
# convert-tally-json.ps1
# =============================================================================
# Run this every time you export a fresh JSON file from Tally.
#
# What it does:
#   1. Converts the Tally-exported UTF-16 LE file  →  UTF-8
#   2. Minifies (strips all whitespace outside strings)
#   3. Replaces the original file and cleans up temp files
#
# Usage:
#   .\convert-tally-json.ps1
#   .\convert-tally-json.ps1 -InputFile "out.json"
#   .\convert-tally-json.ps1 -InputFile "out.json" -KeepUtf8
# =============================================================================

param (
    [string]$InputFile = "Transactions.json",   # file exported from Tally (UTF-16 LE)
    [string]$OutputFile = "",                 # optional, where to save the minified file
    [switch]$KeepUtf8                         # keep the intermediate UTF-8 file
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$DataDir   = Join-Path $ScriptDir ""

$InputPath  = Join-Path $DataDir $InputFile
$Utf8Path   = Join-Path $DataDir ($InputFile -replace '\.json$', '_utf8.json')

if ([string]::IsNullOrWhiteSpace($OutputFile)) {
    $OutputFile = ($InputFile -replace '\.json$', '_min.json')
}
$OutputPath = Join-Path $DataDir $OutputFile

$MinifyScript = Join-Path $DataDir "minify_temp.js"

# ── Validate ────────────────────────────────────────────────────────────────
if (-not (Test-Path $InputPath)) {
    Write-Error "Input file not found: $InputPath"
    exit 1
}

$origMB = [math]::Round((Get-Item $InputPath).Length / 1MB, 2)
Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Tally JSON Converter" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Input : $InputFile  ($origMB MB)"
Write-Host ""

# ── Step 1: UTF-16 LE → UTF-8 ───────────────────────────────────────────────
Write-Host "[1/3] Converting UTF-16 LE → UTF-8 ..." -ForegroundColor Yellow
Get-Content $InputPath -Encoding Unicode | Set-Content $Utf8Path -Encoding UTF8
$utf8MB = [math]::Round((Get-Item $Utf8Path).Length / 1MB, 2)
Write-Host "      Done  →  $utf8MB MB" -ForegroundColor Green

# ── Step 2: Minify (strip whitespace outside strings) via Node.js ────────────
Write-Host "[2/3] Minifying (stripping whitespace) ..." -ForegroundColor Yellow

# Write the minifier script temporarily
Set-Content $MinifyScript -Encoding UTF8 -Value @'
import { createReadStream, createWriteStream, statSync } from 'fs';
const [,, src, dst] = process.argv;
const input  = createReadStream(src, { encoding: 'utf8' });
const output = createWriteStream(dst);
let inString = false, escape = false;
input.on('data', (chunk) => {
    let result = '';
    for (const ch of chunk) {
        if (escape)               { escape = false; result += ch; continue; }
        if (ch === '\\' && inString) { escape = true;  result += ch; continue; }
        if (ch === '"')           { inString = !inString; result += ch; continue; }
        if (inString)             { result += ch; continue; }
        if (ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n') continue;
        result += ch;
    }
    output.write(result);
});
input.on('end', () => {
    output.end(() => {
        const mb = (statSync(dst).size / 1024 / 1024).toFixed(2);
        console.log(mb);
    });
});
input.on('error', (e) => { console.error(e); process.exit(1); });
'@

$minMB = node $MinifyScript $Utf8Path $OutputPath
Write-Host "      Done  →  $minMB MB" -ForegroundColor Green

# ── Step 3: Clean up ────────────────────────────────────────────────────────
Write-Host "[3/3] Cleaning up temporary files ..." -ForegroundColor Yellow
Remove-Item $MinifyScript

if ($KeepUtf8) {
    Write-Host "      UTF-8 file kept at: $Utf8Path" -ForegroundColor DarkGray
} else {
    Remove-Item $Utf8Path
}

$finalMB = [math]::Round((Get-Item $OutputPath).Length / 1MB, 2)

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Complete!" -ForegroundColor Green
Write-Host "  Original : $origMB MB"
Write-Host "  Final    : $finalMB MB  ($(  [math]::Round((1 - $finalMB/$origMB)*100) )% smaller)"
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
