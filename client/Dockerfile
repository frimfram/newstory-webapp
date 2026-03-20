FROM node:18.17.1-alpine3.18

LABEL org.opencontainers.image.title="newstories-client"

WORKDIR /app
COPY package*.json .npmrc ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "start"]