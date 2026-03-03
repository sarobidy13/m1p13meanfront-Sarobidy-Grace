# --- ÉTAPE 1 : Build (La plus gourmande) ---
FROM node:20-slim AS build
WORKDIR /app

# Optimisation npm pour consommer moins de RAM
ENV NODE_OPTIONS="--max-old-space-size=2048"

COPY package*.json ./

# On installe uniquement le nécessaire et on évite les audits lourds
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

# Build de production (le nom du dossier de sortie est 'dist' selon ton angular.json)
RUN ./node_modules/.bin/ng build --configuration production --subresource-integrity=false

# --- ÉTAPE 2 : Serveur léger (Celle qui tournera sur Render) ---
FROM node:20-slim
WORKDIR /app

# Installation d'un serveur statique ultra-léger
RUN npm install -g serve

# On ne récupère QUE les fichiers compilés (quelques Mo au lieu de 1Go)
COPY --from=build /app/dist .

# Port dynamique pour Render
EXPOSE 4200

# Commande optimisée pour servir l'application statique
CMD ["sh", "-c", "serve -s . -l ${PORT:-4200}"]