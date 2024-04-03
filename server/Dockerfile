FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN chmod -R a+x node_modules

COPY . .

