FROM node:12-slim as build
WORKDIR /app
COPY package*.json ./
COPY yarn* ./
RUN yarn install
COPY . .
CMD ["yarn", "start"]
