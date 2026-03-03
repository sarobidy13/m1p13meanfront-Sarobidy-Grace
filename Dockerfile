# Étape 1 : Builder avec Angular 17
FROM node:18-alpine AS builder

WORKDIR /app

# Installer Angular CLI 17 (CLI correspond au projet)
RUN npm install -g @angular/cli@17

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances avec legacy-peer-deps pour éviter les conflits
RUN npm install --legacy-peer-deps

# Copier le code source
COPY . .

# Build production Angular 17
RUN ng build --configuration production

# Étape 2 : Serveur léger pour les fichiers statiques
FROM node:18-alpine

WORKDIR /app

# Installer "serve" pour servir le build
RUN npm install -g serve

# Copier le build depuis l'étape builder
COPY --from=builder /app/dist /app/dist

# Définir le port
ENV PORT=4200
EXPOSE $PORT

# Lancer le serveur sur 0.0.0.0 pour que Render y accède
CMD ["sh", "-c", "serve -s /app/dist -l tcp://0.0.0.0:$PORT"]