FROM node:8

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet --force

COPY . .

RUN npm run build 
RUN npm run build-app

ENTRYPOINT [ "node", "/usr/app/dist/server/main.js" ]