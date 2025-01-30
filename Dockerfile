# Étape 1 : Utilisation de l’image officielle Node.js
FROM node:18-alpine

# Activer Corepack pour utiliser pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Définition du répertoire de travail
WORKDIR /app

# Installer pnpm et les dépendances
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copie du code source
COPY . .
# Exposer le port utilisé par Next.js
EXPOSE 3000

# Démarrer l’application
CMD ["pnpm", "run", "dev"]
