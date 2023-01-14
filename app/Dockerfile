FROM node:16

WORKDIR ./m2_back

COPY package.json .

RUN npm install

COPY . .

CMD npm start
