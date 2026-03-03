# Utiliser Node.js stable (Node 20 fonctionne très bien)
FROM node:20

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer Angular CLI 15 globalement et les dépendances
RUN npm install -g @angular/cli@15 && \
    npm install --legacy-peer-deps

# Copier le reste du projet
COPY . .

# Exposer le port utilisé par ng serve
EXPOSE ${PORT:-4200}

# Lancer l'application
CMD ["sh", "-c", "npx ng serve --host 0.0.0.0 --port ${PORT:-4200} --disable-host-check"]