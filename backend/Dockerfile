# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Copiar dependencias desde la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 4000

# Variables de entorno por defecto
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["npm", "start"]
