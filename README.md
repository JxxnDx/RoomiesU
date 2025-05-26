# RoomiesU
📚 Repositorio de Proyecto de I. de Software I 

Software de Administrador de Pensiones Universitarias

En este repositorio se encuentra toda la lógica del desarrollo de una página web para facilitar el acercamiento entre un estudiante y un administrador de una pensión. Se divide por back-end y front-end, en el back se utiliza Node con Express, para el front se utiliza React y Tailwind.

- **Backend**: Node.js + Express
- **Frontend**: React + Tailwind CSS
- **Base de datos**: MySQL/MariaDB



## 🚀 Instalación

### Requisitos
- Node.js v16+
- npm o yarn
- MySQL/MariaDB

### 1. Clonar repositorio
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

## Dentro de la carpeta backend crea un archivo .env que contenga lo siguiente:

Ten en cuenta que debes crear una cuenta en cloudinary y crear un correo de gmail para la plataforma.

# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-correo@gmail.com
SMTP_PASS=contraseña-de-aplicación
SMTP_SECURE=true

# Autenticación
JWT_SECRET=tu-clave-secreta-jwt
NODE_ENV=development

# Cloudinary (Debes crear cuenta en https://cloudinary.com)
CLOUDINARY_NAME=tu-nombre-cuenta
CLOUDINARY_API_KEY=tua-pi-key
CLOUDINARY_API_SECRET=tu-api-secret

# Database
DB_HOST=localhost
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=plataforma_educativa


### Instalación de dependencias

# Backend
cd backend
npm install

# Frontend
cd frontend
npm install

### Arranque del proyecto

# Iniciar backend (desde /backend)
npm run dev

# Iniciar frontend (desde /frontend)
npm run dev


## Estructura del proyecto

/
├── backend/
│   ├── .env          # Archivo de configuración
│   └── src/
├── frontend/
├── database/
│   └── esquema.sql   # Script de la base de datos
└── README.md

# Recomendaciones:

Recuerda que debes importar la base de datos usando el script que esta en la carpeta database, el backend correrá en el puerto 4000 y el frontend en el puerto 5173