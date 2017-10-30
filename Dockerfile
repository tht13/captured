FROM node:8-alpine

WORKDIR /usr/app

RUN apk update && apk add python

COPY package.json .
RUN npm install --quiet --force

COPY . .

RUN npm run build 
RUN npm run build-app

ENTRYPOINT [ "node", "/usr/app/dist/server/main.js" ]