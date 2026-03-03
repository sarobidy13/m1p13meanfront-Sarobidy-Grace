# Étape 1 : Builder avec Angular 17 (CLI du projet)
FROM node:18-alpine AS builder

WORKDIR /app

# Installer Angular CLI selon ton projet (17.x)
RUN npm install -g @angular/cli@17

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le code source
COPY . .

# Build production
RUN ng build --configuration production

# Étape 2 : Serveur léger
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist /app/dist

ENV PORT=4200
EXPOSE $PORT

CMD ["sh", "-c", "serve -s /app/dist -l tcp://0.0.0.0:$PORT"]