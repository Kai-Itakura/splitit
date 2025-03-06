FROM node:20

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y vim

RUN npm install && npm install -g @nestjs/cli


