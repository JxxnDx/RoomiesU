# RoomiesU  
📚 Repositorio del Proyecto de Ingeniería de Software I

**Software de Administración de Pensiones Universitarias**

## 🎥 Video de guía

[![Ver en YouTube](https://img.youtube.com/vi/mm6tv6nKtEo/hqdefault.jpg)](https://www.youtube.com/watch?v=mm6tv6nKtEo)

RoomiesU es una plataforma web que facilita la comunicación y gestión entre estudiantes y administradores de pensiones universitarias. El sistema está dividido en dos partes:

- **Backend:** Node.js + Express  
- **Frontend:** React + Tailwind CSS  
- **Base de datos:** MySQL / MariaDB

---

## 🚀 Instalación

### ✅ Requisitos previos

- Node.js v16 o superior  
- npm o yarn  
- MySQL / MariaDB  
- Cuenta de Cloudinary ([crear cuenta](https://cloudinary.com))  
- Cuenta de Gmail con contraseña de aplicación habilitada

---

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

---

### 2️⃣ Configurar variables de entorno

Dentro de la carpeta `backend`, crea un archivo llamado `.env` y copia el siguiente contenido:

```env
#################################
#         CONFIGURACIÓN         #
#       VARIABLES DE ENTORNO    #
#################################

# SMTP (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-correo@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación
SMTP_SECURE=true

# JWT y Entorno
JWT_SECRET=tu-clave-secreta-jwt
NODE_ENV=development

# Cloudinary
CLOUDINARY_NAME=tu-nombre-de-cuenta
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# Base de Datos MySQL
DB_HOST=localhost
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=plataforma_educativa
```

> ⚠️ Asegúrate de no subir este archivo al repositorio. Agrégalo a tu `.gitignore`.

---

### 3️⃣ Instalar dependencias

```bash
# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

---

### 4️⃣ Ejecutar la aplicación

```bash
# Ejecutar backend (desde /backend)
npm run dev

# Ejecutar frontend (desde /frontend)
npm run dev
```

El backend correrá en [http://localhost:4000](http://localhost:4000) y el frontend en [http://localhost:5173](http://localhost:5173).

---

## 🗃️ Estructura del proyecto

```
/
├── backend/
│   ├── .env                # Variables de entorno (no se sube al repositorio)
│   └── src/                # Código del backend
├── frontend/               # Aplicación React
├── database/
│   └── esquema.sql         # Script de creación de base de datos
└── README.md
```

---

## 📌 Recomendaciones

- **Base de datos:** Usa el script `esquema.sql` dentro de la carpeta `database/` para crear las tablas necesarias.
- **.env:** Asegúrate de llenar correctamente todas las variables antes de ejecutar el backend.
- **Cloudinary:** Crea una cuenta gratuita en [https://cloudinary.com](https://cloudinary.com) y copia tus credenciales en el `.env`.

## Documentacion


La documentacion esta en este documento en 
([Documentación](https://docs.google.com/document/d/1QN5l47gQXsvDv3YyB3l2S_jfcSFlaJbz7y3Mh-kKnro/edit?usp=sharing)) .

