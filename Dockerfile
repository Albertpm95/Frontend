# Usar una imagen base oficial de Node.js
FROM node:23-alpine3.20

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación Angular
RUN npm run build

# Exponer el puerto en el que la aplicación va a correr
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["npx", "serve", "-s", "dist/frontend"]
