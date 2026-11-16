param(
    [Parameter(Mandatory=$true)][string]$ApiBaseUrl,
    [string]$ProjectName='rota-cultural',
    [string]$Scope='rhu4ns-projects',
    [switch]$Apply
)
$ErrorActionPreference='Stop'
$api=$ApiBaseUrl.TrimEnd('/')
if ($api -notmatch '^https://[^/]+$') { throw 'Informe a origem HTTPS real da API.' }
if (!$Apply) { Write-Output "Plano: projeto existente $Scope/$ProjectName; VITE_API_URL=$api; deploy production sem atribuir domínio (staging)."; return }
$health=Invoke-RestMethod "$api/health" -TimeoutSec 120
if ($health.status -ne 'UP' -or $health.storageProvider -ne 'azure') { throw 'API prod ainda não está validada.' }
Push-Location (Join-Path $PSScriptRoot '..')
try {
    # O projeto deve ter sido descoberto/criado explicitamente antes; nunca criar duplicata implicitamente.
    $ErrorActionPreference='Continue'
    npx.cmd vercel@65.16.0 project inspect $ProjectName --scope $Scope --non-interactive
    if ($LASTEXITCODE -ne 0) { throw 'Projeto existente não confirmado.' }
    if (!(Test-Path -LiteralPath .vercel/project.json)) {
        throw 'Vincule explicitamente o projeto com vercel link antes de executar; remova o .env.local transitório criado pela CLI.'
    }
    $link = Get-Content -LiteralPath .vercel/project.json -Raw | ConvertFrom-Json
    if ($link.projectName -ne $ProjectName -or $link.orgId -ne 'team_MqcdXrKXBxy00kWQV7QPy6Da') {
        throw 'Vínculo local diverge do projeto/owner autorizado.'
    }
    npx.cmd vercel@65.16.0 project inspect --scope $Scope --non-interactive
    if ($LASTEXITCODE -ne 0) { throw 'Vínculo não confirmado.' }
    npx.cmd vercel@65.16.0 env add VITE_API_URL --environment production --value $api --no-sensitive --force --yes --scope $Scope
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao configurar API no build production.' }
    npx.cmd vercel@65.16.0 deploy --prod --skip-domain --yes --scope $Scope
    if ($LASTEXITCODE -ne 0) { throw 'Falha no deploy Vercel.' }
    Write-Output 'Validar este deployment e depois promover a mesma URL com vercel promote.'
} finally { Pop-Location }
