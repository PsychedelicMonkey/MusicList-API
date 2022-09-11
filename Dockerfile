FROM node:16.17.0-alpine

WORKDIR /usr/src/app

RUN mkdir logs/ && mkdir public/

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src/ src/

RUN npm run build

EXPOSE 5000

ENV NODE_ENV=production

USER node

CMD ["npm", "start"]
