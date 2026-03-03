# Étape 1 : Builder avec Angular 17
FROM node:18-alpine AS builder

WORKDIR /app

RUN npm install -g @angular/cli@17

COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm install nebular-icons --legacy-peer-deps

COPY . .

# Ajout de skipLibCheck via le flag TS
RUN ng build --configuration production -- --no-progress

# Étape 2 : Serveur léger
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist /app/dist

ENV PORT=4200
EXPOSE $PORT

CMD ["sh", "-c", "serve -s /app/dist -l tcp://0.0.0.0:$PORT"]