# Utilise une image Node.js en tant que base
FROM node:14-alpine

# Définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste des fichiers du projet dans le conteneur
COPY . .

# Construit l'application React pour la production
RUN npm run build

# Expose le port 3000 pour que l'application soit accessible
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
