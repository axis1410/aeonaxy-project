FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i -g @nestjs/cli

COPY . .

CMD [ "npm", "run", "start:dev" ]