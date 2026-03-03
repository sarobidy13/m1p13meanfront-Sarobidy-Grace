# Étape 1 : Builder avec Angular 15
FROM node:18-alpine AS builder

# Indiquer Angular CLI version 15 explicitement
RUN npm install -g @angular/cli@15

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Build Angular 15 en production
RUN ng build --configuration production

# Étape 2 : Serveur léger pour les fichiers statiques
FROM node:18-alpine

WORKDIR /app

# Installer serve pour servir le build
RUN npm install -g serve

# Copier le build depuis l'étape builder
COPY --from=builder /app/dist /app/dist

# Render définit automatiquement $PORT
ENV PORT 10000
EXPOSE $PORT

# Lancer le serveur sur le port fourni par Render
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:$PORT"]