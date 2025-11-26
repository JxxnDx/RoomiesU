# 🐳 Guía para Subir RoomiesU a DockerHub

Esta guía te ayudará a subir las imágenes de RoomiesU a DockerHub para que otros puedan usarlas.

## 📋 Prerrequisitos

1. **Cuenta en DockerHub**: Si no tienes una, créala en https://hub.docker.com
2. **Docker Desktop corriendo**: Asegúrate de que Docker Desktop esté ejecutándose

## 🔐 Paso 1: Iniciar Sesión en DockerHub

```powershell
# Iniciar sesión (te pedirá tu usuario y contraseña de DockerHub)
docker login
```

## 🏷️ Paso 2: Etiquetar las Imágenes

Reemplaza `TU_USUARIO_DOCKERHUB` con tu nombre de usuario de DockerHub.

```powershell
# Etiquetar la imagen del backend
docker tag roomiesu-backend TU_USUARIO_DOCKERHUB/roomiesu-backend:latest
docker tag roomiesu-backend TU_USUARIO_DOCKERHUB/roomiesu-backend:1.0.0

# Etiquetar la imagen del frontend
docker tag roomiesu-frontend TU_USUARIO_DOCKERHUB/roomiesu-frontend:latest
docker tag roomiesu-frontend TU_USUARIO_DOCKERHUB/roomiesu-frontend:1.0.0
```

### Ejemplo con usuario "jxxndx":
```powershell
docker tag roomiesu-backend jxxndx/roomiesu-backend:latest
docker tag roomiesu-backend jxxndx/roomiesu-backend:1.0.0
docker tag roomiesu-frontend jxxndx/roomiesu-frontend:latest
docker tag roomiesu-frontend jxxndx/roomiesu-frontend:1.0.0
```

## 📤 Paso 3: Subir las Imágenes a DockerHub

```powershell
# Subir backend
docker push TU_USUARIO_DOCKERHUB/roomiesu-backend:latest
docker push TU_USUARIO_DOCKERHUB/roomiesu-backend:1.0.0

# Subir frontend
docker push TU_USUARIO_DOCKERHUB/roomiesu-frontend:latest
docker push TU_USUARIO_DOCKERHUB/roomiesu-frontend:1.0.0
```

⏳ **Nota**: Este proceso puede tomar varios minutos dependiendo de tu velocidad de internet.

## 📝 Paso 4: Crear docker-compose-hub.yml

He creado un archivo `docker-compose-hub.yml` que usa las imágenes de DockerHub. Edítalo con tu usuario.

## 🎯 Paso 5: Compartir con Otros

Una vez subidas las imágenes, otros usuarios pueden usar tu aplicación de dos formas:

### Opción A: Con Docker Compose (Recomendado)

```powershell
# Descargar docker-compose-hub.yml y .env.example
# Crear .env desde .env.example
cp .env.example .env

# Editar .env con las credenciales

# Iniciar la aplicación
docker-compose -f docker-compose-hub.yml up -d
```

### Opción B: Comandos Docker Individuales

```powershell
# Crear red
docker network create roomiesu_network

# Crear volumen para la base de datos
docker volume create roomiesu_mysql_data

# Iniciar MySQL
docker run -d \
  --name roomiesu_db \
  --network roomiesu_network \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=roomies_test \
  -e MYSQL_USER=roomies_user \
  -e MYSQL_PASSWORD=roomies_password \
  -p 3306:3306 \
  -v roomiesu_mysql_data:/var/lib/mysql \
  mysql:8.0

# Esperar 30 segundos para que MySQL inicie

# Iniciar Backend
docker run -d \
  --name roomiesu_backend \
  --network roomiesu_network \
  -e DB_HOST=roomiesu_db \
  -e DB_USER=roomies_user \
  -e DB_PASS=roomies_password \
  -e DB_NAME=roomies_test \
  -e JWT_SECRET=tu-secreto-jwt \
  -p 4000:4000 \
  TU_USUARIO_DOCKERHUB/roomiesu-backend:latest

# Iniciar Frontend
docker run -d \
  --name roomiesu_frontend \
  --network roomiesu_network \
  -p 5173:80 \
  TU_USUARIO_DOCKERHUB/roomiesu-frontend:latest
```

## 📊 Verificar las Imágenes en DockerHub

