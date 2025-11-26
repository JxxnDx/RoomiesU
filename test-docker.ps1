# Script de prueba para Docker en RoomiesU
# Este script te guiará paso a paso

Write-Host "🐳 PRUEBA DE DOCKER - ROOMIESU" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Paso 1: Verificar Docker
Write-Host "📋 Paso 1: Verificando Docker Desktop..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker instalado: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está instalado o no está en ejecución" -ForegroundColor Red
    Write-Host "Por favor, inicia Docker Desktop y vuelve a ejecutar este script" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Paso 2: Verificar Docker Compose
Write-Host "📋 Paso 2: Verificando Docker Compose..." -ForegroundColor Yellow
try {
    $composeVersion = docker-compose --version
    Write-Host "✅ Docker Compose instalado: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose no está disponible" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Paso 3: Verificar archivo .env
Write-Host "📋 Paso 3: Verificando archivo .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✅ Archivo .env encontrado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Archivo .env no encontrado. Creándolo desde .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Archivo .env creado. Por favor edítalo con tus credenciales reales antes de continuar." -ForegroundColor Green
    Write-Host ""
    Write-Host "Presiona Enter cuando hayas editado el archivo .env..." -ForegroundColor Cyan
    Read-Host
}

Write-Host ""

# Paso 4: Limpiar contenedores anteriores (si existen)
Write-Host "📋 Paso 4: Limpiando contenedores anteriores..." -ForegroundColor Yellow
docker-compose down -v 2>$null
Write-Host "✅ Limpieza completada" -ForegroundColor Green

Write-Host ""

# Paso 5: Construir imágenes
Write-Host "📋 Paso 5: Construyendo imágenes Docker..." -ForegroundColor Yellow
Write-Host "⏳ Esto puede tomar varios minutos la primera vez..." -ForegroundColor Cyan
docker-compose build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Imágenes construidas exitosamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error al construir las imágenes" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Paso 6: Iniciar contenedores
Write-Host "📋 Paso 6: Iniciando contenedores..." -ForegroundColor Yellow
docker-compose up -d
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Contenedores iniciados" -ForegroundColor Green
} else {
    Write-Host "❌ Error al iniciar contenedores" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Paso 7: Esperar a que los servicios estén listos
Write-Host "📋 Paso 7: Esperando a que los servicios estén listos..." -ForegroundColor Yellow
Write-Host "⏳ Esto puede tomar 30-60 segundos..." -ForegroundColor Cyan

Start-Sleep -Seconds 10

for ($i = 1; $i -le 6; $i++) {
    Write-Host "   Verificando... intento $i/6" -ForegroundColor Gray
    Start-Sleep -Seconds 5
}

Write-Host ""

# Paso 8: Verificar estado de contenedores
Write-Host "📋 Paso 8: Verificando estado de contenedores..." -ForegroundColor Yellow
Write-Host ""
docker-compose ps

Write-Host ""

# Paso 9: Verificar logs de la base de datos
Write-Host "📋 Paso 9: Verificando logs de la base de datos..." -ForegroundColor Yellow
Write-Host "Últimas 10 líneas:" -ForegroundColor Gray
docker-compose logs --tail=10 db

Write-Host ""

# Paso 10: Verificar logs del backend
Write-Host "📋 Paso 10: Verificando logs del backend..." -ForegroundColor Yellow
Write-Host "Últimas 10 líneas:" -ForegroundColor Gray
docker-compose logs --tail=10 backend

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "🎉 PRUEBAS COMPLETADAS" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Accede a tu aplicación en:" -ForegroundColor Yellow
Write-Host "  🌐 Frontend:  http://localhost:5173" -ForegroundColor Cyan
Write-Host "  🔌 Backend:   http://localhost:4000" -ForegroundColor Cyan
Write-Host "  🗄️  MySQL:     localhost:3306" -ForegroundColor Cyan
Write-Host ""
Write-Host "Comandos útiles:" -ForegroundColor Yellow
Write-Host "  Ver logs en tiempo real:    docker-compose logs -f" -ForegroundColor Gray
Write-Host "  Detener contenedores:       docker-compose stop" -ForegroundColor Gray
Write-Host "  Reiniciar contenedores:     docker-compose restart" -ForegroundColor Gray
Write-Host "  Eliminar todo:              docker-compose down -v" -ForegroundColor Gray
Write-Host ""
