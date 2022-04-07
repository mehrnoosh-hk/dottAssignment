FROM node:16
WORKDIR /dist/
COPY package*.json /dist/
RUN npm install
RUN npm run build
