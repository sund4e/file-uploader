FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "tsconfig.json", ".env", "./"]

COPY ./src ./src
COPY ./migrations ./migrations

RUN yarn install

CMD yarn start-dev