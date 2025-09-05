FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY astro.config.* ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 4321

#RUN npm run build
CMD ["npx", "astro", "dev", "--host", "0.0.0.0", "--port", "4321"]
