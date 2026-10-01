# Tecnologias atuais: Node.js 24, npm e TypeScript; tsx em desenvolvimento e JavaScript compilado em dist/ para execução com Node.js.
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]