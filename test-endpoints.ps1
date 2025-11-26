# Script para probar los endpoints de la aplicación

Write-Host "🧪 PRUEBA DE ENDPOINTS - ROOMIESU" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Función para probar un endpoint
function Test-Endpoint {
    param (
        [string]$Name,
        [string]$Url
    )
    
    Write-Host "Probando: $Name" -ForegroundColor Yellow
    Write-Host "URL: $Url" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -TimeoutSec 5 -ErrorAction Stop
        Write-Host "✅ Estado: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "   Respuesta: $($response.Content.Substring(0, [Math]::Min(100, $response.Content.Length)))..." -ForegroundColor Gray
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Esperar un momento para asegurar que los servicios estén listos
Write-Host "⏳ Esperando 5 segundos para que los servicios estén listos..." -ForegroundColor Cyan
Start-Sleep -Seconds 5
Write-Host ""

# Probar Frontend
Test-Endpoint -Name "Frontend (React App)" -Url "http://localhost:5173"

# Probar Backend - Endpoint raíz
Test-Endpoint -Name "Backend - Endpoint Raíz" -Url "http://localhost:4000"

# Probar Backend - API Routes (puede que necesites ajustar según tus rutas)
Test-Endpoint -Name "Backend - Auth Routes" -Url "http://localhost:4000/api/auth"

# Verificar conexión a MySQL desde el host
Write-Host "🗄️  Probando conexión a MySQL..." -ForegroundColor Yellow
try {
    $mysqlTest = docker-compose exec -T db mysql -uroot -prootpassword -e "SELECT 'Conexión exitosa' as Resultado;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MySQL está funcionando correctamente" -ForegroundColor Green
        Write-Host "$mysqlTest" -ForegroundColor Gray
    } else {
        Write-Host "⚠️  MySQL aún no está completamente listo" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error al conectar con MySQL: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "✅ Pruebas completadas" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Si ves errores, espera unos segundos más y vuelve a ejecutar:" -ForegroundColor Yellow
Write-Host "  .\test-endpoints.ps1" -ForegroundColor Cyan
Write-Host ""