Después de subir, puedes verlas en:
```
https://hub.docker.com/r/TU_USUARIO_DOCKERHUB/roomiesu-backend
https://hub.docker.com/r/TU_USUARIO_DOCKERHUB/roomiesu-frontend
```

## 📖 Documentación para el README de DockerHub

Puedes agregar esta descripción a tus repositorios en DockerHub:

### Para roomiesu-backend:
```markdown
# RoomiesU Backend

Backend API para RoomiesU - Plataforma de búsqueda y gestión de habitaciones para estudiantes.

## Tecnologías
- Node.js 20
- Express.js
- MySQL 8.0
- JWT Authentication
- Cloudinary para imágenes

## Uso

### Con Docker Compose (Recomendado)
Ver: https://github.com/TU_USUARIO/RoomiesU

### Docker Run
\`\`\`bash
docker run -d \
  --name roomiesu_backend \
  -e DB_HOST=your_db_host \
  -e DB_USER=your_db_user \
  -e DB_PASS=your_db_pass \
  -e DB_NAME=roomies_test \
  -e JWT_SECRET=your_jwt_secret \
  -p 4000:4000 \
  TU_USUARIO_DOCKERHUB/roomiesu-backend:latest
\`\`\`

## Variables de Entorno Requeridas
- `DB_HOST` - Host de MySQL
- `DB_USER` - Usuario de MySQL
- `DB_PASS` - Contraseña de MySQL
- `DB_NAME` - Nombre de la base de datos
- `JWT_SECRET` - Secreto para JWT
- `EMAIL_USER` - Email para notificaciones (opcional)
- `EMAIL_PASS` - Contraseña del email (opcional)
- `CLOUDINARY_*` - Credenciales de Cloudinary (opcional)
```

### Para roomiesu-frontend:
```markdown
# RoomiesU Frontend

Aplicación web React para RoomiesU - Plataforma de búsqueda y gestión de habitaciones para estudiantes.

## Tecnologías
- React 19
- Vite
- TailwindCSS
- React Router
- Axios

## Uso

\`\`\`bash
docker run -d \
  --name roomiesu_frontend \
  -p 5173:80 \
  TU_USUARIO_DOCKERHUB/roomiesu-frontend:latest
\`\`\`

La aplicación estará disponible en http://localhost:5173

## Configuración
El frontend espera que el backend esté en http://localhost:4000
```

## 🔄 Actualizar las Imágenes

Cuando hagas cambios en tu código:

```powershell
# 1. Reconstruir las imágenes localmente
docker-compose build

# 2. Re-etiquetar con nueva versión
docker tag roomiesu-backend TU_USUARIO_DOCKERHUB/roomiesu-backend:1.0.1
docker tag roomiesu-backend TU_USUARIO_DOCKERHUB/roomiesu-backend:latest

# 3. Subir a DockerHub
docker push TU_USUARIO_DOCKERHUB/roomiesu-backend:1.0.1
docker push TU_USUARIO_DOCKERHUB/roomiesu-backend:latest
```

## 🌟 Hacer Públicos los Repositorios

Por defecto, los repositorios son públicos en DockerHub. Si quieres que sean privados:

1. Ve a https://hub.docker.com
2. Selecciona tu repositorio
3. Ve a Settings
4. Cambia la visibilidad

## 📋 Checklist

- [ ] Iniciar sesión en DockerHub: `docker login`
- [ ] Etiquetar imagen del backend
- [ ] Etiquetar imagen del frontend
- [ ] Subir backend a DockerHub
- [ ] Subir frontend a DockerHub
- [ ] Verificar imágenes en hub.docker.com
- [ ] Probar descarga: `docker pull TU_USUARIO/roomiesu-backend:latest`
- [ ] Agregar README en DockerHub
- [ ] Compartir enlaces con tu equipo

## 🆘 Solución de Problemas

### Error: "denied: requested access to the resource is denied"
- Asegúrate de haber iniciado sesión: `docker login`
- Verifica que el nombre de usuario sea correcto

### Error: "unauthorized: authentication required"
- Tu sesión expiró, vuelve a hacer `docker login`

### Imágenes muy grandes
- Las imágenes usan construcción multi-etapa para ser más pequeñas
- Backend: ~200MB
- Frontend: ~50MB

### Subida muy lenta
- Esto es normal con conexiones lentas
- Solo necesitas subir una vez, las actualizaciones posteriores son incrementales
