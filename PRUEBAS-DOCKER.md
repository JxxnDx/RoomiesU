# 🚀 GUÍA RÁPIDA DE PRUEBAS - ROOMIESU CON DOCKER

## ⚠️ ANTES DE EMPEZAR

### 1. Asegúrate de que Docker Desktop esté ejecutándose
- Busca el ícono de Docker en la bandeja del sistema (junto al reloj)
- Si no está en verde, abre Docker Desktop y espera a que inicie
- Verifica que diga "Docker Desktop is running"

### 2. Verifica que WSL esté configurado
Si usas WSL 2, Docker Desktop debe tener habilitada la integración con WSL.

---

## 🧪 PRUEBAS PASO A PASO

### Opción 1: Usando el Script Automático (Recomendado)

```powershell
# Navegar al proyecto
cd c:\PROYECTOS_WEB_LOCAL\RoomiesU

# Ejecutar el script de prueba
.\test-docker.ps1

# Una vez que los contenedores estén corriendo, probar los endpoints
.\test-endpoints.ps1
```

---

### Opción 2: Comandos Manuales

#### Paso 1: Verificar Docker
```powershell
docker --version
docker-compose --version
```

Deberías ver algo como:
```
Docker version 28.0.1
Docker Compose version v2.33.1
```

#### Paso 2: Configurar variables de entorno
```powershell
# Si no existe .env, crearlo desde el ejemplo
if (!(Test-Path .env)) { Copy-Item .env.example .env }

# Editar el archivo .env con tus credenciales reales
code .env  # o notepad .env
```

**Mínimo necesario en .env:**
```env
DB_ROOT_PASSWORD=rootpassword
DB_NAME=roomies_test
DB_USER=roomies_user
DB_PASS=roomies_password
JWT_SECRET=mi-super-secreto-jwt-12345
VITE_API_URL=http://localhost:4000
```

#### Paso 3: Construir las imágenes
```powershell
docker-compose build
```
⏳ Esto puede tomar 5-10 minutos la primera vez.

#### Paso 4: Iniciar los contenedores
```powershell
docker-compose up -d
```

#### Paso 5: Verificar que estén corriendo
```powershell
docker-compose ps
```

Deberías ver 3 contenedores:
```
NAME                 STATUS              PORTS
roomiesu_db         Up                  0.0.0.0:3306->3306/tcp
roomiesu_backend    Up                  0.0.0.0:4000->4000/tcp
roomiesu_frontend   Up                  0.0.0.0:5173->80/tcp
```

#### Paso 6: Ver los logs
```powershell
# Ver todos los logs
docker-compose logs

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs db
docker-compose logs frontend
```

#### Paso 7: Probar la aplicación

**En el navegador:**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

**Desde PowerShell:**
```powershell
# Probar frontend
Invoke-WebRequest -Uri http://localhost:5173 -Method Get

# Probar backend
Invoke-WebRequest -Uri http://localhost:4000 -Method Get
```

#### Paso 8: Verificar la base de datos
```powershell
# Conectarse a MySQL
docker-compose exec db mysql -uroot -prootpassword

# Una vez dentro de MySQL:
SHOW DATABASES;
USE roomies_test;
SHOW TABLES;
exit
```

---

## 🔍 SOLUCIÓN DE PROBLEMAS

### ❌ Error: "Cannot connect to Docker daemon"
**Solución:** Inicia Docker Desktop y espera a que esté completamente listo.

### ❌ Error: "port is already allocated"
**Solución:** Algún servicio está usando los puertos 3306, 4000 o 5173.
```powershell
# Verificar qué está usando el puerto
netstat -ano | findstr :4000
netstat -ano | findstr :5173
netstat -ano | findstr :3306

# Detener los contenedores y reiniciar
docker-compose down
docker-compose up -d
```

### ❌ Backend no se conecta a la base de datos
**Solución:** La base de datos puede tardar 30-60 segundos en estar lista.
```powershell
# Ver logs de la base de datos
docker-compose logs db

# Esperar y reiniciar el backend
docker-compose restart backend
```

### ❌ Frontend muestra página en blanco
**Solución:** Verifica que el build se completó correctamente.
```powershell
# Ver logs del frontend
docker-compose logs frontend

# Reconstruir el frontend
docker-compose build frontend --no-cache
docker-compose up -d frontend
```

### 🔄 Reiniciar desde cero
```powershell
# Detener y eliminar TODO (incluyendo volúmenes)
docker-compose down -v

# Volver a construir e iniciar
docker-compose build
docker-compose up -d
```

---

## 📊 COMANDOS ÚTILES

```powershell
# Ver estado de contenedores
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Detener contenedores (sin eliminarlos)
docker-compose stop

# Iniciar contenedores detenidos
docker-compose start

# Reiniciar un servicio específico
docker-compose restart backend

# Ver uso de recursos
docker stats

# Entrar a un contenedor
docker-compose exec backend sh
docker-compose exec db bash

# Eliminar todo y empezar de nuevo
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d

# Ver imágenes creadas
docker images | Select-String roomiesu

# Ver volúmenes
docker volume ls | Select-String roomiesu
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

- [ ] Docker Desktop está corriendo (ícono verde)
- [ ] Archivo `.env` existe y tiene las credenciales correctas
- [ ] `docker-compose ps` muestra 3 contenedores "Up"
- [ ] http://localhost:5173 muestra la interfaz de RoomiesU
- [ ] http://localhost:4000 responde (puede ser un error de ruta, pero debe responder)
- [ ] Los logs no muestran errores críticos: `docker-compose logs`

---

## 🎯 PRÓXIMOS PASOS

Una vez que todo funcione:

1. **Crear un usuario** en la aplicación
2. **Probar el login**
3. **Verificar que las imágenes se suban correctamente** (necesitas configurar Cloudinary)
4. **Revisar que los emails funcionen** (necesitas configurar EMAIL_USER y EMAIL_PASS)

---

## 📝 NOTAS IMPORTANTES

- Los datos de MySQL persisten en un volumen Docker llamado `roomiesu_mysql_data`
- Los datos se conservan incluso si detienes los contenedores
- Para eliminar los datos, usa: `docker-compose down -v`
- La primera vez que inicies MySQL, puede tardar 30-60 segundos en estar listo
- El backend esperará a que MySQL esté listo gracias al healthcheck

---

## 🆘 ¿NECESITAS AYUDA?

Si algo no funciona:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el estado: `docker-compose ps`
3. Asegúrate de que Docker Desktop esté corriendo
4. Intenta reiniciar desde cero: `docker-compose down -v && docker-compose up -d`
