# RoomiesU  
📚 **Software de Administración de Pensiones Universitarias**

[![Ver en YouTube](https://img.youtube.com/vi/mm6tv6nKtEo/hqdefault.jpg)](https://www.youtube.com/watch?v=mm6tv6nKtEo)

RoomiesU es una plataforma web que facilita la comunicación y gestión entre estudiantes y administradores de pensiones universitarias.

## 🛠️ Tecnologías

- **Backend:** Node.js + Express  
- **Frontend:** React + Vite + Tailwind CSS  
- **Base de datos:** MySQL 8.0
- **Almacenamiento:** Cloudinary
- **Containerización:** Docker + Docker Compose

---

## 🚀 Despliegue Local

### ⚡ Opción 1: Con Docker (Recomendado)

La forma más rápida de ejecutar RoomiesU en tu máquina local.

#### ✅ Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo
- Git

#### 📦 Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/JxxnDx/RoomiesU.git
cd RoomiesU

# 2. Crear archivo de variables de entorno
cp .env.example .env

# 3. Editar .env con tus credenciales
# Mínimo necesario:
# - JWT_SECRET (genera uno aleatorio)
# - Credenciales de Cloudinary (opcional, para imágenes)
# - Credenciales de email (opcional, para recuperación de contraseña)

# 4. Iniciar toda la aplicación
docker-compose up -d

# 5. Esperar 30-60 segundos para que MySQL se inicialice

# 6. Verificar que todo esté corriendo
docker-compose ps
```

**¡Listo!** Accede a:
- 🌐 **Frontend:** http://localhost:5173
- 🔌 **Backend:** http://localhost:4000
- 🗄️ **MySQL:** localhost:3306

#### 🛑 Detener la aplicación

```bash
docker-compose stop
```

#### 🔄 Reiniciar desde cero

```bash
# Detener y eliminar todo (incluyendo datos de BD)
docker-compose down -v

# Volver a iniciar
docker-compose up -d
```

#### 📊 Ver logs

```bash
# Logs en tiempo real de todos los servicios
docker-compose logs -f

# Logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

---

### 🔧 Opción 2: Con Docker Hub (Sin código fuente)

Usa las imágenes pre-construidas desde Docker Hub:

```bash
# 1. Descargar configuración
curl -O https://raw.githubusercontent.com/JxxnDx/RoomiesU/main/docker-compose-hub.yml
curl -O https://raw.githubusercontent.com/JxxnDx/RoomiesU/main/.env.example

# 2. Crear y editar .env
cp .env.example .env

# 3. Editar docker-compose-hub.yml 
# Reemplazar "TU_USUARIO_DOCKERHUB" con "alejandro231011"

# 4. Iniciar
docker-compose -f docker-compose-hub.yml up -d
```

**Imágenes en Docker Hub:**
- Backend: `alejandro231011/roomiesu-backend:latest`
- Frontend: `alejandro231011/roomiesu-frontend:latest`

---

### 💻 Opción 3: Instalación Manual (Desarrollo)

Para desarrollo local sin Docker.

#### ✅ Requisitos previos

- Node.js v20 o superior
- npm o yarn
- MySQL 8.0 / MariaDB
- Cuenta de Cloudinary ([crear cuenta](https://cloudinary.com))
- Cuenta de Gmail con contraseña de aplicación habilitada

#### 📦 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/JxxnDx/RoomiesU.git
cd RoomiesU

# 2. Configurar base de datos
# Importar database/esquema.sql en tu MySQL local
mysql -u root -p < database/esquema.sql

# 3. Configurar Backend
cd backend
cp .env.example .env
# Editar .env con tus credenciales
npm install

# 4. Configurar Frontend
cd ../frontend
npm install

# 5. Ejecutar Backend (terminal 1)
cd backend
npm run dev

# 6. Ejecutar Frontend (terminal 2)
cd frontend
npm run dev
```

---

## 📋 Variables de Entorno

### Backend (.env)

```env
# Base de datos
DB_HOST=db                    # 'db' para Docker, 'localhost' para local
DB_PORT=3306
DB_USER=roomies_user
DB_PASS=roomies_password
DB_NAME=roomies_test

# JWT
JWT_SECRET=tu-clave-secreta-jwt-muy-segura

# Email (opcional - para recuperación de contraseña)
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicación

# Cloudinary (opcional - para subir imágenes)
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# Puerto
PORT=4000
```

### Frontend

```env
VITE_API_URL=http://localhost:4000
```

---

## 🗃️ Estructura del Proyecto

```
RoomiesU/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración DB y Cloudinary
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── middlewares/     # Autenticación y validación
│   │   ├── models/          # Modelos de datos
│   │   ├── routes/          # Rutas de API
│   │   └── services/        # Servicios (email, auth)
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas de la app
│   │   ├── hooks/           # Custom hooks
│   │   ├── layouts/         # Layouts principales
│   │   └── constants/       # Constantes y estilos
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── database/
│   └── esquema.sql          # Script de inicialización de BD
├── docker-compose.yml       # Orquestación de servicios
├── docker-compose-hub.yml   # Usar imágenes de Docker Hub
└── README.md
```

---

## 🐳 Características de Docker

### ✅ Ventajas

- **Setup en 3 comandos:** Sin instalación manual de dependencias
- **Persistencia de datos:** Los datos de MySQL se mantienen entre reinicios
- **Aislamiento:** No interfiere con otros proyectos en tu máquina
- **Consistencia:** Mismo ambiente en desarrollo y producción
- **Inicialización automática:** BD se crea con datos de sectores de Bucaramanga

### 📦 Servicios

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| Frontend | 5173 | Aplicación React servida con Nginx |
| Backend | 4000 | API REST con Node.js + Express |
| MySQL | 3306 | Base de datos con persistencia |

### 💾 Persistencia

Los datos de MySQL se guardan en un volumen Docker llamado `roomiesu_mysql_data`:
- ✅ Persisten cuando detienes los contenedores
- ✅ Persisten cuando reinicias Docker Desktop
- ❌ Se eliminan solo con `docker-compose down -v`

---

## 🔧 Comandos Útiles

```bash
# Ver estado de contenedores
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar un servicio
docker-compose restart backend

# Acceder a la base de datos
docker-compose exec db mysql -uroomies_user -proomies_password roomies_test

# Backup de la base de datos
docker-compose exec db mysqldump -uroomies_user -proomies_password roomies_test > backup.sql

# Restaurar backup
docker-compose exec -T db mysql -uroomies_user -proomies_password roomies_test < backup.sql

# Ver uso de recursos
docker stats
```

---

## 📖 Documentación Adicional

- 📘 [Documentación Completa](https://docs.google.com/document/d/1QN5l47gQXsvDv3YyB3l2S_jfcSFlaJbz7y3Mh-kKnro/edit?usp=sharing)
- 🐳 [Guía de Docker](./PRUEBAS-DOCKER.md)
- 📤 [Despliegue en Docker Hub](./DOCKER-HUB-DEPLOY.md)

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es parte del curso de Ingeniería de Software I.

---

## 👥 Equipo

Proyecto desarrollado para la gestión de pensiones universitarias en Bucaramanga, Colombia.

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa la [Guía de Pruebas de Docker](./PRUEBAS-DOCKER.md)
2. Verifica los logs: `docker-compose logs -f`
3. Asegúrate de que Docker Desktop esté corriendo
4. Abre un issue en GitHub

---

## ⭐ Características Principales

- 👤 **Autenticación:** Sistema de login para estudiantes y administradores
- 🏠 **Gestión de Habitaciones:** CRUD completo de habitaciones y unidades de vivienda
- 📝 **Sistema de Aplicaciones:** Estudiantes pueden aplicar a habitaciones
- 💰 **Gestión de Rentas:** Control de rentas activas y finalizadas
- ⭐ **Sistema de Reseñas:** Reseñas de habitaciones y estudiantes
- 📧 **Recuperación de Contraseña:** Via email
- 🖼️ **Gestión de Imágenes:** Integración con Cloudinary
- 📊 **Dashboard Administrativo:** Estadísticas y métricas
- 📱 **Responsive Design:** Funciona en móviles y desktop

---

**🎉 ¡Gracias por usar RoomiesU!**

