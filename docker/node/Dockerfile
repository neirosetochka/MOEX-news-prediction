FROM node:latest


WORKDIR /usr/src/app

COPY ./frontend/package.json ./frontend/yarn.lock /usr/src/app/

RUN yarn install

COPY . .

CMD [ "yarn", "build" ]
