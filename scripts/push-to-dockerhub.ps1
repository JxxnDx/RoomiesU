# Script para subir las imágenes de RoomiesU a DockerHub
# Uso: .\scripts\push-to-dockerhub.ps1 -Username "tu_usuario_dockerhub"

param(
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [Parameter(Mandatory=$false)]
    [string]$Version = "1.0.0"
)

Write-Host "`n🐳 SUBIENDO ROOMIESU A DOCKERHUB" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

# Verificar que Docker esté corriendo
try {
    docker --version | Out-Null
} catch {
    Write-Host "❌ Docker no está corriendo. Por favor inicia Docker Desktop." -ForegroundColor Red
    exit 1
}

# Verificar que las imágenes locales existan
Write-Host "📋 Verificando imágenes locales..." -ForegroundColor Yellow
$backendImage = docker images -q roomiesu-backend
$frontendImage = docker images -q roomiesu-frontend

if (-not $backendImage) {
    Write-Host "❌ No se encontró la imagen 'roomiesu-backend'. Construyéndola..." -ForegroundColor Yellow
    docker-compose build backend
}

if (-not $frontendImage) {
    Write-Host "❌ No se encontró la imagen 'roomiesu-frontend'. Construyéndola..." -ForegroundColor Yellow
    docker-compose build frontend
}

Write-Host "✅ Imágenes locales encontradas`n" -ForegroundColor Green

# Iniciar sesión en DockerHub
Write-Host "🔐 Iniciando sesión en DockerHub..." -ForegroundColor Yellow
Write-Host "Se te pedirá tu contraseña de DockerHub`n" -ForegroundColor Gray
docker login
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al iniciar sesión en DockerHub" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Sesión iniciada correctamente`n" -ForegroundColor Green

# Etiquetar imágenes
Write-Host "🏷️  Etiquetando imágenes..." -ForegroundColor Yellow

# Backend
Write-Host "  Backend -> ${Username}/roomiesu-backend:latest" -ForegroundColor Gray
docker tag roomiesu-backend ${Username}/roomiesu-backend:latest

Write-Host "  Backend -> ${Username}/roomiesu-backend:${Version}" -ForegroundColor Gray
docker tag roomiesu-backend ${Username}/roomiesu-backend:${Version}

# Frontend
Write-Host "  Frontend -> ${Username}/roomiesu-frontend:latest" -ForegroundColor Gray
docker tag roomiesu-frontend ${Username}/roomiesu-frontend:latest

Write-Host "  Frontend -> ${Username}/roomiesu-frontend:${Version}" -ForegroundColor Gray
docker tag roomiesu-frontend ${Username}/roomiesu-frontend:${Version}

Write-Host "✅ Imágenes etiquetadas correctamente`n" -ForegroundColor Green

# Subir imágenes
Write-Host "📤 Subiendo imágenes a DockerHub..." -ForegroundColor Yellow
Write-Host "⏳ Esto puede tomar varios minutos...`n" -ForegroundColor Cyan

# Subir backend
Write-Host "Subiendo backend:latest..." -ForegroundColor Gray
docker push ${Username}/roomiesu-backend:latest
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al subir backend:latest" -ForegroundColor Red
    exit 1
}

Write-Host "Subiendo backend:${Version}..." -ForegroundColor Gray
docker push ${Username}/roomiesu-backend:${Version}
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al subir backend:${Version}" -ForegroundColor Red
    exit 1
}

# Subir frontend
Write-Host "Subiendo frontend:latest..." -ForegroundColor Gray
docker push ${Username}/roomiesu-frontend:latest
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al subir frontend:latest" -ForegroundColor Red
    exit 1
}

Write-Host "Subiendo frontend:${Version}..." -ForegroundColor Gray
docker push ${Username}/roomiesu-frontend:${Version}
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al subir frontend:${Version}" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ TODAS LAS IMÁGENES SUBIDAS EXITOSAMENTE" -ForegroundColor Green
Write-Host "=========================================`n" -ForegroundColor Cyan

Write-Host "📊 Tus imágenes en DockerHub:" -ForegroundColor Yellow
Write-Host "  Backend:  https://hub.docker.com/r/${Username}/roomiesu-backend" -ForegroundColor Cyan
Write-Host "  Frontend: https://hub.docker.com/r/${Username}/roomiesu-frontend`n" -ForegroundColor Cyan

Write-Host "🎯 Próximos pasos:" -ForegroundColor Yellow
Write-Host "  1. Edita docker-compose-hub.yml y reemplaza 'TU_USUARIO_DOCKERHUB' con: $Username" -ForegroundColor Gray
Write-Host "  2. Comparte el archivo docker-compose-hub.yml con tu equipo" -ForegroundColor Gray
Write-Host "  3. Otros pueden usar: docker-compose -f docker-compose-hub.yml up -d`n" -ForegroundColor Gray

Write-Host "🔄 Para actualizar las imágenes más tarde:" -ForegroundColor Yellow
Write-Host "  .\scripts\push-to-dockerhub.ps1 -Username $Username -Version 1.0.1`n" -ForegroundColor Gray
