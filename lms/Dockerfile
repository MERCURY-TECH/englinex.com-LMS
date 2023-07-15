FROM node:latest as base
WORKDIR /api
COPY package.json .
RUN npm install

COPY ./ .

CMD npm run start:tsc

