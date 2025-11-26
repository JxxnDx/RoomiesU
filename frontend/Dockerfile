# Etapa de construcción - Usar Debian en lugar de Alpine
FROM node:20-slim AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Limpiar caché de npm e instalar dependencias
RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json && \
    npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine

# Copiar archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]
