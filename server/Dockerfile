FROM node:18.17.1-alpine3.18

LABEL org.opencontainers.image.title="newstories-api"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001

CMD ["npm", "start"]