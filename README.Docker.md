# 🐳 Guía de Docker para RoomiesU

Esta guía te ayudará a ejecutar RoomiesU usando Docker y Docker Compose.

## 📋 Prerrequisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado
- Docker Compose (incluido con Docker Desktop)

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env` y configura tus valores:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales reales, especialmente:
- JWT_SECRET (usa un valor seguro y aleatorio)
- Credenciales de Cloudinary
- Credenciales de correo electrónico (para recuperación de contraseñas)

### 2. Construir y Ejecutar los Contenedores

```bash
docker-compose up -d
```

Este comando:
- Descarga las imágenes base necesarias (MySQL, Node, Nginx)
- Construye las imágenes para backend y frontend
- Crea y arranca los contenedores
- Inicializa la base de datos con el esquema SQL
- Configura la red y los volúmenes

### 3. Verificar el Estado

```bash
docker-compose ps
```

Deberías ver 3 servicios en ejecución:
- `roomiesu_db` (MySQL - Puerto 3306)
- `roomiesu_backend` (Node.js - Puerto 4000)
- `roomiesu_frontend` (Nginx - Puerto 5173)

### 4. Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **MySQL**: localhost:3306

## 🔧 Comandos Útiles

### Ver logs
```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend

# Solo base de datos
docker-compose logs -f db
```

### Detener los contenedores
```bash
docker-compose stop
```

### Iniciar contenedores detenidos
```bash
docker-compose start
```

### Detener y eliminar contenedores (mantiene volúmenes)
```bash
docker-compose down
```

### Detener y eliminar TODO (incluyendo volúmenes de datos)
```bash
docker-compose down -v
```

### Reconstruir las imágenes
```bash
docker-compose build

# O reconstruir sin caché
docker-compose build --no-cache
```

### Ejecutar comandos dentro de un contenedor
```bash
# Acceder a la base de datos
docker-compose exec db mysql -u root -p

# Acceder al backend con shell
docker-compose exec backend sh

# Ver archivos del frontend
docker-compose exec frontend ls -la /usr/share/nginx/html
```

### Reiniciar un servicio específico
```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart db
```

## 💾 Persistencia de Datos

Los datos de MySQL se guardan en un volumen Docker llamado `mysql_data`. Esto significa que:

- ✅ Tus datos persisten cuando detienes los contenedores
- ✅ Tus datos persisten cuando reinicias Docker
- ❌ Los datos se pierden solo si ejecutas `docker-compose down -v`

### Backup de la Base de Datos

```bash
# Crear backup
docker-compose exec db mysqldump -u root -p roomies_test > backup.sql

# Restaurar backup
docker-compose exec -T db mysql -u root -p roomies_test < backup.sql
```

## 🔍 Solución de Problemas

### El backend no se conecta a la base de datos

1. Verifica que el contenedor de base de datos esté en ejecución:
   ```bash
   docker-compose ps db
   ```

2. Verifica los logs de la base de datos:
   ```bash
   docker-compose logs db
   ```

3. Espera a que la base de datos esté completamente inicializada (puede tomar 10-30 segundos en el primer inicio)

### Error de puerto ocupado

Si ves errores como "port is already allocated":

1. Verifica qué está usando el puerto:
   ```bash
   netstat -ano | findstr :3000
   netstat -ano | findstr :5173
   netstat -ano | findstr :3306
   ```

2. Detén el proceso o cambia el puerto en `docker-compose.yml`

### Reiniciar la base de datos desde cero

```bash
# Detener y eliminar todo
docker-compose down -v

# Volver a iniciar
docker-compose up -d
```

### Ver logs de inicio de la base de datos

```bash
docker-compose logs -f db
```

## 🏗️ Estructura de Docker

```
RoomiesU/
├── docker-compose.yml          # Orquestación de servicios
├── .env                        # Variables de entorno (NO SUBIR A GIT)
├── .env.example               # Plantilla de variables de entorno
├── backend/
│   ├── Dockerfile             # Imagen para backend
│   └── .dockerignore          # Archivos ignorados al construir
├── frontend/
│   ├── Dockerfile             # Imagen para frontend
│   ├── nginx.conf             # Configuración de Nginx
│   └── .dockerignore          # Archivos ignorados al construir
└── database/
    └── esquema.sql            # Script de inicialización de BD
```

## 🌐 Redes Docker

Los tres servicios están en la misma red `roomiesu_network`, lo que permite:
- El backend puede conectarse a `db:3306`
- El frontend puede comunicarse con el backend
- Aislamiento de otros contenedores Docker

## 📝 Notas de Producción

Si deseas desplegar en producción:

1. ✅ Cambia todos los secretos en `.env`
2. ✅ Usa volúmenes externos o servicios de base de datos administrados
3. ✅ Configura HTTPS con certificados SSL
4. ✅ Ajusta los límites de recursos en `docker-compose.yml`
5. ✅ Implementa backups automáticos de la base de datos
6. ✅ Considera usar un servicio de almacenamiento para imágenes (ya tienes Cloudinary)

## 🆘 Obtener Ayuda

Si tienes problemas:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el estado: `docker-compose ps`
3. Asegúrate de que Docker Desktop esté en ejecución
4. Verifica que los puertos no estén en uso
5. Intenta reconstruir: `docker-compose build --no-cache`
